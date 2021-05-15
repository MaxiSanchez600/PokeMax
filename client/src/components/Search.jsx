import React, {useEffect} from 'react'
import Contenedor from './Contenedor.jsx'
import { connect } from "react-redux";
import {getPokemons, getPokemonByName, getPokemonByTipo, getPokemonPropios, Invert} from "../actions/actions"

export function Search(props){
    //Hooks
    const [input, setInput] = React.useState({
        name: '',
        tipo: '',
        creado: 'No',
        filtro: '',
        tipos : ''
    });
    //Handle
    const handleInputChange = function Handle(e){
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
    }
    const handleInputChangeCreado = function Handle(e){
            if(document.getElementById('cb').checked === true){
                setInput({
                    ...input,
                    [e.target.name]: 'Si'
                })
                if(props.show.length > 0){
                    if(props.show[0] === 'No se encontro nada'){
                        alert('Imposible iterar sobre una busqueda nula')
                        setInput({
                            ...input,
                            [e.target.name]: 'No'
                        })
                        document.getElementById('cb').checked = false;
                    }
                    else{
                        props.getPokemonPropios(props.show);
                    }
                } else{
                    props.getPokemonPropios();
                }
            }
            else{ 
                setInput({
                    ...input,
                    [e.target.name]: 'No'
                })
                props.Invert(props.anterior);
            }
    }
    const handleInputChangeTipo = async function Handle(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        if(input.creado === 'Si'){
            props.getPokemonByTipo({tipo: e.target.value, limit: '30'}, true);
        }
        else{
            props.getPokemonByTipo({tipo: e.target.value, limit: '30'});
        }
    }
    //Funciones

    const onSearch = async function(){
        setInput({
            ...input,
            tipo: ''
        })
        if(input.name !== ''){
            if(input.creado === 'Si'){
                props.getPokemonByName(input.name, true);
            }
            else{
                props.getPokemonByName(input.name);
            }
        }
        else{
            props.getPokemons('40')
        }
    }
    //UseEffect
    useEffect(async () => {
            const response = await fetch('http://localhost:3001/types');
            const responejson = await response.json();
            setInput({
                ...input,
                tipos: responejson.map(tipo => <option value = {tipo.id}>{tipo.name}</option>)
            })
            if(!props.show.length > 0){
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
                    <select name = 'tipo' form="carform" onChange={handleInputChangeTipo}  value= {input.tipo}>
                        <option value= "" selected disabled hidden>Elegir Tipo</option>
                        {input.tipos}
                    </select>
                    <label>Creado por nosotros</label>
                    <input id = 'cb' type="checkbox" name="creado" value= {input.creado} onChange={handleInputChangeCreado}></input>
                </form>
                <input type = 'submit' onClick = {onSearch}/>
                <Contenedor></Contenedor>
        </div>
    )
};

const mapStateToProps = (state) => {
    return{
      show: state.Show,
      concate: state.Concatenadas,
      inicio: state.Inicio,
      anterior: state.Anterior,
    }
  }
  
export default connect(
    mapStateToProps,
    {getPokemons, getPokemonByName, getPokemonByTipo, getPokemonPropios, Invert}
  )(Search);
  