export interface EnvConfig {
  port: number;
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;
  openrouterApiKey: string;
  githubToken: string;
  exaApiKey: string;
  stripeSecretKey: string;
  sentryDsn?: string;
  posthogApiKey?: string;
  posthogHost?: string;
  nodeEnv: string;
}

export function getEnvConfig(): EnvConfig {
  return {
    port: parseInt(process.env.PORT || '3001', 10),
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
    githubToken: process.env.GITHUB_TOKEN || '',
    exaApiKey: process.env.EXA_API_KEY || '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    sentryDsn: process.env.SENTRY_DSN,
    posthogApiKey: process.env.POSTHOG_API_KEY,
    posthogHost: process.env.POSTHOG_HOST,
    nodeEnv: process.env.NODE_ENV || 'development',
  };
}

export function validateEnvConfig(config: EnvConfig): void {
  const required = ['supabaseUrl', 'supabaseServiceRoleKey'] as const;

  for (const key of required) {
    if (!config[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}

// Singleton env config
let envConfig: EnvConfig | null = null;

export const env = new Proxy({} as EnvConfig, {
  get(_target, prop: keyof EnvConfig) {
    if (!envConfig) {
      envConfig = getEnvConfig();
    }
    return envConfig[prop];
  },
});
