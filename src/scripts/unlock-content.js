function b64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function utf8Encode(str) {
  return new TextEncoder().encode(str);
}

function utf8Decode(bytes) {
  return new TextDecoder().decode(bytes);
}

async function deriveAesKey({ password, salt, iter, hash }) {
  // WebCrypto expects "SHA-256" not "sha256"
  const hashName = hash.toUpperCase().replace('SHA', 'SHA-');
  
  const baseKey = await crypto.subtle.importKey(
    'raw',
    utf8Encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: iter,
      hash: hashName,
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  );
}

async function decryptPayload({ payload, password }) {
  if (!payload || payload.v !== 1) throw new Error('Unsupported payload');
  if (payload.kdf !== 'pbkdf2') throw new Error('Unsupported kdf');

  const salt = b64ToBytes(payload.salt);
  const iv = b64ToBytes(payload.iv);
  const ct = b64ToBytes(payload.ct);

  const key = await deriveAesKey({
    password,
    salt,
    iter: payload.iter,
    hash: payload.hash,
  });

  const pt = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ct,
  );

  return utf8Decode(new Uint8Array(pt));
}

function parseEncrypted(el) {
  const b64 = el.getAttribute('data-encrypted');
  if (!b64) throw new Error('Missing data-encrypted');
  const json = atob(b64);
  return JSON.parse(json);
}

function setupLockedBlock(container) {
  const form = container.querySelector('.locked-unlock-form');
  const input = container.querySelector('input[type="password"]');
  const body = container.querySelector('.locked-body');
  const teaser = container.querySelector('.locked-teaser');
  const errorEl = container.querySelector('.locked-error');

  if (!form || !input || !body) return;

  const payload = parseEncrypted(container);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = '';
    }

    const password = input.value;
    if (!password) return;

    input.disabled = true;

    try {
      const html = await decryptPayload({ payload, password });
      body.innerHTML = html;
      body.hidden = false;
      
      // Hide form and replace teaser with "unlocked" badge
      form.remove();
      if (teaser) {
        teaser.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M7 10V8a5 5 0 0 1 9.33-2.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 10h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2"/>
            <path d="M12 14v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <p>Entsperrt</p>
        `;
        teaser.classList.add('unlocked');
      }
    } catch (err) {
      if (errorEl) {
        errorEl.textContent = 'Falsches Passwort.';
        errorEl.hidden = false;
      }
      input.disabled = false;
      input.focus();
      input.select();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!('crypto' in window) || !crypto.subtle) return;

  document
    .querySelectorAll('.locked-content[data-encrypted]')
    .forEach(setupLockedBlock);
});
