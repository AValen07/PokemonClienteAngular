interface IHabilidad{
    id: number;    
    nombre: string;    
    
}

export class Habilidad implements IHabilidad{

    id: number;    
    nombre: string;

    constructor(){
        this.id=0;
        this.nombre='';
    }
}