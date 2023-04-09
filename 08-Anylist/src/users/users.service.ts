import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignupInput } from '../auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidRoles } from '../auth/enums/valid-roles.enums';

@Injectable()
export class UsersService {

  private logger: Logger = new Logger('UsersService')
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}
  
  async create(signupInput: SignupInput): Promise<User> {
    try {
      
      const newUser = this.usersRepository.create( {
        ...signupInput, 
        password: bcrypt.hashSync( signupInput.password, 10)
      } )

      return await this.usersRepository.save( newUser )

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll( roles: ValidRoles[] ): Promise<User[]> {
    
    if( roles.length === 0) return this.usersRepository.find({
      // TODO: No es necesario, porque esta establecida Lazy en la propiedad de lastUpdateBy
      // relations: {
      //   lastUpdateBy: true
      // }
    });
    return this.usersRepository.createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)
      .getMany();
    
  }

  async findOneByEmail(email: string): Promise<User> {

    try {
      return await this.usersRepository.findOneByOrFail({ email })
    } catch (error) {
      throw new NotFoundException(`${ email } not found`)
    }
  }

  async findOneById(id: string): Promise<User> {

    try {
      return await this.usersRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`${ id } not found`)
    }
  }

  async update( id: string,  updateUserInput: UpdateUserInput, user: User
  ): Promise<User>{

    try {

      const user = await this.usersRepository.preload({
        ...updateUserInput,
        id
        
      })
      user.lastUpdateBy = user;
      return await this.usersRepository.save( user )

    } catch (error) {
      this.handleDBErrors(error)
    }
    
    
    
  }

  async block(id: string, user: User): Promise<User> {
    const userToBlock = await this.findOneById( id )
    userToBlock.isActive = false;
    userToBlock.lastUpdateBy = user;
    return await this.usersRepository.save( userToBlock)
  }

  private handleDBErrors( error: any ): never {

    if( error.code ='23505'){
      throw new BadRequestException(error.detail.replace('Key', ''))
    }

  
    this.logger.error( error );
    throw new InternalServerErrorException('Please check server logs');
  }
  
}


