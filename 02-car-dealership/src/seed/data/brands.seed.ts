import { Brand } from "src/brands/entities/brand.entity";
import { v4 as uuid } from 'uuid';


export const BRAND_SEED: Brand[] = [
    {
        id: uuid(), 
        name: 'Volvo', 
        createAt: new Date().getTime(),
    },
    {
        id: uuid(), 
        name: 'Honda', 
        createAt: new Date().getTime(),
    },

    {
        id: uuid(), 
        name: 'Jeep', 
        createAt: new Date().getTime(),
    },
    {
        id: uuid(), 
        name: 'Tesla', 
        createAt: new Date().getTime(),
    },


] 