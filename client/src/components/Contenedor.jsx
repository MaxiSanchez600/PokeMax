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
        if(document.getElementById(e.target.name).checked === true){
          RsetFilter({datos: props.show, tipo: e.target.name + document.getElementById('AD').value})
          var tmp = props.show.map(obj => obj)
          console.log(tmp)
          props.Filter({datos: tmp, tipo: e.target.name + document.getElementById('AD').value})
        } else{
          //Desfiltro
          RsetFilter('')
        }
      
    }

    const handleInputChange2 = function Handle(e){
      if(document.getElementById('tipo1').checked === true){
        var tmp = props.show.map(obj => obj)
        RsetFilter({datos: tmp, tipo: 'tipo1' + e.target.value})
        props.Filter({datos: tmp, tipo: 'tipo1' + e.target.value})
      }
      if(document.getElementById('tipo2').checked === true){
        var tmp = props.show.map(obj => obj)
        RsetFilter({datos: tmp, tipo: 'tipo2' + e.target.value})
        props.Filter({datos: tmp, tipo: 'tipo2' + e.target.value})
      }
    }

    useEffect(() => {
      if(Rfilter !== ''){
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
  