import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

const errorCodesStatusMapping: Record<string, HttpStatus> = {
  P2000: HttpStatus.BAD_REQUEST,
  P2002: HttpStatus.CONFLICT,
  P2025: HttpStatus.NOT_FOUND,
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const statusCode = errorCodesStatusMapping[exception.code];
      const message = `[${exception.code}]: ${this.exceptionShortMessage(
        exception.message,
      )}`;

      if (!Object.keys(errorCodesStatusMapping).includes(exception.code)) {
        return super.catch(exception, host);
      }

      super.catch(new HttpException({ statusCode, message }, statusCode), host);
    }
  }

  private exceptionShortMessage(message: string): string {
    const shortMessage = message.substring(message.indexOf('→'));

    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
}
