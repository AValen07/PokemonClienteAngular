import { Habilidad } from './habilidad';

interface IPokemon{
    id: number;    
    nombre: string;    
    habilidades: Array<Habilidad>;
}

export class Pokemon implements IPokemon {

    id: number;    
    nombre: string;    
    habilidades: Array<Habilidad>;
    

    
    constructor(){
        this.nombre='';
        this.id=0;        
        this.habilidades = new Array<Habilidad>();
    }

    
}