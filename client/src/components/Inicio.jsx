import React from 'react'
import {Link} from 'react-router-dom'

export default function(){
    return(
        <div>
            <h1>Bienvenido a PokeMax</h1>
            <Link to = '/search'>
                <button>Go!</button>
            </Link>
        </div>
    )
}