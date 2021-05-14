import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Pokemon({data}){
    const [pokemon, setPokemon] = React.useState({
        name: '',
        img: '',
        tipos: [],
        id: '',
        render:'',
    })
    useEffect(async () => {
        if(data.isCreated){
            const response = await fetch(`http://localhost:3001/tipo?id=${data.uuid}`)
            const responsejson = await response.json()
            setPokemon({
                name: data.name,
                img: '',
                tipos: responsejson,
                id: data.uuid,
                render: responsejson.map(tipo => <label>{tipo}</label>)
            })
        }
        else{
            const response = await fetch(data.url)
            const responsejson = await response.json()
            let tmp = []
            responsejson.types.map(obj => tmp.push(obj.type.name))
            setPokemon({
                name: responsejson.name,
                img: responsejson.sprites.front_default,
                id: responsejson.id,
                tipos: tmp,
                render: tmp.map(tipo => <label>{tipo}</label>)
            })
        }
    }, [data]);   
    return(
        <Link to = {`/poke/${pokemon.id}`}>
            <div>
                <h1>{pokemon.name}</h1>
                {pokemon.img !== '' && <img src= {pokemon.img}/>}
                <label>{pokemon.render}</label>
            </div>
        </Link>
    )
}