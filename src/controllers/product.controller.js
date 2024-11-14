import { Controller, Get, Post, Param, Body, BadRequestException } from '@nestjs/common';
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
    if (!name || !description || !price) {
      throw new BadRequestException('Invalid product details');
    }
    try {
      return await this.prisma.product.create({
        data: {
          name,
          description,
          price,
        },
      });
    } catch (error) {
      console.error('Error adding new product', error);
      throw new BadRequestException('Invalid product details');
    }
  }

  /**
   * Retrieves a specific product by ID.
   * @param id - The ID of the product to retrieve.
   * @returns The product object.
   */
  @Get(':id')
  async getProductById(id) {
    console.log(`Fetching product with ID: ${id}`);
    try {
      return await this.prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      console.error(`Error fetching product with ID: ${id}`, error);
      throw new BadRequestException('Invalid product ID');
    }
  }
}

export const getProducts = ProductController.prototype.getProducts;
export const addProduct = ProductController.prototype.addProduct;
export const getProductById = ProductController.prototype.getProductById;
