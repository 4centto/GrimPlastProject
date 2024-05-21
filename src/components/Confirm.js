import React from 'react'
import './styles/Confirm.css'

const Confirm = ({ confirm, setConfirm, funcion }) => {
    return (
        <div className="contConfirm" style={ confirm ? { visibility: "visible" } : { visibility: "hidden" } }>
            <div className="confirm">
                <p>¿Estas seguro que quieres enviar tu lista?</p>
                <div className="confirmBotones">
                    <button
                        onClick={funcion}
                    >SI</button>
                    <button
                        onClick={ () => {
                            setConfirm(!confirm)
                        } }
                    >NO</button>
                </div>
            </div>
        </div>
    )
}

export default Confirm