import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router:Router, private usuarioService:UsuarioService){
    console.debug('LoginGuard constructor'); 
  }//constructor

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    const logeado:boolean=this.usuarioService.estaLogueado();


    console.debug('LoginGuard CanActivate');  
    
    if(!logeado){
      this.router.navigate(['login']);
    }

    
    return logeado;
  }// canActivate
  
}
