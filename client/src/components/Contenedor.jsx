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
          console.log()
          RsetFilter({datos: props.show, tipo: 'tipo2'+ document.getElementById('AD').value})
          //var tmp = props.show.map(obj => obj)
          console.log('UnaDos')
          props.Filter({datos: props.show.map(obj => obj), tipo: 'tipo2' + document.getElementById('AD').value})
        }
        else{
          //Desfiltro
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
    useEffect(async () => {
      if(Rfilter !== ''){
        //If no se encontro nada
        if(!props.filter.length > 0){ //Esta vacio
          if(document.getElementById('tipo1').checked === true){
            RsetFilter({datos: props.show, tipo: 'tipo1' + document.getElementById('AD').value})
            var tmp = props.show.map(obj => obj)
            props.Filter({datos: tmp, tipo: 'tipo1' + document.getElementById('AD').value})
          }else if(document.getElementById('tipo2').checked === true){
            RsetFilter({datos: props.show, tipo: 'tipo2'+ document.getElementById('AD').value})
            var tmp = props.show.map(obj => obj)
            //Sort sobre el array sin .fuerza
            //Por cada objeto pregunta, tiene fuerza
            //Si no tiene haces el fetch y comparas eso
            console.log('Una')
            props.Filter({datos: tmp, tipo: 'tipo2' + document.getElementById('AD').value})
          }
        } else{
          setMostrar(props.filter)
        }
      }
     }, [props.show]);
    useEffect(async () => {
      if(Rfilter !== ''){
        //If no se encontro nada
        setMostrar(props.filter)
      }
      else{
        setMostrar(props.show)
      }
    });  
    const getData= function(){
      console.log(mostrar)
    }
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
            <label>Siguiente</label>
            <label>Anterior</label>
            <button onClick={getData}>GetData</button>
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
  