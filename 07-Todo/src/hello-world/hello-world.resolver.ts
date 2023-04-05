import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query( () => String, { description: 'Hola mundo es lo que retorna', name: 'hello' } )
    hello(): string {
        return 'Hola mundo';
    }

    @Query(  () => Float, { name: 'randomNumber'} )
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query(  () => Int, { name: 'RandomFromZeroTo', description: 'From zero to argument to'} )
    getRandomFromZeroTo( 
        @Args('to', { nullable: true, type: ()=> Int }) to: number = 5
    ): number {
        return Math.floor( Math.random()* to )
    }

}
