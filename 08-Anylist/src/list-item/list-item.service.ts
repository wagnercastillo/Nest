import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ListItem } from './entities/list-item.entity';
import { Repository } from 'typeorm';
import { List } from 'src/lists/entities/list.entity';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class ListItemService {

  constructor(
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,

  ){}

  async create(createListItemInput: CreateListItemInput): Promise<ListItem> {
    const { itemId, listId, ...rest } = createListItemInput;
    const newListItem  = this.listItemRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId }
    })
    
    await this.listItemRepository.save( newListItem )
    return this.findOne( newListItem.id );
  }

  async findAll( 
    list: List, 
    paginationArgs: PaginationArgs, 
    searchArgs: SearchArgs
  ):Promise<ListItem[]>{

    const { limit, offset } = paginationArgs;
    const { search } = searchArgs

    const queryBuilder = this.listItemRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      .where(`"listId" =:listId`, { listId: list.id })
    
    if( search ){
      queryBuilder.andWhere('Lower(name) like :name', { name: `%${ search.toLowerCase() }%` })
    }

      return queryBuilder.getMany();
  }

  async countListItemByList( list: List): Promise<number>{
    return this.listItemRepository.count({
      where: { list: { id: list.id }}
    })
  }
  
  async findOne(id: string): Promise<ListItem> {
    const listItem = await this.listItemRepository.findOneBy({ id }) 
    if( !listItem ) throw new NotFoundException(`List item with id ${ id } not found`)
    return  listItem;
  }

  async update(
    id: string, 
    updateListItemInput: UpdateListItemInput
  ): Promise<ListItem>{

    const { listId, itemId, ...rest } = updateListItemInput;

    const queryBuilder = this.listItemRepository.createQueryBuilder()
      .update()
      .set(rest)
      .where('id = :id', { id });

    if( listId ) queryBuilder.set( { list: { id: listId }});
    if( itemId ) queryBuilder.set( { item: { id: itemId }});

    queryBuilder.execute();
    
    return this.findOne( id );

    
    // const listItem = await this.listItemRepository.preload({
    //   ...rest, 
    //   list: { id: listId },
    //   item: { id: itemId }
    // }); 
    
    // if( !listItem ) throw new NotFoundException(`List item with ${ id } not found`)

    // return this.listItemRepository.save(listItem)
  }

  remove(id: number) {
    return `This action removes a #${id} listItem`;
  }
}
