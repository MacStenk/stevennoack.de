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
      hash: { name: hash.toUpperCase() },
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
      if (teaser) teaser.hidden = true;
      form.hidden = true;
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
