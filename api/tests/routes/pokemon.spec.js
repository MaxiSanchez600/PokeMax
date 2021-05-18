/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
let pokemon = {
  name: 'Pikachu',
  vida: '5',
  fuerza: '2',
  defensa: '54',
  velocidad: '54',
  altura: '34',
  peso: '45',
}
describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('GET /id', () => {
      xit('ID no puede estar vacio, devuelve un error', () =>
        agent.get('/id/?id=').expect(400)
      );
  });
  describe('GET /id', () => {
    xit('Devuelve un mensaje de error si el ID no existe', () =>
      agent.get('/id/?id=56446544').expect({message: 'Estas tratando de acceder a un Pokemon inexistente'})
    );
  });
  describe('GET /id', () => {
    xit('Devuelve el pokemon que corresponde a ese ID en mi API', () =>
      agent.get('/id/?id=56').then(function(p){
        expect(Object.keys(p.text).length).to.greaterThanOrEqual(15)
      })
    );
  });
  describe('GET /id', () => {
    xit('Devuelve el pokemon que corresponde a ese ID en mi BD LOCAL', () =>
      agent.get('/id/?id=570cfbe0-b7e3-11eb-a67b-55eb21ba550e').then(function(p){
        //console.log(p.text.id)
        expect(Object.keys(p.text).length).to.greaterThanOrEqual(5)
      })
    );
  });
});
