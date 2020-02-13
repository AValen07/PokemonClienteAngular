import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPokemon'
})
export class FiltroPokemonPipe implements PipeTransform {

  transform(datos: any, nombreBusqueda:string, nombreHabilidad:Array<any> ): any {
    
    let resultado;
    

    if(nombreBusqueda && '' !==nombreBusqueda.trim()){
      resultado=datos.filter(el=>el.nombre.includes(nombreBusqueda));

    }else{
      resultado=datos;
    }

    if(nombreHabilidad.length>0){
      console.trace("lista habilidades %o",nombreHabilidad);
      nombreHabilidad=nombreHabilidad.map(el=>el.name);
      //habilidadesActivas=nombreHabilidad.filter(el=>el.checked==true);
      resultado=resultado.filter(el=>el.habilidades.find(el=>nombreHabilidad.indexOf(el.nombre)!==-1));
      console.trace(resultado);
    }

    return resultado;
  }

}
