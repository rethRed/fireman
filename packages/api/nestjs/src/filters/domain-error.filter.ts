import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from "@common/errors"

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
    catch(exception: DomainError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const name: string = exception.name;
        const message: string = exception.message ? exception.message : "An error occurred";
        const additionalInfo = exception.aditionalInfo ? exception.aditionalInfo : undefined;

        response
            .status(400)
            .json({
                error: {
                    name,
                    message,
                    ...additionalInfo
                }
            });
    }
}