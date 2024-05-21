import React from 'react'
import './styles/Lista.css'

const Lista = ({datos, handleEnviar, total, comentarios, setComentarios}) => {

    return (
        <div className="contListaProductos">
            <h2>TU LISTA</h2>
            <div className="tablaProductos">
                <table>
                    <tr>
                        <td>Producto</td>
                        <td>Cantidad</td>
                    </tr>
                    {
                        datos.map( val => {
                            return (
                                <tr>
                                    <td>{val.producto}</td>
                                    <td>{val.cantidad}</td>
                                </tr>
                            )
                        } )
                    }
                </table>
            </div>

            <div className="contTotal">
                <p>TOTAL: $ {total}</p>
            </div>

            <div className="contComentarios">
                <p>Añadir comentarios: </p>
                <input type="text" value={comentarios} onChange={ e => { setComentarios(e.target.value) }} maxLength="200" />
            </div>

            <div className="contEnviar">
                <button onClick={handleEnviar}>ENVIAR LISTA</button>
            </div>

        </div>
    )
}

export default Lista