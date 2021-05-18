import { render, screen } from '@testing-library/react';
import PokemonInfo from './components/PokemonInfo.jsx'
import { act } from "react-dom/test-utils";
import { configure, mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from "./store/index";
import App from './App.js'
import { MemoryRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('El componente PokemonInfo debe renderizar en todas las rutas que contengan /search/poke/id', () => {
    it('No debe renderizar en la ruta /', () =>{
        const wrapper = mount(
            <Provider store = {store}>
                <MemoryRouter initialEntries={[ '/' ]}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find(PokemonInfo)).toHaveLength(0);
    })
})