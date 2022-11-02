import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class RequestFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const status = exception.getStatus();
    const message = exception.message;

    response.status(status);
    response.header("Content-Type", "application/json; charset=utf-8");
    response.send({
      message,
      status,
      success: false
    });
  }
}