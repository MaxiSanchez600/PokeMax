import './App.css';
import {HashRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Search from './components/Search.jsx';
import Add from './components/Add.jsx';
import PokemonInfo from './components/PokemonInfo.jsx';
import { Provider } from "react-redux";
import store from "./store/index";
import Inicio from './components/Inicio.jsx'
import Back from './imgs/41.jpg'
fetch('http://localhost:3001/')
        .then(res => {
          store.dispatch({type: 'CHECK_BD', payload:true})
        })
        .catch(error =>{
          store.dispatch({type: 'CHECK_BD', payload: false})
        
})
function App() {
  return (
    <div id = 'AppP' className="App" style = {{backgroundImage: `url(${Back})`, backgroundSize: '100% 100%', minWidth: '100%', minHeight: '100%', position: 'fixed', top: 0, left: 0}}>
      <Provider store = {store}>
          <Router>
            <Route
              exact path = '/'
              render = {() => <Inicio></Inicio>}
            />
            <Route
              path = '/search'
              render = {() => <Nav></Nav>}
            />
            <Route
              exact path = '/search'
              render = {() => <Search/>}
            />
            <Route
              path = '/search/add'
              render = {() => <Add/>}
            />
            <Route
              path = '/search/poke/:id' render = {({match}) => <PokemonInfo id = {match.params.id}></PokemonInfo>}
            />
          </Router>
      </Provider>
    </div>
  );
}

export default App;
