const { Router } = require('express');
const { Pokemon, Tipo, PokemonTipos } =  require('../db.js')
const fetch = require("node-fetch");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
router.post('/pokemons', function(req, res){
    let {name, vida, fuerza, defensa, velocidad, altura, peso, tipos} = req.body;
    console.log(tipos)
    Pokemon.create({
        name: name,
        vida: parseInt(vida),
        fuerza: parseInt(fuerza),
        defensa: parseInt(defensa),
        velocidad: parseInt(velocidad),
        altura: parseInt(altura),
        peso: parseInt(peso),
    }).then(function(pokemon){
        let promises = []
        for(var i = 0; i < tipos.length; i++){
            promises.push(pokemon.addTipo(parseInt(tipos[i])))
        }
        console.log(promises)
        const promise = Promise.all(promises);
        return promise
    }).then(function(pokemon){
        return res.json({message: 'Anadido con exito'});
    }).catch((error) =>{
        console.log(error)
        return res.json({message: 'Error'})
    })
})

router.get('/id/', function(req, res){
  let id = req.query.id;
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(r => r.json())
  .then((pokemon) =>{
      console.log('Encontro en la api')
      return res.json(pokemon)
  })
  .catch(error =>{
      console.log('No encontro en la api, busca en la BD')
      Pokemon.findOne({
          where: {uuid: id},
        }).then(function(pokemon) {
          if(pokemon === null){
              console.log('No encontro en la api, ni en la BD')
              return res.json({message: 'No se encontro el Pokemon'})
          }
          console.log('Encontro en la BD')
          return res.json(pokemon)
        }).catch(error => {
          console.log(error)
          return res.send(error)
        })
  })
})

router.get('/tipo/', function(req,res){
  
      let id = req.query.id;
      PokemonTipos.findAll({
        attributes:['tipoId'],
        where:{
          pokemonUuid: id
        },
      })
      .then(function(pokemons){
        Tipo.findAll({
          attributes:['name'],
          where:{
            id: pokemons.map(obj => obj.dataValues.tipoId)
          },
        })
        .then(function(tipos){
          res.json(tipos.map(tipo => tipo.name))
        })
      })
      .catch(error =>{
        console.log(error)
        return res.send(error)
      })
    
})
router.get('/pokemons/', function(req, res){
    let name = req.query.name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(r => r.json())
    .then((pokemon) =>{
        console.log('Encontro en la api')
        return res.json(pokemon)
    })
    .catch(error =>{
        console.log('No encontro en la api, busca en la BD')
        Pokemon.findOne({
            where: {name: name},
          }).then(function(pokemon) {
              console.log(pokemon)
            if(pokemon === null){
                console.log('No encontro en la api, ni en la BD')
                return res.json({message: 'No se encontro el Pokemon'})
            }
            console.log('Encontro en la BD')
            return res.json(pokemon)
          }).catch(error => {
            console.log(error)
            return res.send(error)
          })
    })
})


router.get('/types', function(req, res){
    Tipo.findAll()
    .then(function(tipos){
      if(tipos.length !== 0){
        console.log(tipos)
        return res.json(tipos)
      }
      else{
        fetch(`https://pokeapi.co/api/v2/type`)
        .then(r => r.json())
        .then((typos) => {
          res.json(typos)})
        .catch(error =>{
          res.send(error)
        })
        }
    })
    .catch(error =>{
      return res.send(error)
    })
  })

router.get('/bdpokemons/', function(req, res){
  let limit = req.query.limit;
  Pokemon.findAll({limit: limit})
  .then(function(pokemons){
    res.json(pokemons)
  })
  .catch(error =>{
    res.send(error)
  })
})

router.get('/tipos/', function(req, res){
  //http://localhost:3001/tipos/?tipo=fuego&limit=30
  let tipo = req.query.tipo
  let limit =  req.query.limit
  PokemonTipos.findAll({
    attributes:['pokemonUuid'],
    where:{
      tipoId: tipo
    },
    limit: limit
  })
  .then(function(pokemons){
    let tmp = pokemons.map(poke => poke.pokemonUuid)
    Pokemon.findAll({
      where:{
        uuid: tmp
      }
    })
    .then(function(pokemonsFinal){
      res.json(pokemonsFinal)
    })
  })
  .catch(error =>{
    return res.send(error)
  })

})
// Configurar los routerss
// Ejemplo: router.use('/auth', authRouter);
module.exports = router;
