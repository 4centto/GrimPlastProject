import React from 'react'
//Componentes
import Formulario from './Formulario'
import Lista from './Lista'
//Estilos
import './styles/Content.css'

const Content = ({ handleEnviar, setLoading, setFatal, history, setError, setErrorMSG, lista, setLista, comentarios, setComentarios,
                    total, setTotal, cantidad, setCantidad, producto, setProducto, precio, setPrecio, pzs, setPzs }) => {

    const timerError = () => {
        setTimeout(() => {
            setError(false)
        }, 1000)
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleAgregar = () => {
        if(producto){

            if(cantidad){ //Validar que no este vacio

                if(parseInt(cantidad) > 0){ //Validar que no sea 0
    
                    var contador = 0
                    
                    const item = {
                        producto,
                        cantidad,
                        precio,
                        pzs
                    }
    
                    
                    for(let i = 0; i < lista.length; i++){
                        if(lista[i].producto == item.producto){
                            contador = contador + 1
                        }
                    }
    
                    if(contador == 0){
                        lista.push(item)
                        setCantidad("0")
                        setTotal(total + (item.precio * item.cantidad))
                    } else {
                        setErrorMSG("El Producto ya esta en la lista.")
                        setError(true)
                        timerError()
                    }
    
                } else {
                    setErrorMSG("Debe haber al menos 1 de cantidad.")
                    setError(true)
                    timerError()
                }
    
            } else {
                setErrorMSG("Debe haber al menos 1 de cantidad.")
                setError(true)
                timerError()
            }

        } else {
            setErrorMSG("Debes seleccionar un producto.")
            setError(true)
            timerError()
        }
    }

    const handleQuitar = () => {
        if(lista.length !== 0){

            const long = lista.length
            const valor = lista[long - 1]
            const resta = valor.cantidad * valor.precio
            const nueva = lista.slice(0, long - 1)
            
            setLista(nueva)
            setTotal(total - resta)

        } else {
            setErrorMSG("La lista esta vacia.")
            setError(true)
            timerError()
        }
    }

    return (
        <div className="contContent">
            <div className="content">

                <h2> REALIZA TU PEDIDO </h2>

                <div className="contenedor">

                    <Formulario
                        handleSubmit={handleSubmit}
                        handleAgregar={handleAgregar}
                        handleQuitar={handleQuitar}
                        cantidad={cantidad}
                        setCantidad={setCantidad}
                        setProducto={setProducto}
                        setPrecio={setPrecio}
                        setPzs={setPzs}
                        setLoading={setLoading}
                        setFatal={setFatal}
                        history={history}
                    />

                    <Lista
                        datos={lista}
                        handleEnviar={handleEnviar}
                        total={total}
                        setTotal={setTotal}
                        comentarios ={comentarios}
                        setComentarios={setComentarios}
                    />

                </div>

            </div>
        </div>
    )
}

export default Content