import React from 'react'
import './styles/Fatal.css'
import IMG from '../images/fatalerror.png'

const Fatal = () => {
    return (
        <div className="contFatal">
            <img src={IMG} width="200" />
            <h2>OCURRIO UN ERROR DE CONEXION</h2>
        </div>
    )
}

export default Fatal