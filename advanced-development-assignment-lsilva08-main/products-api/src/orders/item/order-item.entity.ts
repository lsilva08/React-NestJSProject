import { Product } from 'src/products/product.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;

    @ManyToOne(() => Product)
    product: Product;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @Column()
    quantity: number;
}
