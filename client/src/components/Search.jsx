import React, {useEffect} from 'react'
import Contenedor from './Contenedor.jsx'
import { connect } from "react-redux";
import {getPokemons, getPokemonByName, getPokemonByTipo} from "../actions/actions"

export function Search(props){

    //Hooks
    const [input, setInput] = React.useState({
        name: '',
        tipo: ''
    });
    //Handle
    const handleInputChange = function Handle(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    //Funciones
    const onSearch = async function(){
        //If => Todo vacio => Busca de alguna manera
        if(input.name !== ''){
            props.getPokemonByName(input.name)
        }
        console.log(input.tipo)
        if(input.tipo !== ''){
            props.getPokemonByTipo({tipo: input.tipo, limit: '30'})
        }
        //If => Hay tipo seleccionado
                //If Orden Alfabetico
                //If Fuerza
        //If => Hay tipo y creado por mi seleccionado
                //Orden Alfabetico
                //If Fuerza
    }
    //UseEffect
    useEffect(async () => {
            if(props.inicio.length === 0){
                props.getPokemons('40')
             }
      }, []);
    
    return(
        <div>
            <h1>Search</h1>
                <form>
                    <label>Buscar por nombre</label>
                    <input name = 'name' type = 'text' onChange={handleInputChange} value={input.name}/>
                    <label>Buscar por tipo</label>
                    <select name = 'tipo' form="carform" onChange={handleInputChange}  value= {input.tipo}>
                        <option value= "" selected disabled hidden>Choose here</option>
                        <option value="10">Fuego</option>
                        <option value="11">Agua</option>
                    </select>
                </form>
                <input type = 'submit' onClick = {onSearch}/>
                <Contenedor pokemonsInicio = {props.inicio} pokemonsShow = {props.show}></Contenedor>
        </div>
    )
};

const mapStateToProps = (state) => {
    return{
      show: state.Show,
      concate: state.Concatenadas,
      inicio: state.Inicio
    }
  }
  
export default connect(
    mapStateToProps,
    {getPokemons, getPokemonByName, getPokemonByTipo}
  )(Search);
  