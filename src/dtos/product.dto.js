const { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsNotEmpty, Min, Max, IsEnum } = require('class-validator');

const ProductCategory = {
  ELECTRONICS: 'ELECTRONICS',
  FASHION: 'FASHION',
  HOME: 'HOME',
  BEAUTY: 'BEAUTY',
  SPORTS: 'SPORTS',
  BOOKS: 'BOOKS',
  OTHER: 'OTHER',
};

class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsString()
  @IsNotEmpty()
  description;

  @IsNumber()
  @Min(0)
  price;

  @IsNumber()
  @Min(0)
  pointsRequired;

  @IsEnum(ProductCategory)
  category;

  @IsArray()
  @IsString({ each: true })
  images;

  @IsNumber()
  @Min(0)
  stock;

  @IsOptional()
  @IsBoolean()
  featured;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;
}

class UpdateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pointsRequired;

  @IsOptional()
  @IsEnum(ProductCategory)
  category;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock;

  @IsOptional()
  @IsBoolean()
  featured;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;
}

class SearchProductDto {
  @IsOptional()
  @IsString()
  query;

  @IsOptional()
  @IsEnum(ProductCategory)
  category;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPoints;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPoints;

  @IsOptional()
  @IsBoolean()
  inStock;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags;
}

module.exports = {
  ProductCategory,
  CreateProductDto,
  UpdateProductDto,
  SearchProductDto,
};
