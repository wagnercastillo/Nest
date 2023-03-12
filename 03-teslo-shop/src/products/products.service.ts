import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');


  constructor(

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ) { }

  async create(createProductDto: CreateProductDto) {

    try {

      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save(product)

      return product;

    } catch (error) {
      this.handleDBExeptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0   } = paginationDto;

    return this.productRepository.find({
      take: limit,
      skip: offset,
      // TODO: Relaciones
    });

  }

  async findOne(term: string) {

    let product: Product;

    if( isUUID(term) ) {
      product = await this.productRepository.findOne({ where: { id: term } })
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where('UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(), 
        }).getOne();
      // product = await this.productRepository.findOne({ where: { slug: term } })
    }


    if (!product)
      throw new NotFoundException(`Product with id '${term}' not found'`)

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
  
    const product = await this.productRepository.preload({
      id: id, 
      ...updateProductDto
    })

    if( !product ) throw new BadRequestException(`Product with ID${ id } not found`)

    try {
      
      await this.productRepository.save( product )
      
      return product;
      
    } catch (error) {
      this.handleDBExeptions( error )
    }

  }

  async remove(id: string) {

    try {

      await this.productRepository.delete(id)

    } catch (error) {
      throw new error(error)
    }

  }


  private handleDBExeptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server log')
  }
}
