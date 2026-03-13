import { defineMiddleware } from 'astro:middleware';

const BLOCKED_PATHS = [
  '/.env',
  '/.git',
  '/.gitignore',
  '/.DS_Store',
  '/wp-admin',
  '/wp-login.php',
  '/wp-content',
  '/xmlrpc.php',
  '/wp-includes',
  '/administrator',
  '/.htaccess',
  '/.htpasswd',
  '/server-status',
  '/phpinfo.php',
  '/phpmyadmin',
  '/config.php',
  '/config.yml',
  '/database.yml',
  '/.aws',
  '/.ssh',
];

export const onRequest = defineMiddleware(async ({ request }, next) => {
  const url = new URL(request.url);
  const path = url.pathname.toLowerCase();

  // Block sensitive paths
  if (BLOCKED_PATHS.some(blocked => path === blocked || path.startsWith(blocked + '/'))) {
    return new Response('Not Found', { status: 404 });
  }

  return next();
});
