import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interface/car.interface';
import { v4 as uuid } from 'uuid';
import { UpdateCarDto, CreateCarDto } from './dto';


@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corola',
        // },
    ]

    public finAll(){
        return this.cars;
    }

    public findOneById( id: string ){

        const cars = this.cars.find(car => car.id === id  )
        if(!cars) throw new NotFoundException( `Car with id ${id} not found` );
        return cars;

    }


    public create( createCarDto: CreateCarDto ) {
        const car: Car = {
            id:    uuid() ,
            model: createCarDto.model,
            brand: createCarDto.brand
        }

        this.cars.push( car )
        return car;
    }
    
    public update ( id: string, updateCarDto: UpdateCarDto ) {

        let carDB = this.findOneById(id);

        this.cars = this.cars.map( car => {

            if(car.id === id){
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB;
            }
            return car;
        })
        return carDB;
    }

    public delete (id: string){
    
        const carDB = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
        


    }

    fillCarsWithSeedData ( cars: Car[] ) {
        this.cars = cars;
    }

}



















