import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { Transport, MicroserviceOptions } from '@nestjs/microservices';


async function bootstrap() {
   const app = await NestFactory.create(AppModule, { cors: true });
   await app.listen(3200);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqps://xcobjquw:9w4NHejrZbTTbjmoccu8WKCh-Jnk9mKE@hornet.rmq.cloudamqp.com/xcobjquw'],
  //     queue: 'auto_club_crud_que',
  //     queueOptions: {
  //       durable: false
  //     },
  //   },
  // });
  // app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
