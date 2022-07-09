import type { fastifyEnvOpt } from '@fastify/env';
import { default as EnvPlugin } from '@fastify/env';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      LOG_LEVEL: string,
      POSTGRES_DB: string
      PORT: number

      [key: string]: string | number | boolean,
    },
  }
}


export const EnvOptions: fastifyEnvOpt = {
  schema: {
    type: 'object',
    properties: {
      NODE_ENV: {
        type: 'string',
        default: 'prod',
      },
      PORT: {
        type: 'number',
        default: 3000,
      },
      LOG_LEVEL: {
        type: 'string',
        default: 'error',
      },
    },
  },
  confKey: 'config',
  dotenv: true,
};

export default EnvPlugin;
