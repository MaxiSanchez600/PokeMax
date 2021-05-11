import React, {useEffect} from 'react'
import { connect } from "react-redux";
import {getPokemons} from "../actions/actions"

export function Contenedor({pokemonsInicio, pokemonsShow, name}){
    const [amountInicio, setAmountInicio] = React.useState({
        primera: 0,
        ultima: 12
    })
    //Busco y no encontro nada
    if(pokemonsShow[0] === 'No se encontro nada'){
        return(
            <div>
                 <h1>No se encontro nada</h1>
            </div>
        ) 
    } else if(pokemonsShow[0] !== 'No se encontro nada' && pokemonsShow.length > 0){
    //Encontro algo
    //Hook de lo encontrado
        return(
            <div>
                 <h1>Rendereo las primeras 12</h1>
                 <label>Siguiente</label>
                 <label>Anterior</label>
            </div>

        ) 
    }
    //Rendereo el inicio
    //Hook del inicio
    return(
        <div>
            <h1>Rendereo el inicio</h1>
            <label>Siguiente</label>
            <label>Anterior</label>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
      show: state.Show,
      concate: state.Concatenadas
    }
  }
  
export default connect(
    mapStateToProps,
    {getPokemons}
  )(Contenedor);
  