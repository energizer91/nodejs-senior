import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaService } from 'src/prisma.service';
import { CustomerResolver } from './customer.resolver';
import { CustomerController } from 'src/customer/customer.controller';
import { AuthGuard } from 'lib/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'lib/guards/roles.guard';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PrismaService,
    CustomerResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
