import React, {useEffect } from 'react'
import $ from 'jquery';
export default function Add(){
    const [input, setInput] = React.useState({
        name: '',
        vida: '',
        fuerza: '',
        defensa: '',
        velocidad: '',
        altura: '',
        peso: '',
        tipos: []
    });
    const [estado, setEstado] = React.useState('')
    const [tipo, setTipo] = React.useState('')
    const handleInputChange = function Handle(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleInputChange2 = function Handle(e){
        setTipo(e.target.value)
    }
    const onSend = async function(){
        const options = {
            method: 'POST',
            body: JSON.stringify(input),
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        }
        const response = await fetch('http://localhost:3001/pokemons', options)
        const responejson = await response.json()
        setEstado(responejson.message)
    }
    const onTipo = function(){
        input.tipos.push(tipo)
    }
    useEffect(()=>{
        setEstado(estado)
    })
    return(
        <div>
            <h1>Add</h1>
                <form>
                    <input name = 'name' type = 'text' placeholder = 'name' onChange={handleInputChange} value={input.name}/>
                    <input name = 'vida' type = 'text' placeholder = 'vida' onChange={handleInputChange} value={input.vida}/>
                    <input name = 'fuerza' type = 'text' placeholder = 'fuerza' onChange={handleInputChange} value={input.fuerza}/>
                    <input name = 'defensa' type = 'text' placeholder = 'defensa' onChange={handleInputChange} value={input.defensa}/>
                    <input name = 'velocidad' type = 'text' placeholder = 'velocidad' onChange={handleInputChange} value={input.velocidad}/>
                    <input name = 'altura' type = 'text' placeholder = 'altura' onChange={handleInputChange} value={input.altura}/>
                    <input name = 'peso' type = 'text' placeholder = 'peso' onChange={handleInputChange} value={input.peso}/>
                    <label>Tipos:</label>
                    <select name = 'tipo1' form="carform" onChange={handleInputChange2} value = {tipo}>
                        <option value="" selected disabled hidden>Choose here</option>
                        <option value="10">Fuego</option>
                        <option value="11">Agua</option>
                    </select>
                    <button onClick = {onSend}>Anadir</button>
                </form>
                <button onClick = {onTipo}>AnadirTipo</button>
            <label>{estado}</label>
        </div>
    )

}