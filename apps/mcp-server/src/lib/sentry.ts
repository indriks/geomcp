import * as Sentry from '@sentry/node';

import { env } from '../config/env';

export function initSentry() {
  if (env.SENTRY_DSN) {
    Sentry.init({
      dsn: env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: env.NODE_ENV,
    });
  }
}

export function captureException(error: Error, context?: Record<string, unknown>) {
  if (env.SENTRY_DSN) {
    Sentry.captureException(error, { extra: context });
  } else {
    // eslint-disable-next-line no-console
    console.error('Error:', error.message, context);
  }
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (env.SENTRY_DSN) {
    Sentry.captureMessage(message, level);
  } else {
    // eslint-disable-next-line no-console
    console.log(`[${level}]`, message);
  }
}
