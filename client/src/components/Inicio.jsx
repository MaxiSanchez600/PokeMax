import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Back from '../imgs/41.jpg'
import Lottie from 'react-lottie';
import animationData from '../imgs/data.json'
import {checkBD} from "../actions/actions"
import animationData2 from '../imgs/data2.json'
import './css/inicio.css'
import { connect } from "react-redux";

export function Inicio(props){
  
    const [estado, setEstado] = React.useState(false)     
    const estadoSet = function () {
        setEstado(true)
    }
    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
      const defaultOptions2 = {
        loop: false,
        autoplay: true, 
        animationData: animationData2,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
      setTimeout(estadoSet, 4000)
    return(
        <div className = 'divLottie'>
            <Lottie options = {defaultOptions} height={600} width={800}></Lottie>
            <div className = 'ingresar'>
                <Link to = 'search/'>
                    {estado && <Lottie options = {defaultOptions2} height={60} width={100}></Lottie>}
                </Link>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
  return{
  }
}

export default connect(
  mapStateToProps,
  {checkBD}
)(Inicio);
