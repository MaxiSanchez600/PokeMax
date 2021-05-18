
export function Filter(payload){
    return async function(dispatch){
        if(payload.tipo === 'tipo1D'){
            let Filter = payload.datos.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1)
            dispatch({type: 'GET_FILTER', payload: {filter:Filter ,nofilter:payload.datos}})
        }
        if(payload.tipo === 'tipo2D'){
            let Filter = payload.datos.sort((a, b) => ((a.fuerza < b.fuerza)) ? 1 : -1)
            dispatch({type: 'GET_FILTER', payload: {filter:Filter ,nofilter:payload.datos}})
        }
        if(payload.tipo === 'tipo1A'){
            let Filter = payload.datos.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            dispatch({type: 'GET_FILTER', payload: {filter:Filter ,nofilter:payload.datos}})
        }
        if(payload.tipo === 'tipo2A'){
            let Filter = await payload.datos.sort((a, b) => ((a.fuerza > b.fuerza)) ? 1 : -1)
            dispatch({type: 'GET_FILTER', payload: {filter: Filter ,nofilter:payload.datos}})
        }
    }
}
export function getPokemons(payload){
    let api;
    let bd;
    let concatenada;
    return async function(dispatch){
        await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${payload}`)
            .then(r => r.json())
            .then((pokemons) => {
                api = pokemons.results;
                api.forEach(async element =>  {
                     await fetch(element.url)
                      .then(r => r.json())
                      .then((res) => {
                        element.fuerza = res.stats.filter(elem => elem.stat.name === 'attack')[0].base_stat
                      })
                })
            
        })
        .then(fetch(`http://localhost:3001/bdpokemons?limit=${payload}`)
                .then(r => r.json())
                .then((r) =>{
                    concatenada = api.concat(r)
                    dispatch({type: 'GET_API_BD_CONCATENAR', payload: concatenada})
        }))
    }
}

export function Vaciar(){
    return async function(dispatch){
        dispatch({type: 'VACIAR', payload: {}})
    }
}
export function getPokemonByTipo(payload, cb){
    let api;
    let concatenada;
    let counter = 0;
    return async function(dispatch){
        dispatch({type: 'VACIAR', payload: {}})
        await fetch(`https://pokeapi.co/api/v2/type/${payload.tipo}`)
        .then(r => r.json())
        .then((r) => {
            api = r.pokemon.map(poke => poke.pokemon)
            api.forEach(async element =>  {
                await fetch(element.url)
                .then(r => r.json())
                .then((res) => {
                    element.fuerza = res.weight
                    counter++;
                    if(counter === api.filter(poke => poke.isCreated === undefined).length){
                        (fetch(`http://localhost:3001/tipos?tipo=${payload.tipo}&limit=${payload.limit}`)
                        .then(r => r.json())
                        .then((r) => {
                            concatenada = api.concat(r)
                            if(cb){
                                dispatch({type: 'GET_API_BD_CONCATENAR_SHOW', payload: {show: r, viejo: concatenada}})
                            } else{
                                dispatch({type: 'GET_API_BD_CONCATENAR_SHOW', payload :{show: concatenada, viejo: []}})
                            }
                        }))
                    }
                })
          })
        })
    }
}
export function getPokemonPropios(payload){
    if(payload){
        let ret = {nuevo: payload.filter(obj => obj.isCreated === true), viejo: payload}
        if(ret.nuevo.length === 0){
            ret.nuevo = []
        }
        return async function(dispatch){
            await fetch(`http://localhost:3001/bdpokemons?limit=30`)
            .then(r => r.json())
            .then((r) => {
                dispatch({type: 'UPDATE_BD_SHOW', payload: ret})
            })
        }
    } else{
        return async function(dispatch){
            await fetch(`http://localhost:3001/bdpokemons?limit=30`)
            .then(r => r.json())
            .then((r) => {
                dispatch({type: 'GET_BD_SHOW', payload: r})
            })
        }
    }
}
export function Invert(payload){
    return function(dispatch){
        dispatch({type: 'SWITCH_BD', payload: payload})
    }
}
export function getPokemonByName(payload, cb){
    return async function(dispatch){
        dispatch({type: 'VACIAR', payload: {}})
        const response = await fetch(`http://localhost:3001/pokemons?name=${payload}`)
        const responsejson = await response.json()
        if(responsejson.message){
            dispatch({type: 'GET_POKE_BY_NAME', payload: {show: [] ,anterior:[]}})
        }
        else{
            if(responsejson.isCreated){
                if(cb){
                    dispatch({type: 'GET_POKE_BY_NAME', payload: {show:[responsejson] ,anterior:[responsejson]}})
                } else{
                    dispatch({type: 'GET_POKE_BY_NAME', payload:  {show:[responsejson] ,anterior:[]}})
                }
            }
            else{
                const response = {
                    name: payload,
                    url: 'https://pokeapi.co/api/v2/pokemon/' + responsejson.id + '/'
                }
                if(cb){
                    dispatch({type: 'GET_POKE_BY_NAME', payload: {show:[], anterior:[response]}})
                } else{
                     dispatch({type: 'GET_POKE_BY_NAME', payload: {show:[response] ,anterior:[]}})
                }
            }
        }
          
    }
}
export function checkBD(payload){
    return function(dispatch){
        dispatch({type: 'CHECK_BD', payload: {payload}})
    }
}