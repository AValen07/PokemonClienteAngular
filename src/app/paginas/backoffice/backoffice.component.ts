import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
    console.debug('pokemonSeleccionado: %o', this.cargarHabilidades());
    this.formularioPokemon=this._builder.group({
      //definir los FormControl == inputs
      nombre:['',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      id:[0],
      habilidades: this._builder.array([], [Validators.required, Validators.minLength(1)])
    });

    this.mensaje='';
    this.showMensaje=false;    
  }//constructor

  
  ngOnInit() {
    this.cargarListado();
    this.cargarHabilidades();
    
  }//ngOnInit

  private crearFormGroupHabilidad():FormGroup{

    return this._builder.group({
      id:new FormControl(0),
      nombre:new FormControl('')
    });
  }

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
    p.habilidades=values.habilidades;

    this.pokemonService.crear(p).subscribe(()=>{
      this.mensaje='Se ha creado el pokemon correctamente';
      this.showMensaje=true;
      this.cargarListado();
      this.nuevo();
      this.limpiarChecks();
    },
    (error)=>{
      if(error.status==409){
        console.debug('El pokemon introducido ya existe. %o', error);
        this.mensaje='El pokemon introducido ya existe. Intentelo de nuevo.';
        this.showMensaje=true;
        this.nuevo();
        this.limpiarChecks();
      } else{
        console.debug('Algo ha ido bastante mal. %o', error);
        this.mensaje='Error desconocido. Intentelo de nuevo.';
        this.showMensaje=true;
        this.nuevo();
        this.limpiarChecks();
      }
      
    });
  }
  modificar(values:any){
    console.trace('modificar: %o',values);
    let p:Pokemon;
    p=new Pokemon();
    p.nombre=values.nombre;
    p.id=values.id;
    p.habilidades=values.habilidades;

    this.pokemonService.modificar(values.id,p).subscribe(()=>{
      this.mensaje='Se ha modificado el pokemon correctamente';   
      this.showMensaje=true;
      this.cargarListado();
      this.nuevo();
      this.limpiarChecks();   
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
      this.limpiarChecks();

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

  limpiarChecks(){
    this.habilidadesFormulario.forEach(el=>{ el.checked=false});
  }

  getFormArray():FormArray{
    return <FormArray>this.formularioPokemon.get('habilidades');
  }

  seleccionarPokemon(pokemon:Pokemon){
    let habilidades = this.getFormArray();
    this.pokemonSeleccionado=pokemon;
    this.formularioPokemon.controls.nombre.setValue(this.pokemonSeleccionado.nombre);
    this.formularioPokemon.controls.id.setValue(this.pokemonSeleccionado.id);
    
    while(habilidades.length!==0){

      habilidades.removeAt(0);
      
    }
    
    this.limpiarChecks();
    
    pokemon.habilidades.forEach(habilidad => {
      //this.cambioHabilidad(habilidad);
      const habildades = this.crearFormGroupHabilidad();
      habildades.get('nombre').setValue(habilidad.nombre);
      habildades.get('id').setValue(habilidad.id);
      habilidades.push(habildades);

      this.habilidadesFormulario.forEach(elemento=>{

        if(elemento.value===habilidad.id){
          elemento.checked=true;
          console.debug(elemento);
        }
      });
    });
    
  }

  cargarListado(){
    this.pokemonService.getAllPokemon().subscribe(
      (lista)=>{
        console.trace('hace cosas %o',lista);
        this.pokemones=lista;
        console.trace('hace cosas %o',this.pokemones);
      });
  }

  cargarHabilidades(){
    this.habilidadService.getAllHabilidades().subscribe(el=>{
    this.habilidades=el;
    this.habilidadesFormulario = this.habilidades.map(el => {
      return {name: el.nombre, value: el.id, checked: false};
      }); 
    });     
    
  }

  cambioHabilidad(habilidad:any){
    let habilidades = this.getFormArray();
    console.debug(habilidad);
    habilidad.checked = !habilidad.checked
    console.debug(habilidad);
    let array:Array<any>;
    const habildades = this.crearFormGroupHabilidad();
    habildades.get('nombre').setValue(habilidad.name);
    habildades.get('id').setValue(habilidad.value);
    
    //array.findIndex
   
    if(habilidad.checked){
      
      habilidades.push(habildades);
    }else{      
      const array = this.formularioPokemon.get('habilidades').value; //removeAt(id);
      const id=array.findIndex(el=> el.id===habilidad.value);
      console.debug(id);
      habilidades.removeAt(id);
    }
  }
  

}//BackofficeComponent
