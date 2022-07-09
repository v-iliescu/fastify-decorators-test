import type { FastifyInstance } from 'fastify';
import { Controller, GET } from 'fastify-decorators';
import { FastifyInstanceToken, Inject } from '@fastify-decorators/simple-di';

@Controller({ route: '/' })
export default class IndexController {
  @Inject(FastifyInstanceToken)
  private instance!: FastifyInstance;

  @GET({ url: '/' })
  async helloHandler() {
    console.log(this.instance.config); // .config is undefined exists here

    return'Hello!';
  }

  @GET({ url: '/goodbye' })
  async goodbyeHandler() {
    return 'Bye-bye!';
  }
}
