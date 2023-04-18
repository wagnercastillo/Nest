import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Item } from 'src/items/entities/item.entity';
import { List } from 'src/lists/entities/list.entity';

@Unique('listItem-item', ['list','item'])
@Entity('listItems')
@ObjectType()
export class ListItem {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column({ type: 'numeric'})
  @Field( () => Number)
  quantity: number;

  @Column({ type: 'boolean' })
  @Field( () => Boolean)
  completed: boolean;

  @ManyToOne( () => List, (list) => list.listItem, { lazy: true } )
  @Field( () => List )
  list: List;

  @ManyToOne( () => Item, (item) => item.listItem, { lazy: true})
  @Field( () => Item)
  item: Item
  
}
