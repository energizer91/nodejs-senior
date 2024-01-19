import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  CreateCustomerInput,
  CustomerQueryInput,
  GetCustomerInput,
  UpdateCustomerInput,
} from './dto/customer.input';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerService.findAll({ skip, take, where });
  }

  @Query(() => Customer)
  async customer(@Args('data') { id, email }: CustomerQueryInput) {
    return this.customerService.findOne({ id, email });
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.create(createCustomerInput);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('query') { id, email }: CustomerQueryInput,
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ): Promise<Customer> {
    return this.customerService.update({ id, email }, updateCustomerInput);
  }

  @Mutation(() => Customer)
  async deleteCustomer(
    @Args('query') { id, email }: CustomerQueryInput,
  ): Promise<Customer> {
    return this.customerService.delete({ id, email });
  }
}
