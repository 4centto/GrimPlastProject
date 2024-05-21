import React, { useEffect, useState } from 'react'
//Extras
import Axios from 'axios'
import url from '../config/config'
import './styles/Formulario.css'

const Formulario = ({ handleSubmit, handleAgregar, handleQuitar, cantidad, setCantidad, setProducto, setPrecio, setPzs, setLoading,
                        setFatal, history }) => {

    const [ productos, setProductos ] = useState([]) //Mostrar los productos en el select

    useEffect(() => {

        const func = async () => {

            try{

                const res = await (await Axios.get(url + "get/productos")).data
                setProductos(res)

                setProducto(res[0].nombre_producto)
                setPrecio(res[0].precioindividual_producto * res[0].cantidadporbolsa_producto)
                setPzs(res[0].cantidadporbolsa_producto)

            } catch(err){
                console.log(err)
                setFatal(true)
                setTimeout(() => {
                    setFatal(false)
                    history.replace("/")
                }, 1000)
            }

        }

        func()

    }, [])

    return (
        <div className="contFormulario">
            <form onSubmit={handleSubmit} autoComplete="off" className="formulario">
                <div className="inputs">
                    <select name="producto" onChange={ e => {
                        setProducto(e.target.value)
                        for(let i = 0; i < productos.length; i++){
                            if(productos[i].nombre_producto == e.target.value){
                                setPrecio(productos[i].precioindividual_producto * productos[i].cantidadporbolsa_producto)
                                setPzs(productos[i].cantidadporbolsa_producto)
                            }
                        }
                    }} >
                        {
                            productos.map(value => {
                                return (
                                    <option value={value.nombre_producto}>{value.nombre_producto}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="inputs">
                    <input type="number" autoFocus value={cantidad} onChange={ e => { setCantidad(e.target.value) } } />
                </div>
                <div className="inputs">
                    <input type="submit" value="Agregar" onClick={handleAgregar} />
                </div>
                <div className="inputs">
                    <input type="submit" value="Quitar" onClick={handleQuitar} />
                </div>
            </form>
            <div className="contLista">
                <h2 className="listprec">LISTA DE PRECIOS</h2>

                <div className="lista">

                    <table>
                        <tr>
                            <td>PRODUCTO</td>
                            <td>PRECIO x BOLSA</td>
                        </tr>
                        {
                            productos.map(value => {
                                return (
                                    <tr key={value.nombre_producto}>
                                        <td>{value.nombre_producto} ({value.cantidadporbolsa_producto} pzs.)</td>
                                        <td>{(value.precioindividual_producto * value.cantidadporbolsa_producto)}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>

                </div>

            </div>
        </div>
    )

}

export default Formulario