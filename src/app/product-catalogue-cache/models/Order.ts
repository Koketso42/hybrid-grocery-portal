import { Person } from './Person';
import { Product } from './Product';

export class Order {
	orderId?: number;
	customer?: Person;
	products?: Product[];
    totalPrice?: number;
    deliveryStatus?: boolean;
    orderDate?: Date;
}
