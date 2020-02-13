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
    const url=`http://localhost:8080/pokemon-rest/api/pokemon/${id}`;
    console.trace('Ha llamado al metodo getPokemon '+url);   
  
    return this.http.get(url);
  }

  getAllPokemon(): Observable<any> {
    const url=`http://localhost:8080/pokemon-rest/api/pokemon/`;
    console.trace('Ha llamado al metodo getPokemon '+url);   
  
    return this.http.get(url);
  } 

  crear(pokemon: Pokemon): Observable<Pokemon> {
    const url=`http://localhost:8080/pokemon-rest/api/pokemon/`;

    return this.http.post<Pokemon>(url,pokemon);
  }

  modificar(pokemon: Pokemon): Observable<Pokemon> {
    throw new Error("Method not implemented.");
  }

  eliminar(id: number): Observable<Pokemon> {
    const url=`http://localhost:8080/pokemon-rest/api/pokemon/${id}`;

    return this.http.delete<Pokemon>(url);
  }
  
}
