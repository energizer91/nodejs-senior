import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import {
  CreateCustomerInput,
  CustomerQueryInput,
  GetCustomerInput,
  UpdateCustomerInput,
} from 'src/customer/dto/customer.input';
import { Customer } from 'lib/entities/customer.entity';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception.filter';
import { Role } from 'src/customer/enums/role.enum';
import { HasRole } from 'src/customer/decorators/roles.decorator';

@UseFilters(PrismaClientExceptionFilter)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers(@Query() params: GetCustomerInput): Promise<Customer[]> {
    return this.customerService.findAll(params);
  }

  @Get()
  async getCustomer(@Query() query: CustomerQueryInput) {
    return this.customerService.findOne(query);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    return this.customerService.findOne({ id });
  }

  @Post()
  async createCustomer(
    @Body() createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.create(createCustomerInput);
  }

  @Put()
  @HasRole(Role.admin)
  async updateCustomer(
    @Query() customerQueryInput: CustomerQueryInput,
    @Body() updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.update(customerQueryInput, updateCustomerInput);
  }

  @Put(':id')
  @HasRole(Role.admin)
  async updateCustomerById(
    @Param('id') id: string,
    @Body() updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.update({ id }, updateCustomerInput);
  }

  @Delete()
  @HasRole(Role.admin)
  async deleteCustomer(
    @Query() customerQueryInput: CustomerQueryInput,
  ): Promise<Customer> {
    return this.customerService.delete(customerQueryInput);
  }

  @Delete(':id')
  @HasRole(Role.admin)
  async deleteCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.delete({ id });
  }
}
