import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) { }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  create(product: ProductDto): Promise<Product> {
    return this.productsRepository.save(product);
  }

  update(id: number, product: ProductDto): Promise<Product> {
    return this.productsRepository.save({ id, ...product });
  }

  findOne(id: string): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
