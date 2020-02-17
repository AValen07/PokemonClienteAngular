import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {

  pokemones:Array<Pokemon>;
  pokemonSeleccionado:Pokemon;
  formularioPokemon : FormGroup;

  constructor(private pokemonService:PokemonService,
              private _builder : FormBuilder) { 

    this.pokemones = new Array<Pokemon>();
    this.pokemonSeleccionado= new Pokemon();
    console.trace('pokemonSeleccionado: %o', this.pokemonSeleccionado);
    this.formularioPokemon=this._builder.group({
      //definir los FormControl == inputs
      nombre:['',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      id:[0]
    });
    
  }//constructor

  ngOnInit() {
    this.pokemonService.getAllPokemon().subscribe(
      (lista)=>{
        console.trace('hace cosas %o',lista);
        this.pokemones=lista;
        console.trace('hace cosas %o',this.pokemones);
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
      console.debug('todo va bien');
    });
  }
  modificar(values:any){
    console.trace('modificar: %o',values);
    let p:Pokemon;
    p=new Pokemon();
    p.nombre=values.nombre;
    p.id=values.id;
    this.pokemonService.modificar(values.id,p).subscribe();
  }

  eliminar(id:number){
    if(confirm('Estas seguro?')){
      this.pokemonService.eliminar(id).subscribe();
    }
  }
  seleccionarPokemon(pokemon:Pokemon){
    this.pokemonSeleccionado=pokemon;
    this.formularioPokemon.controls.nombre.setValue(this.pokemonSeleccionado.nombre);
    this.formularioPokemon.controls.id.setValue(this.pokemonSeleccionado.id);
  }

}//BackofficeComponent
