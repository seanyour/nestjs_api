import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const status = exception.getStatus();

        const message = exception.message
            ? exception.message
            : `${status >= 500 ? 'Server Error' : 'Client Error'}`;

        const errorResponse = {
            msg:message,
            code: -1,
        };

        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
}
