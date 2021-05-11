import React from 'react';
import {Link} from 'react-router-dom'

export default function Nav(){
    return(
        <nav>
            <Link to = '/search'>
                <span>Search</span>
            </Link>
            <Link to = '/add'>
                <span>Add</span>
            </Link>
        </nav>
    )
}