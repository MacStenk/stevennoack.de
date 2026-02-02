import type { APIRoute } from 'astro';
import * as Sentry from '@sentry/astro';

export const GET: APIRoute = async () => {
  try {
    throw new Error('Sentry server test error (stevennoack.de)');
  } catch (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);

    return new Response(JSON.stringify({ ok: false, message: 'Captured server error in Sentry' }), {
      status: 500,
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    });
  }
};
