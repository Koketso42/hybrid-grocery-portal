import { Person } from '../../product-catalogue-cache/models/Person';
export class User {
	userId?: number;
    username?: string;
    password?: string;
    role?: string;
	person?: Person;
}
