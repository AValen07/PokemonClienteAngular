import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Habilidad } from 'src/app/model/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {


  
  pokemones:Array<Pokemon>;
  pokemonSeleccionado:Pokemon;
  habilidades:Array<Habilidad>;
  constructor(private pokemonService:PokemonService,
              private habilidadService:HabilidadService) { 
    console.trace('InicioComponent constructor');
    this.pokemones=new Array<Pokemon>();
    this.pokemonSeleccionado=new Pokemon();
    this.habilidades= new Array<Habilidad>();
  }// constructor

  ngOnInit() {
    console.trace('InicioComponent ngOnInit');
    
    this.pokemonService.getAllPokemon().subscribe(
      (lista)=>{
        console.trace('hace cosas %o',lista);
        this.pokemones=lista;
      }
    )
    this.habilidadService.getAllHabilidades().subscribe(el=>this.habilidades=el);


  }// ngOnInit

}// InicioComponent
