import { registerEnumType } from '@nestjs/graphql';

// used object instead enum in order to make it compatible with prisma enums
export const Role = {
  user: 'user',
  admin: 'admin',
};

export type Role = (typeof Role)[keyof typeof Role];

registerEnumType(Role, {
  name: 'Role',
});
