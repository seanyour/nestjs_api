import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {VersioningType} from "@nestjs/common";
import * as session from "express-session";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cors from 'cors';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import {RequestFilter} from "./common/request.filter";
import {ResponseInterceptor} from "./common/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // global router prefix
  // app.setGlobalPrefix('api');

  app.useGlobalFilters(new RequestFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // version control
  // app.enableVersioning({
  //   type: VersioningType.URI
  // });

  // session
  app.use(session({
    secret: "yang.ao",
    name: "connect.sid",
    rolling: true,
    cookie: {
      maxAge: 99999
    }
  }));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Nestjs API')
    .setDescription('The Nestjs API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // cors
  app.use(cors());

  // static resource
  app.useStaticAssets(join(__dirname, 'resource'),{
    prefix: '/resource'
  });

  await app.listen(3000);
}

bootstrap();