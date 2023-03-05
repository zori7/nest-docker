import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product as ProductModel } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('price') price: number,
  ): Promise<ProductModel> {
    return this.prismaService.product.create({
      data: {
        title,
        description: desc,
        price,
      },
    });
  }

  @Get()
  async getProducts(): Promise<ProductModel[]> {
    return this.prismaService.product.findMany();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<ProductModel> {
    try {
      return await this.prismaService.product.findUniqueOrThrow({
        where: {
          id: +id,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Product not found');
        }
      }
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('product') product: Prisma.ProductUpdateInput,
  ): Promise<ProductModel> {
    return this.prismaService.product.update({
      where: {
        id: +id,
      },
      data: product,
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.prismaService.product.delete({
      where: {
        id: +id,
      },
    });
  }
}
