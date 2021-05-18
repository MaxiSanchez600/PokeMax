const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

let pokeNulo = {
  name: null,
  vida: '5',
  fuerza: '2',
  defensa: '54',
  velocidad: '54',
  altura: '34',
  peso: '45',
}

let pokeValido = {
  name: 'Pikachu',
  vida: '5',
  fuerza: '2',
  defensa: '54',
  velocidad: '54',
  altura: '34',
  peso: '45',
}

let pokeValido2 = {
  name: 'Charizard',
  vida: '5',
  fuerza: '2',
  defensa: '54',
  velocidad: '54',
  altura: '34',
  peso: '45',
}

let pokeNulo2 = {
  name: 'Snorlax',
  vida: '5',
  fuerza: '2',
  defensa: '54',
  velocidad: 'SoyUnaString',
  altura: '34',
  peso: '45',
}
let pokeValido3 = {
  name: 'Kakut',
  vida: '5',
  fuerza: '2',
  defensa: '54',
  velocidad: '54',
  altura: '34',
  peso: '45',
}
let pokeValido4 = {
  name: 'G1en ga/r',
  vida: '5',
  fuerza: '2',
  defensa: '54',
  velocidad: '54',
  altura: '34',
  peso: '45',
}
describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      xit('Soltar un error si alguna propiedad es nula', (done) => {
        Pokemon.create(pokeNulo)
          .then(() => done(new Error('Requiere un nombre valido')))
          .catch(() => done());
      });
      xit('Deberia funcionar cuando todo es valido', () => {
        Pokemon.create(pokeValido);
      });
      Pokemon.create({ name: 'Bulbasaur' });
      xit('No deberia crear Pokemons con nombres iguales', function(done) {
        Pokemon.create(pokeValido);
        Pokemon.create(pokeValido).then(() => done(new Error('Ya existe un Pokemon con ese nombre')))
        .catch(() => done());
      });
      xit('Deberia poder crear Pokemons con nombres distintos', () => {
        Pokemon.create(pokeValido);
        Pokemon.create(pokeValido2);
      });
      xit('Las estadisticas no deberia poder ser Strings', function(done) {
        Pokemon.create(pokeNulo2).then(() => done(new Error('Las estadisticas tienen que ser numericas')))
        .catch(() => done());
      });
      xit('Se define isCreated automaticamente', function() {
          return Pokemon.create(pokeValido3).then(function(p){
              expect(p.dataValues.isCreated).to.equal(null)
          })
      });
      xit('Deberia borrar los espacios, los caracteres especiales, y los numeros de name', function() {
        return Pokemon.create(pokeValido4).then(function(p){
            expect(p.dataValues.name).to.equal('Gengar')
        })
    });
    });
  });
});

