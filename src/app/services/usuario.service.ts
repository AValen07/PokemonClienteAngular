import { Injectable } from '@angular/core';
import { IUsuarioService } from './IUsuario.service';
import { Usuario } from '../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IUsuarioService{

  private storage;
  private isLogged:boolean;
  private usuario: Usuario;
  constructor() { 
    console.trace('UsuarioService constructor');
    this.storage=window.sessionStorage;
    this.isLogged=false;
    this.usuario=undefined;
  }// constructor

  estaLogueado(): boolean {
    console.trace('UsuarioService estaLogueado');
    let isLogged=this.storage.getItem('isLogged');
    if(this.storage.getItem('isLogged')){
      return true;

    } else{
      return false;
    }
    
  }

  /**
   * Busca el usuario por nombre y password
   * @param nombre 
   * @param password 
   * @return Usuario con datos si existe
   */
  login(nombre: string, password: string) {
    console.trace('UsuarioService estaLogueado');
    
    
    
    const NOMBRE ='admin';
    const PASS ='1234567';
    let usuarioBuscar:Usuario;

    if(NOMBRE==nombre && PASS==password){
      console.trace('usuario encontrado');
      usuarioBuscar=new Usuario();
      usuarioBuscar.nombre=nombre;
      usuarioBuscar.password=password;
      usuarioBuscar.id=99;
      this.storage.setItem('isLogged',true);
    }else{
      console.trace('usuaro no encontrado');
      this.storage.setItem('isLogged',false);
    }

    return usuarioBuscar;
  }//login

  cerrarSesion(idUsuario: number) {
    console.trace('UsuarioService cerrarSesion');
    this.storage.removeItem('isLogged');
  }

  
}// UsuarioService
