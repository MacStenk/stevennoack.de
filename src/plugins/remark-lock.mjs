import crypto from 'node:crypto';
import { visit } from 'unist-util-visit';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';

const PBKDF2_ITER = 210000;
const PBKDF2_HASH = 'sha256';

function b64(buf) {
  return Buffer.from(buf).toString('base64');
}

function renderChildrenToHtml(children) {
  const mdastRoot = { type: 'root', children };
  const hast = toHast(mdastRoot, { allowDangerousHtml: true });
  return toHtml(hast, { allowDangerousHtml: true });
}

function encryptHtml({ html, password }) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12); // AES-GCM recommended

  const key = crypto.pbkdf2Sync(password, salt, PBKDF2_ITER, 32, PBKDF2_HASH);

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(html, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  // WebCrypto expects ciphertext||tag
  const ct = Buffer.concat([ciphertext, tag]);

  return {
    salt,
    iv,
    ct,
  };
}

function buildLockedHtml({ encryptedB64 }) {
  // Minimal lock icon (inline SVG)
  const svg = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M7 10V8a5 5 0 0 1 10 0v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2"/>
      <path d="M12 14v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;

  return `
<div class="locked-content" data-encrypted="${encryptedB64}">
  <div class="locked-teaser">
    ${svg}
    <p>Dieser Inhalt ist passwortgeschützt.</p>
  </div>
  <form class="locked-unlock-form">
    <input type="password" autocomplete="current-password" placeholder="Passwort eingeben" required>
    <button type="submit">Entsperren</button>
    <p class="locked-error" hidden></p>
  </form>
  <div class="locked-body" hidden></div>
</div>
`.trim();
}

export default function remarkLock() {
  return (tree, file) => {
    visit(tree, (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      if (node.type !== 'containerDirective') return;
      if (node.name !== 'lock') return;

      const id = node.attributes?.id;
      if (!id || typeof id !== 'string') {
        throw new Error(
          `[remark-lock] Missing required id attribute. Use :::lock{id="..."} in ${file?.path || 'markdown'}`,
        );
      }

      const envKey = `LOCK_PASSWORD_${id.toUpperCase()}`;
      const password = process.env[envKey];

      if (!password) {
        throw new Error(
          `[remark-lock] Missing ENV ${envKey}. Set it for build-time encryption (id="${id}").`,
        );
      }

      const innerHtml = renderChildrenToHtml(node.children || []);
      const { salt, iv, ct } = encryptHtml({ html: innerHtml, password });

      const payload = {
        v: 1,
        kdf: 'pbkdf2',
        iter: PBKDF2_ITER,
        hash: PBKDF2_HASH,
        salt: b64(salt),
        iv: b64(iv),
        ct: b64(ct),
      };

      const encryptedB64 = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
      const html = buildLockedHtml({ encryptedB64 });

      parent.children[index] = { type: 'html', value: html };
    });
  };
}
