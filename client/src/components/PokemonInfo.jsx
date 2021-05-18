import React, {useEffect} from 'react'
import './css/pokeinfo.css'
import { Link } from 'react-router-dom';
import Atras from '../imgs/atras.png'
import Gif from '../imgs/Carga2.gif'
import { connect } from "react-redux";
import { checkBD } from '../actions/actions';


export function PokemonInfo ({bdlocal, id, color, es}){
    const [pokemon, setPokemon] = React.useState({
        name: '',
        id: '',
        img: '',
        tipos: '',
        render: '', 
        vida: '',
        fuerza: '',
        defensa: '',
        velocidad: '',
        altura: '',
        peso: '',
        color: ''
    })
    const [clases, setClases] = React.useState({
        vida: 233,
        fuerza: 120,
        defensa: 614,
        velocidad: 200,
        altura: 200,
        peso: 9500
    })
    const[encontrado, setEncontrado] = React.useState({
        encontrado: ''
    })
    const [estado, setEstado] = React.useState(false)
    const Color = function(arr){
        if(!arr.length > 0){
            return '#EF4036'
        }
        else{
            switch (arr[0]){
                case 'normal':
                    return '#A8A878'
                case 'fighting':
                    return '#C03028'
                case 'flying':
                    return '#A890F0'
                case 'poison':
                    return '#A040A0'
                case 'rock':
                    return '#B8A038'
                case 'bug':
                    return '#A8B820'
                case 'ground':
                    return '#E0C068'
                case 'ghost':
                    return '#705898'
                case 'steel':
                    return '#B8B8D0'
                case 'fire':
                    return '#FB6C6C'
                case 'water':
                    return '#609FB5'
                case 'grass':
                    return '#48D0B0'
                case 'electric':
                    return '#F8D030'
                case 'psychic':
                    return '#F85888'
                case 'ice':
                    return '#98D8D8'
                case 'dragon':
                    return '#7038F8'
                case 'dark':
                    return '#705848'
                case 'fairy':
                    return '#DFB4DD'
                case 'shadow':
                    return '#2D2D2D'
        }
    }
}
    useEffect(() =>{
        if(es !== undefined){ //Chequeo si esta renderizando el componente desde Add.jsx
            setPokemon({
                name: es.name,
                img: '',
                id:'',
                tipos: es.tipos3,
                render: es.tipos3.map(tipo => <label>{tipo}</label>),
                vida: ((es.vida === '') ? 0 : es.vida),
                fuerza: ((es.fuerza === '') ? 0 : es.fuerza),
                defensa: ((es.defensa === '') ? 0 : es.defensa),
                velocidad: ((es.velocidad === '') ? 0 : es.velocidad),
                altura: ((es.altura === '') ? 0 : es.altura),
                peso: ((es.peso === '') ? 0 : es.peso),
                color: Color(es.tipos3)
                })
            setEstado(true)
        }
    }, [es])
    useEffect(async () => {
        if(checkBD){ //Chequeo si funciona nuestra BD Local
            if(es === undefined){ //Chequeo si no esta renderizando el componente desde Add.jsx
                const response = await fetch(`http://localhost:3001/id?id=${id}`)
                const responsejson = await response.json()
                if(responsejson.message){
                    setEncontrado(false)
                    setEstado(true)
                }
                else{
                    if(responsejson.isCreated){
                        const response = await fetch(`http://localhost:3001/tipo?id=${id}`)
                        const responsejson2 = await response.json()
                        console.log(responsejson2)
                        setPokemon({
                            vida: responsejson.vida,
                            name: responsejson.name,
                            img: '',
                            tipos: responsejson2,
                            id: id,
                            render: responsejson2.map(tipo => <label>{tipo}</label>),
                            fuerza: responsejson.fuerza,
                            defensa: responsejson.defensa,
                            velocidad: responsejson.velocidad,
                            altura: responsejson.altura,
                            peso: responsejson.peso,
                            color: Color(responsejson2)
                        })
                        setEncontrado(true)
                        setEstado(true)
                    }
                    else{
                        let tmp = []
                        responsejson.types.map(obj => tmp.push(obj.type.name))
                        setPokemon({
                            name: responsejson.name,
                            img: responsejson.sprites.front_default,
                            id: responsejson.id,
                            tipos: tmp,
                            render: tmp.map(tipo => <label>{tipo}</label>),
                            vida: responsejson.stats.filter(elem => elem.stat.name === 'hp')[0].base_stat,
                            fuerza: responsejson.stats.filter(elem => elem.stat.name === 'attack')[0].base_stat,
                            defensa: responsejson.stats.filter(elem => elem.stat.name === 'defense')[0].base_stat,
                            velocidad: responsejson.stats.filter(elem => elem.stat.name === 'speed')[0].base_stat,
                            altura: responsejson.height,
                            peso: responsejson.weight,
                            color: Color(tmp)
                        })
                        setEncontrado(true)
                        setEstado(true)
                    }
                }
            }
        }
        else{
            setEncontrado(false)
            setEstado(true) 
        }
    }, []); 
    return(
        <div className ='maininfo'>
        {!bdlocal && <h1 className = 'Error'>Fallo la conexion con el servidor local</h1>}
        {(!encontrado && checkBD) && <h1 className = 'Error'>Estas tratando de acceder a un <span>Pokemon inexistente</span></h1>}
        {(estado && encontrado) && <div className = 'infodiv2' style = {{backgroundColor: pokemon.color, boxShadow: `0 0 8px ${pokemon.color}`}}>
                    <div className = 'InfoArriba'>
                        <p className = 'idpoke'>{pokemon.id}</p>
                        <p className = 'namepoke'>{pokemon.name}</p>
                        <div>
                                {pokemon.render}
                        </div>
                        {pokemon.img && <img className = 'pokeimg' src = {pokemon.img}></img>}
                    </div>
                    <div className = 'infodiv3'>
                        <div className = 'BarrasStats'>
                            <div className = 'StatsNames'>
                                <label>HP</label>
                                <label>Fuerza</label>
                                <label>Defensa</label>
                                <label>Velocidad</label>
                                <label>Altura</label>
                                <label>Peso</label>
                            </div>
                            <div className = 'Barras'>
                                <div className = 'BarraLabel'>
                                    <p>{pokemon.vida}</p>
                                    <div className = 'ProgressBar'>
                                         <div style ={{width: ((pokemon.vida * 100) / clases.vida + '%'), backgroundColor: pokemon.color}} className = 'ProgressBar2'></div>
                                    </div>
                                </div>
                                <div className = 'BarraLabel'>
                                    <p>{pokemon.fuerza}</p>
                                    <div className = 'ProgressBar'>
                                        <div style ={{width: ((pokemon.fuerza * 100) / clases.fuerza + '%'), backgroundColor: pokemon.color}} className = 'ProgressBar2'></div>
                                    </div>
                                </div>
                                <div className = 'BarraLabel'>
                                    <p>{pokemon.defensa}</p>
                                    <div className = 'ProgressBar'>
                                        <div style ={{width: ((pokemon.defensa * 100) / clases.defensa + '%'), backgroundColor: pokemon.color}} className = 'ProgressBar2'></div>
                                    </div>
                                </div>
                                <div className = 'BarraLabel'>
                                    <p>{pokemon.velocidad}</p>
                                    <div className = 'ProgressBar'>
                                        <div style ={{width: ((pokemon.velocidad * 100) / clases.velocidad + '%'), backgroundColor: pokemon.color}} className = 'ProgressBar2'></div>
                                    </div>
                                </div>
                                <div className = 'BarraLabel'>
                                    <p>{pokemon.altura}</p>
                                    <div className = 'ProgressBar'>
                                        <div style ={{width: ((pokemon.altura * 100) / clases.altura + '%'), backgroundColor: pokemon.color}} className = 'ProgressBar2'></div>
                                    </div>
                                </div>
                                <div className = 'BarraLabel'>
                                    <p>{pokemon.peso}</p>
                                    <div className = 'ProgressBar'>
                                        <div style ={{width: ((pokemon.peso * 100) / clases.peso + '%'), backgroundColor: pokemon.color}}  className = 'ProgressBar2'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>}
            {!estado && <img className = 'GifLoading' src = {Gif}></img>}
        </div>
        
    )
}


const mapStateToProps = (state) => {
    return{
      bdlocal: state.bdlocal
    }
  }
  
export default connect(
    mapStateToProps,
  )(PokemonInfo);
  