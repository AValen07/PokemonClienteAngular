import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHabilidadService } from './IHabilidad.service';

@Injectable({
  providedIn: 'root'
})

export class HabilidadService implements IHabilidadService{
    
    constructor(private http: HttpClient){
        console.trace('HabilidadService constructor');

    }// constructor
    
    getAllHabilidades(): Observable<any> {
        const url=`http://192.168.0.50:8080/pokemon-aitor/api/habilidad/`;
        console.trace('Ha llamado al metodo getAllHabilidades '+url);   
    
        return this.http.get(url);
    }
    
}