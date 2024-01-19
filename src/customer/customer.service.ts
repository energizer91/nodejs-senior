import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import {
  CreateCustomerInput,
  CustomerQueryInput,
  GetCustomerInput,
  UpdateCustomerInput,
} from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async findOne(query: CustomerQueryInput) {
    const { id, email } = query;

    return this.prisma.customer.findUnique({ where: { id, email } });
  }

  async create(params: CreateCustomerInput) {
    const { email, password, verificationToken } = params;

    return this.prisma.customer.create({
      data: {
        email,
        password,
        verificationToken,
      },
    });
  }

  async update(query: CustomerQueryInput, params: UpdateCustomerInput) {
    const { email, id } = query;
    const where = id ? { id } : { email };

    return this.prisma.customer.update({
      where,
      data: params,
    });
  }

  async delete(query: CustomerQueryInput) {
    const { email, id } = query;
    const where = id ? { id } : { email };

    return this.prisma.customer.delete({
      where,
    });
  }
}
