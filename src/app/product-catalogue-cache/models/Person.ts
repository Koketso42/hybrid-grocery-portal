import { Address } from './Address';
import { Account } from './Account';

export class Person {
	personId: number;
    idNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
	bankAccount: Account;
	address: Address;
}
