import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario : FormGroup;

  constructor(private _builder : FormBuilder, 
              private usuarioService:UsuarioService, 
              private router:Router) { 
    console.trace('LoginComponent constructor');

    this.formulario=this._builder.group({
      //definir los FormControl == inputs
      nombre: ['admin', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(15)]) ],
      password:['1234567', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])]
    });

  }//constructor

  ngOnInit() {
    console.trace('LoginComponent ngOnInit');

  }//ngOnInit


  enviar(values:any){
    const nombre = values.nombre;
    const password = values.password;
    const uLogeado = this.usuarioService.login(nombre,password);
    console.trace('Submit formulario %o', values);

    if(uLogeado){
      console.trace('Usuaro logueado con exito %o', uLogeado);
      this.router.navigate(['backoffice']);

    }else{
      console.trace('Usuario no logueado')
      //TODO cambiar alert
      alert('Por favor intentalo de nuevo')
    }

  }// enviar

  salir(){

  }// salir
}//LoginComponent
