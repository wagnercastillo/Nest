import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { ListItem } from 'src/list-item/entities/list-item.entity';

@Entity( { name: 'lists'})
@ObjectType()
export class List {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID)
  id: string;

  @Column()
  @Field( () => String )
  @IsOptional()
  name: string;

  @ManyToOne( () => User, (user) => user.lists, { nullable: false, lazy: true }) 
  @Index('userId-listIndex')
  @Field( () => User )
  user: User;
  
  
  @OneToMany( () => ListItem, (listItem) => listItem.list, { lazy: true })
  @Field( () => [ListItem])
  listItem: ListItem[];
}
