import { Car } from "src/cars/interface/car.interface"
import { v4 as uuid } from 'uuid';


export const CARS_SEED: Car[] = [
    {
        id: uuid(), 
        model: 'Toyota', 
        brand: 'Corolla',
    },
    {
        id: uuid(), 
        model: 'Honda', 
        brand: 'Civic',
    },
    {
        id: uuid(), 
        model: 'Jeep', 
        brand: 'Cherokee',
    },


] 