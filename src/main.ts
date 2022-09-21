import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import * as session from "express-session";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cors from 'cors';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // version control
  app.enableVersioning({
    type: VersioningType.URI
  });

  // session
  app.use(session({
    secret: "yang.ao",
    name: "connect.sid",
    rolling: true,
    cookie: {
      maxAge: 999999
    }
  }));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Nestjs')
    .setDescription('The Nestjs API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // cors
  app.use(cors());

  app.useStaticAssets(join(__dirname, 'resource'));

  await app.listen(3000);
}

bootstrap();
