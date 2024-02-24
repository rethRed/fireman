import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from "@fireman/common/errors"

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
    catch(exception: DomainError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let name: string = exception.name;
        let message: string = exception.message ? exception.message : "An error occurred";

        response
            .status(500)
            .json({
                error: {
                    name,
                    message
                }
            });
    }
}