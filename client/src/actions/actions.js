export function getPokemons(payload){
    let api;
    let bd;
    let concatenada;
    return async function(dispatch){
        await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${payload}`)
            .then(r => r.json())
            .then((pokemons) => {
                api = pokemons.results;
        })
        .then(fetch(`http://localhost:3001/bdpokemons?limit=${payload}`)
                .then(r => r.json())
                .then((r) =>{
                    concatenada = api.concat(r)
                    dispatch({type: 'GET_API_BD_CONCATENAR', payload: concatenada})
        }))
    }
}
export function getPokemonByTipo(payload){
    let api;
    let concatenada;
    return async function(dispatch){
        await fetch(`https://pokeapi.co/api/v2/type/${payload.tipo}`)
        .then(r => r.json())
        .then((r) => {
            api = r.pokemon.map(poke => poke.pokemon)
        })
        .then(fetch(`http://localhost:3001/tipos?tipo=${payload.tipo}&limit=${payload.limit}`)
        .then(r => r.json())
        .then((r) => {
            concatenada = api.concat(r)
            dispatch({type: 'GET_API_BD_CONCATENAR_SHOW', payload: concatenada})
        }))
    }
}
export function getPokemonByName(payload){
    return async function(dispatch){
        const response = await fetch(`http://localhost:3001/pokemons?name=${payload}`)
        const responsejson = await response.json()
        if(responsejson.message){
            dispatch({type: 'GET_POKE_BY_NAME', payload: ['No se encontro nada']})
        }
        else{
            if(responsejson.isCreated){
                dispatch({type: 'GET_POKE_BY_NAME', payload: [responsejson]})
            }
            else{
                const response = {
                    name: payload,
                    url: 'https://pokeapi.co/api/v2/pokemon/' + responsejson.id + '/'
                }
                dispatch({type: 'GET_POKE_BY_NAME', payload: [response]})
            }
        }
          
    }
}
export function ordernarPor(payload){
    //Si existe show => Ordeno show y dispacho show
    //Si no existe show => Ordeno inicio y dispacho inicio
    //Si no se encontro nada => No ordeno nada
}

