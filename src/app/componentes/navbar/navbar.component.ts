import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { RUTAS } from 'src/app/rutas';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  rutas:Array<any>;
  constructor(private usuarioService:UsuarioService,
              private router:Router) { 
    this.rutas=RUTAS;
    console.trace('NavbarComponent  constructor');
  }//constructor

  ngOnInit() {
    console.trace('NavbarComponent  ngOnInit');
  }//ngOnInit

  salir(){
    console.trace('NavbarComponent salir');
    const mensaje='esta seguro de querer cerrar su sesion?';
    if(confirm(mensaje)){
      this.usuarioService.cerrarSesion(0);
      this.router.navigate(['/']);//Ira a inicio.
    }
  }// salir

}
