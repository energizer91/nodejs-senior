import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLE_KEY = 'role';
export const HasRole = (role: Role) => SetMetadata(ROLE_KEY, role);
