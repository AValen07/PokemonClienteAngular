import { Injectable } from '@angular/core';
import { IPokemonService } from './IPokemon.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  
}
