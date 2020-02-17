import { Observable } from "rxjs";
import { Pokemon } from '../model/pokemon';

export interface IPokemonService {

    /**
     * Recuperamos los datos en JSON de un pokemon por su id
     * @param id : number identificador del pokemon a buscar
     * @see GET /pokemon-rest/api/pokemon/{id}/
     */
    getPokemon(id:number):Observable<any>;

    getAllPokemon():Observable<any>;

    crear(pokemon:Pokemon):Observable<Pokemon>;

    modificar(id:number,pokemon:Pokemon):Observable<Pokemon>;

    eliminar(id:number): Observable<Pokemon>;
}