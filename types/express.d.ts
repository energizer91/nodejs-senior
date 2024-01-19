import { Customer } from 'lib/entities/customer.entity';

declare global {
  namespace Express {
    interface Request {
      customer?: Customer;
    }
  }
}
