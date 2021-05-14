import React, {useEffect} from 'react'
export default function PokemonInfo ({id}){
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
        peso: ''

    })
    useEffect(async () => {
        const response = await fetch(`http://localhost:3001/id?id=${id}`)
        const responsejson = await response.json()
        if(responsejson.isCreated){
            const response = await fetch(`http://localhost:3001/tipo?id=${id}`)
            const responsejson2 = await response.json()
            setPokemon({
                name: responsejson.name,
                img: '',
                tipos: responsejson2,
                id: id,
                render: responsejson2.map(tipo => <label>{tipo}</label>),
                fuerza: responsejson.fuerza,
                defensa: responsejson.defensa,
                velocidad: responsejson.velocidad,
                altura: responsejson.altura,
                peso: responsejson.peso
            })
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
                peso: responsejson.weight
            })
            console.log(pokemon.defensa, pokemon.velocidad)
        } 
    }, []); 
    return(
        <div>
            {pokemon.img !== '' && <img src= {pokemon.img}></img>}
            <h1>{pokemon.name}</h1>
            <label>{pokemon.id}</label>
            <label>{pokemon.render}</label>
            <label>{pokemon.vida}</label>
            <label>{pokemon.fuerza}</label>
            <label>{pokemon.defensa}</label>
            <label>{pokemon.velocidad}</label>
            <label>{pokemon.altura}</label>
            <label>{pokemon.peso}</label>
        </div>
    )
}
