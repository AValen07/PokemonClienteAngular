import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Habilidad } from 'src/app/model/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';


@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  pokemones:Array<Pokemon>;
  pokemonSeleccionado:Pokemon;
  formularioPokemon : FormGroup;
  habilidadesFormulario:Array<any>;
  habilidades:Array<Habilidad>;

  // mensajes
  mensaje: string;
  showMensaje: boolean;

  constructor(private pokemonService:PokemonService,
              private _builder : FormBuilder,
              private habilidadService:HabilidadService) { 
    
    this.habilidades = new Array<Habilidad>();
    this.habilidadesFormulario = new Array<any>();
    this.pokemones = new Array<Pokemon>();
    this.pokemonSeleccionado= new Pokemon();
    console.trace('pokemonSeleccionado: %o', this.pokemonSeleccionado);
    this.formularioPokemon=this._builder.group({
      //definir los FormControl == inputs
      nombre:['',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      id:[0]
    });

    this.mensaje='';
    this.showMensaje=false;
    
  }//constructor

  ngOnInit() {
    this.cargarListado();
    
    this.habilidadService.getAllHabilidades().subscribe(el=>{
      this.habilidades=el;
      this.habilidadesFormulario = this.habilidades.map(el => {
        return {name: el.nombre, value: el.nombre, checked: false}; 
      });
    });
  }//ngOnInit

  nuevo(){
    this.pokemonSeleccionado=new Pokemon();
    this.formularioPokemon.controls.nombre.setValue(this.pokemonSeleccionado.nombre);
    this.formularioPokemon.controls.id.setValue(this.pokemonSeleccionado.id);
  }
  enviar(values:any){
    
    console.trace('valores: %o',values);
    if(values.id==0){
      this.crear(values);
    }else{
      this.modificar(values);
    }
  }
  crear(values:any){
    console.trace('crear: %o',values);
    let p:Pokemon;
    p=new Pokemon();
    p.nombre=values.nombre;

    this.pokemonService.crear(p).subscribe(()=>{
      this.mensaje='Se ha creado el pokemon correctamente';
      this.showMensaje=true;
      this.cargarListado();
      this.nuevo();
    },
    (error)=>{
      if(error.status==409){
        console.debug('El pokemon introducido ya existe. %o', error);
        this.mensaje='El pokemon introducido ya existe. Intentelo de nuevo.';
        this.showMensaje=true;
        this.nuevo();
      } else{
        console.debug('Algo ha ido bastante mal. %o', error);
        this.mensaje='Error desconocido. Intentelo de nuevo.';
        this.showMensaje=true;
        this.nuevo();
      }
      
    });
  }
  modificar(values:any){
    console.trace('modificar: %o',values);
    let p:Pokemon;
    p=new Pokemon();
    p.nombre=values.nombre;
    p.id=values.id;
    this.pokemonService.modificar(values.id,p).subscribe(()=>{
      this.mensaje='Se ha modificado el pokemon correctamente';   
      this.showMensaje=true;
      this.cargarListado();
      this.nuevo();   
    },
    error=>{
      if(error.status==409){
        console.debug('El pokemon introducido ya existe. %o', error);
        this.mensaje='El pokemon introducido ya existe. Intentelo de nuevo.';        
      } else{
        console.debug('Algo ha ido bastante mal. %o', error);
        this.mensaje='Error desconocido. Intentelo de nuevo.';        
      }      
      this.showMensaje=true;
      this.cargarListado();
      this.nuevo();
    });
  }

  eliminar(id:number){
    if(confirm('Estas seguro?')){
      this.pokemonService.eliminar(id).subscribe(()=>{
      this.mensaje='Se ha eliminado el pokemon correctamente';
      this.showMensaje=true;
      this.cargarListado();
      });
    }
  }
  seleccionarPokemon(pokemon:Pokemon){
    this.pokemonSeleccionado=pokemon;
    this.formularioPokemon.controls.nombre.setValue(this.pokemonSeleccionado.nombre);
    this.formularioPokemon.controls.id.setValue(this.pokemonSeleccionado.id);
  }

  cargarListado(){
    this.pokemonService.getAllPokemon().subscribe(
      (lista)=>{
        console.trace('hace cosas %o',lista);
        this.pokemones=lista;
        console.trace('hace cosas %o',this.pokemones);
      });
  }
}//BackofficeComponent
