const { Injectable } = require('@nestjs/common');
const { PrismaService } = require('./prisma.service');

@Injectable()
class ProductService {
  constructor(prismaService) {
    this.prisma = prismaService;
  }

  async createProduct(data) {
    return this.prisma.product.create({
      data,
    });
  }

  async getAllProducts() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProduct(id) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async updateProduct(id, data) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async searchProducts(query) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async getProductsByPriceRange(minPrice, maxPrice) {
    return this.prisma.product.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
      orderBy: { price: 'asc' },
    });
  }
}

module.exports = { ProductService };
