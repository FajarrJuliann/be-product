import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, body } = request;
    const now = Date.now();

    // Log request masuk
    this.logger.log(
      `[${method}] ${url} - Request: ${JSON.stringify({
        headers,
        body,
      })}`,
    );

    return next.handle().pipe(
      tap((data) => {
        // Log respons sukses
        this.logger.log(
          `[${method}] ${url} - Status: 200 - Response Time: ${Date.now() - now}ms`,
        );
      }),
      catchError((error) => {
        // Log error
        this.logger.error(
          `[${method}] ${url} - Error: ${error.message} - Status: ${error.status || 500} - Response Time: ${Date.now() - now}ms`,
          error.stack,
        );
        throw error;
      }),
    );
  }
}
