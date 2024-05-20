/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { CartModule } from './cart.module';

async function bootstrap() {
  const app = await NestFactory.create(CartModule);
  app.enableCors({
    origin: 'http://localhost:5000', // Replace with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3001);
}

bootstrap().then(() => {
  console.log('Cart service started');
});
