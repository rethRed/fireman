import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        let name: string = exception.name;
        let message: string = exception.message ? exception.message : "An error occurred";

        response
            .status(status)
            .json({
                error: {
                    name,
                    message
                }
            });
    }
}