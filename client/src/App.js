import './App.css';
import {HashRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Search from './components/Search.jsx';
import Add from './components/Add.jsx';
import PokemonInfo from './components/PokemonInfo.jsx';
import { Provider } from "react-redux";
import store from "./store/index";
function App() {
  return (
    <div className="App">
      <Provider store = {store}>
          <Router>
          <Nav></Nav>
            <Route
              path = '/search'
              render = {() => <Search/>}
            />
            <Route
              path = '/add'
              render = {() => <Add/>}
            />
            <Route
              path = '/poke/:id' render = {({match}) => <PokemonInfo id = {match.params.id}></PokemonInfo>}
            />
          </Router>
      </Provider>
    </div>
  );
}

export default App;
