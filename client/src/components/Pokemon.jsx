import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import './css/Poke.css'
import Back from '../imgs/42.jpg'
export default function Pokemon({data}){
    const [pokemon, setPokemon] = React.useState({
        name: '',
        img: '',
        tipos: [],
        id: '',
        render:'',
        color: ''
    })
    const Color = function(arr){
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
    const FilterBack = function(){
        document.getElementById('AppP').style.backgroundImage = `url(${Back})`
    }
    useEffect(async () => {
        if(data.isCreated){
            const response = await fetch(`http://localhost:3001/tipo?id=${data.uuid}`)
            const responsejson = await response.json()
            document.documentElement.style.setProperty('--color-div',Color(responsejson))
            setPokemon({
                name: data.name,
                img: '',
                tipos: responsejson,
                id: data.uuid,
                render: responsejson.map(tipo => <label>{tipo}</label>),
                color: Color(responsejson)
            })
        }
        else{
            const response = await fetch(data.url)
            const responsejson = await response.json()
            let tmp = []
            responsejson.types.map(obj => tmp.push(obj.type.name))
            document.documentElement.style.setProperty('--color-div',Color(tmp))
            setPokemon({
                name: responsejson.name,
                img: responsejson.sprites.front_default,
                id: responsejson.id,
                tipos: tmp,
                render: tmp.map(tipo => <label>{tipo}</label>),
                color: Color(tmp)
            })
        }
    }, [data]);   
    return(
        <Link to = {`/search/poke/${pokemon.id}`} className = 'link' onClick = {FilterBack}>
            <div className = 'divPoke' style = {{backgroundColor: pokemon.color, boxShadow: `0 0 8px ${pokemon.color}`}}>
                <div className = 'subPoke'>
                    <h1>{pokemon.name}</h1>
                    <div className = 'DivLabels'>{pokemon.render}</div>
                </div>
                {pokemon.img !== '' && <img src= {pokemon.img}/>}
            </div>
        </Link>
    )
}