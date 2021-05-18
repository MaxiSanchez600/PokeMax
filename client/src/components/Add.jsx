import React, {useEffect } from 'react'
import $ from 'jquery';
import { connect } from "react-redux";
import {getPokemons} from "../actions/actions"
import './css/add.css'
import PokemonInfo from './PokemonInfo.jsx'

export function Add(props){
    const [input, setInput] = React.useState({
        name: '',
        vida: '',
        fuerza: '',
        defensa: '',
        velocidad: '',
        altura: '',
        peso: '',
        tipos: [],
        tipos2: [],
        tipos3: []
    });
    const [estado, setEstado] = React.useState('')
    const [tipo, setTipo] = React.useState('')
    const [errores, setErrores] = React.useState({name: 'El nombre de su Pokemon es obligatorio', stats: 'Todas las estadisticas son requeridas'});
    const [errorTipo, setErrorTipo] = React.useState({tipos: 'Por lo menos debes seleccionar un tipo'})
    const handleInputChange = function Handle(e){
        setErrores(onValidate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleInputChange2 = function Handle(e){
        input.tipos.push(e.target.value)
        input.tipos3.push(document.getElementById(e.target.value).getAttribute("name"))
        setInput({
            ...input
        })
        setErrorTipo({
            tipos: ''
        })
    }
    const onSend = async function(){
        if(errores.name === '' && errores.stats === '' && errorTipo.tipos === ''){
            const options = {
                method: 'POST',
                body: JSON.stringify(input),
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
            }
            const response = await fetch('http://localhost:3001/pokemons', options)
            const responejson = await response.json()
            setEstado(responejson.message)
            props.getPokemons('40')
        }
        else{
            setEstado('Revisa todos los campos')
        }
    }
    
    const onValidate = function validate(input) {
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let errors = {};
        if(!input.name) {
            errors.name = 'El nombre de su Pokemon es obligatorio';
        }
        else{
            if(format.test(input.name) || /\d/.test(input.name)){
                errors.name = 'El nombre de su Pokemon es invalido';
            }
            else{
                errors.name = ''
            }
        }
        if(input.vida === '' || input.fuerza === '' || input.defensa === '' || input.velocidad === '' || input.altura === '' || input.peso === ''){
            errors.stats = 'Todas las estadisticas son requeridas'
        }
        else{
            errors.stats = ''
        }
        return errors;
    };
    useEffect(()=>{
        setEstado(estado)
    })
    useEffect(async ()=>{
        const response = await fetch('http://localhost:3001/types');
        const responejson = await response.json();
        setInput({
            ...input,
            tipos2: responejson.map(tipo => <option id = {tipo.id} name = {tipo.name} value = {tipo.id}>{tipo.name}</option>)
        })
        props.getPokemons('40')
    },[])
    return(
        <div className = 'divaddprincipal'>
            <div className = 'divadd1'>
                <div className = 'divname1'>
                    <label>¡Hora de crear<span> tu Pokemon!</span></label>
                    <input name = 'name' type = 'text' placeholder = 'name' onChange={handleInputChange} value={input.name}/>
                    {errores.name && <p>{errores.name}</p>}
                    {!errores.name && <p>¡Que nombre mas fachero!</p>}
                </div>
                <div className ='divstats1'>
                    <div>
                        <input type ='number' name = 'vida' placeholder = 'vida' onChange={handleInputChange} value={input.vida}/>
                        <input type ='number' name = 'fuerza'  placeholder = 'fuerza' onChange={handleInputChange} value={input.fuerza}/>
                    </div>
                    <div>
                        <input type ='number' name = 'defensa'  placeholder = 'defensa' onChange={handleInputChange} value={input.defensa}/>
                        <input type ='number' name = 'velocidad'  placeholder = 'velocidad' onChange={handleInputChange} value={input.velocidad}/>
                    </div>
                    <div>
                        <input type ='number' name = 'altura'  placeholder = 'altura' onChange={handleInputChange} value={input.altura}/>
                        <input type ='number' name = 'peso'  placeholder = 'peso' onChange={handleInputChange} value={input.peso}/>
                    </div>
                    {errores.stats && <p>{errores.stats}</p>}
                    {!errores.stats && <p>Estadisticas muy balanceadas, ¡Genial!</p>}
                </div>
                <div className = 'divtipo1'>
                    <select name = 'tipo1' form="carform" onChange={handleInputChange2} value = {tipo}>
                        <option value="" selected disabled hidden>Choose here</option>
                        {input.tipos2}
                    </select>
                    <div>
                        {input.tipos3.map(tipo => <label>{tipo}</label>)}
                    </div>
                    {errorTipo && <p>{errorTipo.tipos}</p>}
                </div>
                <div className = 'divbutton1'>
                    <button className = 'but' onClick = {onSend}>Crear</button>
                    <h4>{estado}</h4>
                </div>
            </div>
            <PokemonInfo es = {input}></PokemonInfo>
        </div>
    )

}

const mapStateToProps = (state) => {
    return{
      show: state.Show,
      concate: state.Concatenadas,
      inicio: state.Inicio,
      anterior: state.Anterior
    }
  }
  
export default connect(
    mapStateToProps,
    {getPokemons}
  )(Add);
  