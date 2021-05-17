import React, {useEffect} from 'react'
import { connect } from "react-redux";
import {getPokemons, Filter, Vaciar} from "../actions/actions"
import Pokemon from './Pokemon.jsx'
import './css/Contenedor.css'
import Gif from '../imgs/Carga2.gif'

export function Contenedor(props){
    //Hooks
    const [mostrar, setMostrar] = React.useState([])
    const [amountInicio, setAmountInicio] = React.useState({
        primera: 0,
        ultima: 15,
    })
    const [Rfilter, RsetFilter] = React.useState('')
    const [estados, setEstados] = React.useState({
      siguiente: null,
      atras: null
    })
    //Handles
    const handleInputChange = function Handle(e){
      if(document)
      if(document.getElementById('tipo1').checked === true && document.getElementById('tipo2').checked === true){
        if(e.target.name === 'tipo1') {
          document.getElementById('tipo2').checked = false
        }
        if(e.target.name === 'tipo2'){
           document.getElementById('tipo1').checked = false
        }
      }
        if(document.getElementById('tipo1').checked === true){
          RsetFilter({datos: props.show, tipo: 'tipo1' + document.getElementById('AD').value})
          var tmp = props.show.map(obj => obj)
          props.Filter({datos: tmp, tipo: 'tipo1' + document.getElementById('AD').value})
        }else if(document.getElementById('tipo2').checked === true){
          RsetFilter({datos: props.show, tipo: 'tipo2'+ document.getElementById('AD').value})
          props.Filter({datos: props.show.map(obj => obj), tipo: 'tipo2' + document.getElementById('AD').value})
        }
        else{
          RsetFilter('')
          setMostrar(props.show)
        }
      
    }

    const handleInputChange2 = function Handle(e){
      if(document.getElementById('tipo1').checked === true){
        var tmp = props.show.map(obj => obj)
        RsetFilter({datos: [], tipo: 'tipo1' + e.target.value})
        props.Filter({datos: tmp, tipo: 'tipo1' + e.target.value})
      }
      if(document.getElementById('tipo2').checked === true){
        var tmp = props.show.map(obj => obj)
        RsetFilter({datos: [], tipo: 'tipo2' + e.target.value})
        props.Filter({datos: tmp, tipo: 'tipo2' + e.target.value})
      }
    }

    const onSiguiente = function (){
      if(mostrar.length > amountInicio.ultima){
        setAmountInicio({
          primera: amountInicio.ultima,
          ultima: amountInicio.ultima + 15
        })
      }
    }

    const onAnterior = function (){
      if(amountInicio.primera > 0){
        setAmountInicio({
          primera: amountInicio.primera -15,
          ultima: amountInicio.ultima - 15
        })
      }
    }
    //UseEffect
    useEffect(async () => {
      if(props.show.length !== 0){
        setAmountInicio({
          primera: 0,
          ultima: 15
        })
        if(Rfilter !== ''){
          if(!props.filter.length > 0){ 
            setMostrar([])
            handleInputChange()
          }
          }
          else {
            setMostrar(props.show)
          }
      }
      else{
        setMostrar([])
      }
      } ,[props.show]);
    
      useEffect(async () => {
        if(props.filter.length > 0){ 
          setMostrar(props.filter)
        }
      } ,[props.filter]);

    //Return
    return(
        <div classname = 'divInit'>
          <div className = "divP">
              <div>
                <label>Filtrar por orden <span>Alfabetico</span></label>
                <input name = 'tipo1' id = 'tipo1' type = 'checkbox' value = {''} onChange = {handleInputChange}></input>
              </div>
              <div className = 'divMargin'>
                <label className = 'LabelMargin'>Filtrar por <span>Fuerza</span></label>
                <input name = 'tipo2' id = 'tipo2' type = 'checkbox' value = {''} onChange = {handleInputChange}></input>
              </div>
              <select id = 'AD' form="carform" onChange = {handleInputChange2} className = 'Select'>
                          <option value="A">Ascendente</option>
                          <option value="D">Descendente</option>
              </select>
            </div>
            <h1 className = 'h1b'>{(props.busca === true) ? <img className = 'imgloading' src = {Gif}></img>: (props.show.length === 0) ? 'No se encontraron resultados' : ''}</h1>
              <div className = 'divPokemon'>
                {mostrar.slice(amountInicio.primera, amountInicio.ultima).map(pokemon => <Pokemon
                    data = {pokemon}
                />)}
              </div>
            {mostrar.length > amountInicio.ultima && <label className = 'onSiguiente' onClick = {onSiguiente}>Siguiente</label>}
            {amountInicio.primera > 0 && <label className = 'onAnterior'  onClick = {onAnterior}>Anterior</label>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
      show: state.Show,
      inicio: state.Inicio,
      filter: state.Filter,
      busca: state.Busca
    }
  }
  
export default connect(
    mapStateToProps,
    {getPokemons, Filter, Vaciar}
  )(Contenedor);
  