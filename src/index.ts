// import 'reflect-metadata';
import { fastify as Fastify } from 'fastify';
import EnvPlugin, {EnvOptions} from "./plugins/env.js";
import {bootstrap} from "fastify-decorators";

// fixme: won't work without this
// import { FastifyInstanceToken } from '@fastify-decorators/simple-di';
// void(FastifyInstanceToken)

const server = Fastify({
  logger: {
    level: 'debug',
  },
});

server.register(EnvPlugin, EnvOptions);
server.register(bootstrap, {
  // Specify directory with our controllers
  directory: new URL('controllers', import.meta.url),

  // Specify mask to match only our controllers
  mask: /\.controller\./,
});


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    server.log.error(`${err.message}! Stack: \n${err.stack}`);
    process.exit(1);
  }
  server.log.info(`[${process.env.NODE_ENV?.toUpperCase()}] Server listening at ${address}`);

  // quit on ctrl-c when running docker in terminal
  process.on('SIGINT', () => {
    server.log.info('Got SIGINT. Graceful shutdown ', new Date().toISOString());
    server.close();
  });

  process.on('SIGTERM', () => {
    server.log.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
    server.close();
  });
});
