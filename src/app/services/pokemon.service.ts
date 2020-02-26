import { Injectable } from '@angular/core';
import { IPokemonService } from './IPokemon.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService implements IPokemonService{

  constructor(private http: HttpClient) { 
    console.trace('PokemonService constructor');
  }//constructor

  getPokemon(id: number): Observable<any> {
    const url=`http://192.168.0.50:8080/pokemon-aitor/api/pokemon/${id}`;
    console.trace('Ha llamado al metodo getPokemon '+url);   
  
    return this.http.get(url);
  }

  getAllPokemon(): Observable<any> {
    const url=`http://192.168.0.50:8080/pokemon-aitor/api/pokemon/`;
    console.trace('Ha llamado al metodo getPokemon '+url);   
  
    return this.http.get(url);
  } 

  crear(pokemon: Pokemon): Observable<Pokemon> {
    const url=`http://192.168.0.50:8080/pokemon-aitor/api/pokemon/`;

    return this.http.post<Pokemon>(url,pokemon);
  }

  modificar(id:number, pokemon: Pokemon): Observable<Pokemon> {
    const url=`http://192.168.0.50:8080/pokemon-aitor/api/pokemon/${id}/`;

    return this.http.put<Pokemon>(url,pokemon);
  }

  eliminar(id: number): Observable<Pokemon> {
    const url=`http://192.168.0.50:8080/pokemon-aitor/api/pokemon/${id}/`;

    return this.http.delete<Pokemon>(url);
  }
  
}
