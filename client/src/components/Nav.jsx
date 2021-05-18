import React from 'react';
import {Link} from 'react-router-dom'
import Logo from '../imgs/logo.png'
import './css/nav.css';

export default function Nav(){
    return(
        <header>
            <img src = {Logo} className = 'logo'></img>
            <nav classname = 'nav'>
                <ul className ='nav_links'>
                    <li><Link to = '/search' className = 'a'> <a className = 'a'>Search</a></Link></li>
                    <li><Link to = '/search/add' className = 'a'><a className = 'a'>Add</a></Link></li>
                </ul>
            </nav>
        </header>
    )
}