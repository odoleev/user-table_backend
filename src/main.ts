import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://user-table-front.vercel.app/',
      'https://user-table-front.vercel.app/login',
      'https://user-table-front.vercel.app/registration',
      'https://user-table-front.vercel.app/table',
    ],
    credentials: true,
  });

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

start();
