import React, {useEffect} from 'react'
import { connect } from "react-redux";
import {getPokemons, Filter} from "../actions/actions"
import Pokemon from './Pokemon.jsx'
export function Contenedor(props){
    //Hooks
    const [mostrar, setMostrar] = React.useState([])
    const [amountInicio, setAmountInicio] = React.useState({
        primera: 0,
        ultima: 12,
    })
    const [Rfilter, RsetFilter] = React.useState('')
    const [estados, setEstados] = React.useState({
      siguiente: null,
      atras: null
    })
    //Handles
    const handleInputChange = function Handle(e){
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
          ultima: amountInicio.ultima + 12
        })
      }
    }

    const onAnterior = function (){
      console.log(amountInicio.primera)
      if(amountInicio.primera > 0){
        setAmountInicio({
          primera: amountInicio.primera -12,
          ultima: amountInicio.ultima - 12
        })
      }
    }
    //UseEffect
    useEffect(async () => {
      setAmountInicio({
        primera: 0,
        ultima: 12
      })
      if(Rfilter !== ''){
        if(!props.filter.length > 0){ 
          handleInputChange()
        }
        } else {
          setMostrar(props.filter)
        }
      } , [props.show]);
    useEffect(async () => {
      if(Rfilter !== ''){
        setMostrar(props.filter)
      }
      else{
        setMostrar(props.show)
      }
    });  

    //Return
    return(
        <div>
            <label>FA</label>
            <input name = 'tipo1' id = 'tipo1' type = 'checkbox' value = {''} onChange = {handleInputChange}></input>
            <label>FP</label>
            <input name = 'tipo2' id = 'tipo2' type = 'checkbox' value = {''} onChange = {handleInputChange}></input>
            <select id = 'AD' form="carform" onChange = {handleInputChange2}>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
            </select>
            <h1>{(props.show.length === 0) ? 'No se encontraron resultados': 'Mostrando resultados'}</h1>
              <div>
                {mostrar.slice(amountInicio.primera, amountInicio.ultima).map(pokemon => <Pokemon
                    data = {pokemon}
                />)}
              </div>
            {mostrar.length > amountInicio.ultima && <label onClick = {onSiguiente}>Siguiente</label>}
            {amountInicio.primera > 0 && <label onClick = {onAnterior}>Anterior</label>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
      show: state.Show,
      inicio: state.Inicio,
      filter: state.Filter,
    }
  }
  
export default connect(
    mapStateToProps,
    {getPokemons, Filter}
  )(Contenedor);
  