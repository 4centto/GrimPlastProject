import React, { useEffect, useState } from 'react'
//Componentes
import Header from '../components/Header'
import Content from '../components/Content'
import Loading from '../components/Loading'
import Success from '../components/Success'
import Fatal from '../components/Fatal'
import Error from '../components/Error'
import Footer from '../components/Footer'
import Confirm from '../components/Confirm'
//Estilos
import '../components/styles/Home.css'
//Extras
import Axios from 'axios'
import url from '../config/config'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as Fecha from '../config/Fecha'
import HeadePDF from '../images/headerpdf.jpeg'

const Home = (props) => {

    const [ loading, setLoading ] = useState(false)
    const [ fatal, setFatal ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ correo, setCorreo ] = useState(props.location.state.correo)
    const [ nombre, setNombre ] = useState("")
    const [ error, setError ] = useState(false)
    const [ errorMSG, setErrorMSG ] = useState("")
    const [ confirm, setConfirm ] = useState(false)
    const [ lista, setLista ] = useState([])
    const [ comentarios, setComentarios ] = useState("")
    const [ total, setTotal ] = useState(0)
    const [ cantidad, setCantidad ] = useState("0")
    const [ producto, setProducto ] = useState("")
    const [ precio, setPrecio ] = useState(0)
    const [ pzs, setPzs ] = useState(0)

    const timerError = () => {
        setTimeout(() => {
            setError(false)
        }, 1000)
    }

    useEffect(() => {
        
        const func = async () => {
            setLoading(true)
            try{

                const cAux = props.location.state.correo

                const n = await (await Axios.post(url + "get/cliente/registro/correo", { correo: cAux })).data
    
                if(n.length > 0){
    
                    setNombre(n[0].nombre_cliente)
                    setLoading(false)
    
                } else {
                    setLoading(false)
                    setErrorMSG("El usuario no existe.")
                    setError(true)
                    timerError()
                    props.history.push("/")
                }
    
            } catch(err){
                console.log(err)
                setLoading(false)
                setFatal(true)
                setTimeout(() => {
                    setFatal(false)
                    props.history.replace("/")
                }, 1000)
            }
        }

        func()

    }, [])

    const showConfirmDialog = () => {
        setConfirm(!confirm)
    }

    const createArray = () => {
        var arreglo = []
        for(let i = 0; i < lista.length; i++){
            arreglo.push([ i + 1, lista[i].producto, lista[i].cantidad, lista[i].precio, lista[i].pzs ])
        }
        return arreglo
    }

    const distancia = () => {
        var numero = 50
        for(let i = 0; i < lista.length; i++){
            numero += 10
        }

        return numero
    }

    const createPDF = () => {

        var doc = new jsPDF()
        doc.addImage(HeadePDF, "JPEG", 0, 0, 210, 15)
        doc.text(Fecha.getDay() + "  |  " + Fecha.getHours(), 150, 25)
        doc.text(nombre + "  |  " + correo, 15, 35)
        autoTable(doc, {
            head: [["ID", "Producto", "Cantidad", "Precio", "Pzs/Bolsa"]],
            body: createArray(),
            foot: [["", "", "", "Total: ", total]],
            margin: {
                top: 37
            },
            theme: "grid",
            headStyles: {
                halign: "center",
                fillColor: "#000000",
                minCellHeight: 10,
                valign: "middle"
            },
            bodyStyles: {
                fontStyle: "bold",
                fillColor: "#F4F4F4",
                textColor: "#000000",
                minCellHeight: 10,
                valign: "middle"
            },
            footStyles: {
                fontStyle: "bold",
                fontSize: 18,
                fillColor: "#000000",
                textColor: "#ffffff",
                halign: "center",
                minCellHeight: 10,
                valign: "middle"
            }
        })
        doc.text('"' + comentarios + '"', 15, distancia() + 15, { maxWidth: 180 })
        doc.save("GrimPlast_" + Fecha.getDay())
        

    }

    const handleEnviar = () => {

        const func = async () => {
            setLoading(true)

            const f = new Date()

            var productos = ""
            var cantidades = ""
            const fecha = Fecha.getDay()
            const hora = Fecha.getHours()

            for(let i = 0; i < lista.length; i++){
                if(productos){
                    productos += "@" + lista[i].producto
                    cantidades += "@" + lista[i].cantidad
                } else {
                    productos += lista[i].producto
                    cantidades += lista[i].cantidad
                }
            }

            try{

                if(!comentarios){
                    setComentarios("No hay comentarios")
                }

                const titulo = "NUEVO PEDIDO"
                const mensg = nombre + " ha registrado un nuevo pedido. Para ver mas detalles consulta los aprtados de tu aplicación."

                const res = await Axios.post(url + "insert/apartado", { correo: correo, productos: productos, cantidades: cantidades,
                                                                        total: total, fecha: fecha, hora: hora, nombre: nombre, comentarios})
                const mensaje = await Axios.post(url + "send/mail", { titulo, mensaje: mensg})

                if(res && mensaje){
                    setLoading(false)
                    setSuccess(true)
                    createPDF()
                    setTimeout(() => {
                        setLista([])
                        setProducto("")
                        setCantidad("0")
                        setComentarios("")
                        setPrecio(0)
                        setTotal(0)
                        setPzs(0)
                        setSuccess(false)
                    }, 2000)
                }

            } catch(err){
                console.log(err)
                setLoading(false)
                setFatal(true)
                setTimeout(() => {
                    setFatal(false)
                    props.history.replace("/")
                }, 1000)
            }

        }

        if(lista.length !== 0){
            setConfirm(!confirm)
            func()
        } else {
            setConfirm(!confirm)
            setErrorMSG("La lista esta vacia.")
            setError(true)
            timerError()
        }

    }

    if(fatal)
        return <Fatal />

    if(loading)
        return <Loading />

    if(success)
        return <Success />

    return (
        <div className="cont-main">

            <div className="main">

                <Confirm
                    confirm={confirm}
                    setConfirm={setConfirm}
                    funcion={handleEnviar}
                />

                <Error
                    error={error}
                    mensaje={errorMSG}
                />

                <Header />

                <Content
                    handleEnviar={showConfirmDialog}
                    setLoading={setLoading}
                    setFatal={setFatal}
                    history={props.history}
                    setError={setError}
                    setErrorMSG={setErrorMSG}
                    lista={lista}
                    setLista={setLista}
                    comentarios={comentarios}
                    setComentarios={setComentarios}
                    total={total}
                    setTotal={setTotal}
                    cantidad={cantidad}
                    setCantidad={setCantidad}
                    producto={producto}
                    setProducto={setProducto}
                    precio={precio}
                    setPrecio={setPrecio}
                    pzs={pzs}
                    setPzs={setPzs}
                />
            </div>
            <div className="cont-footer">
                <Footer />
            </div>

        </div>
    )
}

export default Home