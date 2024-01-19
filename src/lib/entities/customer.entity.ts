import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from 'lib/entities/base.entity';
import { Role } from 'src/customer/enums/role.enum';

@ObjectType()
export class Customer extends Base {
  @Field(() => String)
  email: string;

  @Field(() => Role)
  role: Role;
}
