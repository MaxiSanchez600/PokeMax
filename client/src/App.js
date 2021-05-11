import './App.css';
import {HashRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Search from './components/Search.jsx';
import Add from './components/Add.jsx';
import { Provider } from "react-redux";
import store from "./store/index";
function App() {
  return (
    <div className="App">
      <Provider store = {store}>
          <Router>
            <Route
              path = '/'
              render = {() => <Nav/>}
            />
            <Route
              path = '/search'
              render = {() => <Search/>}
            />
            <Route
              path = '/add'
              render = {() => <Add/>}
            />
          </Router>
      </Provider>
    </div>
  );
}

export default App;
