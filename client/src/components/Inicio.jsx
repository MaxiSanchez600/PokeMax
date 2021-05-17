import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Back from '../imgs/41.jpg'
export default function(){
    useEffect(async () => {
       // document.body.style.background = "url(../imgs/41.jpg)"
       // document.body.style.backgroundImage = `
         //   url(${Back})`
        //document.body.style.backgroundSize = 'cover'
    }, []); 
    return(
        <div>
            <h1>Bienvenido a PokeMax</h1>
            <Link to = '/search'>
                <button>Go!</button>
            </Link>
        </div>
    )
}