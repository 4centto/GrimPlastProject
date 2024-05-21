import React from 'react'
import './styles/Error.css'

const Error = ({error, mensaje}) => {
    return (
        <div className="contError" style={ error ? { display: "block" } : { display: "none" } }>
            <p>{mensaje}</p>
        </div>
    )
}

export default Error