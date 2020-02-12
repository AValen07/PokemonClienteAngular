import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPokemon'
})
export class FiltroPokemonPipe implements PipeTransform {

  transform(datos: any, nombreBusqueda:string ): any {
    
    let resultado;
    

    if(nombreBusqueda && '' !==nombreBusqueda.trim()){
      resultado=datos.filter(el=>el.nombre.includes(nombreBusqueda));
    }else{
      resultado=datos;
    }

    return resultado;
  }

}
