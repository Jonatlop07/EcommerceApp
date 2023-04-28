import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CoreApiResponse } from '@core/abstraction/api/core_api_response';
import { Code } from '@core/abstraction/code/code';
import { APIServerConfiguration } from '@infrastructure/config/api_server.config';
import { CoreException } from '@core/abstraction/exception/core.exception';

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();

    let error_response: CoreApiResponse<unknown> = CoreApiResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message,
    );

    error_response = this.handleNestError(error, error_response);
    error_response = this.handleCoreException(error, error_response);

    if (APIServerConfiguration.ENABLE_LOG) {
      const message: string =
        `Method: ${request.method}; ` +
        `Path: ${request.path}; ` +
        `Error: ${error_response.message}`;

      Logger.error(message);
    }

    response.json(error_response);
  }

  private handleNestError(
    error: Error,
    error_response: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      error_response = CoreApiResponse.error(
        error.getStatus(),
        error.message,
        null,
      );
    }
    if (error instanceof UnauthorizedException) {
      error_response = CoreApiResponse.error(
        Code.UNAUTHORIZED_ERROR.code,
        Code.UNAUTHORIZED_ERROR.message,
        null,
      );
    }

    return error_response;
  }

  private handleCoreException(
    error: Error,
    error_response: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof CoreException) {
      error_response = CoreApiResponse.error(
        error.code,
        error.message,
        error.data,
      );
    }
    return error_response;
  }
}
