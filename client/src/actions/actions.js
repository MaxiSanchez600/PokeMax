export function Filter(payload){
    console.log(payload)
    return async function(dispatch){
        if(payload.tipo === 'tipo1D'){
            //console.log('Filtro por orden abecedario descendente')
            let Filter = payload.datos.sort((a, b) => (a.name < b.name) ? 1 : -1)
            dispatch({type: 'GET_FILTER', payload: {filter:Filter ,nofilter:payload.datos}})
        }
        if(payload.tipo === 'tipo2D'){
            //console.log('Filtro por orden de fuerza descendente')
            let Filter = payload.datos.sort((a, b) => ((a.fuerza < b.fuerza)) ? 1 : -1)
            dispatch({type: 'GET_FILTER', payload: {filter:Filter ,nofilter:payload.datos}})
        }
        if(payload.tipo === 'tipo1A'){
            //console.log('Filtro por orden abecedario ascendente')
            let Filter = payload.datos.sort((a, b) => (a.name > b.name) ? 1 : -1)
            dispatch({type: 'GET_FILTER', payload: {filter:Filter ,nofilter:payload.datos}})
        }
        if(payload.tipo === 'tipo2A'){
            //console.log('Filtro por orden de fuerza ascendente')
            let Filter = payload.datos.sort((a, b) => ((a.fuerza > b.fuerza)) ? 1 : -1)
            dispatch({type: 'GET_FILTER', payload: {filter:Filter ,nofilter:payload.datos}})
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
                api.forEach(element =>  {
                      fetch(element.url)
                      .then(r => r.json())
                      .then((res) => {
                          element.fuerza = res.weight
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
export function getPokemonByTipo(payload, cb){
    let api;
    let concatenada;
    return async function(dispatch){
        await fetch(`https://pokeapi.co/api/v2/type/${payload.tipo}`)
        .then(r => r.json())
        .then((r) => {
            api = r.pokemon.map(poke => poke.pokemon)
            api.forEach(element =>  {
                fetch(element.url)
                .then(r => r.json())
                .then((res) => {
                    element.fuerza = res.weight
                })
          })
        })
        .then(fetch(`http://localhost:3001/tipos?tipo=${payload.tipo}&limit=${payload.limit}`)
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
