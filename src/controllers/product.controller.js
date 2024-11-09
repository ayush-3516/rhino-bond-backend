import { Controller, Get, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('products')
export class ProductController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  /**
   * Retrieves all products.
   * @returns A list of all products.
   */
  @Get()
  async getProducts() {
    console.log('Fetching all products');
    return this.prisma.product.findMany();
  }

  /**
   * Adds a new product.
   * @param body - The product information to add.
   * @returns The newly created product object.
   */
  @Post()
  async addProduct(body) {
    console.log('Adding new product');
    const { name, description, price } = body;
    return this.prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });
  }
}

export const getProducts = ProductController.prototype.getProducts;
export const addProduct = ProductController.prototype.addProduct;
