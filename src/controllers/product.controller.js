import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto, SearchProductDto } from '../dtos/product.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(@Query() searchProductDto: SearchProductDto) {
    return this.productService.getAllProducts(searchProductDto);
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }

  @UseGuards(AdminGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Get('category/:category')
  async getProductsByCategory(@Param('category') category: string) {
    return this.productService.getProductsByCategory(category);
  }

  @Get('search')
  async searchProducts(@Query() searchProductDto: SearchProductDto) {
    return this.productService.searchProducts(searchProductDto);
  }

  @Get('featured')
  async getFeaturedProducts() {
    return this.productService.getFeaturedProducts();
  }

  @UseGuards(AdminGuard)
  @Post(':id/feature')
  async setProductFeatured(@Param('id') id: number, @Body('featured') featured: boolean) {
    return this.productService.setProductFeatured(id, featured);
  }
}

export const getAllProducts = ProductController.prototype.getAllProducts;
export const getProduct = ProductController.prototype.getProduct;
export const createProduct = ProductController.prototype.createProduct;
export const updateProduct = ProductController.prototype.updateProduct;
export const deleteProduct = ProductController.prototype.deleteProduct;
export const getProductsByCategory = ProductController.prototype.getProductsByCategory;
export const searchProducts = ProductController.prototype.searchProducts;
export const getFeaturedProducts = ProductController.prototype.getFeaturedProducts;
export const setProductFeatured = ProductController.prototype.setProductFeatured;
