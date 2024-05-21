import React from 'react'
import { View, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import Axios from 'axios'
//CComponentes
import Loading from '../components/Loading'
import FormInvInfo from '../components/FormInvInfo'
import Confirm from '../components/Confirm'
import Success from '../components/Success'
import Fatal from '../components/Fatal'
import Error from '../components/Error'
//Extras
import url from '../config/config'

const InvInfo = (props) => {

    const [ loading, setLoading ] = useState(false)
    const [ confirmMod, setConfirmMod ] = useState(false)
    const [ confirmEli, setConfirmEli ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ fatal, setFatal ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ msg, setMsg ] = useState("")

    const [ datos, setDatos ] = useState({
        producto: props.route.params.producto,
        existencias: '',
        cantidadBolsa: '',
        precio: ''
    })

    const [ original, setOriginal ] = useState(datos.producto)

    //Obtenemos los datos del producto desde la base de datos
    useEffect(() => {

        const func = async (url, producto) => {
            setLoading(true)
            try{

                const res = await (await Axios.post(url, {nombreProducto: producto})).data

                if(res.length > 0){
                
                    setDatos({
                        ...datos,
                        existencias: res[0].bolsasactuales_producto.toString(),
                        cantidadBolsa: res[0].cantidadporbolsa_producto.toString(),
                        precio: res[0].precioindividual_producto.toString()
                    })

                    setLoading(false)

                } else {
                    setLoading(false)
                    setFatal(true)
                    setTimeout(() => {
                        setFatal(false)
                        props.navigation.navigate('home')
                    }, 2000)
                }

            } catch(err){
                setLoading(false)
                setFatal(true)
                    setTimeout(() => {
                        setFatal(false)
                        props.navigation.navigate('home')
                    }, 2000)
            }
            setLoading(false)
        }

        func(url + "get/producto", datos.producto)

    }, [])

    const timer = () => {
        setTimeout(() => {
            setError(false)
        }, 1000)
    }

    const handleModificar = () => {
        if(validarCampos() == true){
            setConfirmMod(true)
        } else {
            setMsg("Debes completar todos los campos.")
            setError(true)
            timer()
        }
    }

    const validarCampos = () => {

        if(datos.producto && datos.precio && datos.existencias && datos.cantidadBolsa){
            return true
        } else {
            return false
        }

    }

    //La logica que se ejecuta si se modifica el producto
    const modificando = () => {
        setConfirmMod(false)
        setLoading(true)

        const func = async (url) => {

            try{

                if(original == datos.producto){
                    
                    const res = await Axios.post(url + "update/producto", {original: datos.producto, nombre: datos.producto, existencias: datos.existencias, 
                                                    cantBolsa: datos.cantidadBolsa, precio: datos.precio})

                    if(res){
                        setLoading(false)
                        setSuccess(true)

                        setTimeout(() => {

                            props.navigation.navigate('main')

                        }, 1000)

                    } else {

                        setLoading(false)

                        setMsg("Error de conexion.")
                        setError(true)
                        timer()

                    }

                } else {

                    const existe = await (await Axios.post(url + "get/producto", {nombreProducto: datos.producto})).data

                    if(existe.length > 0){

                        setLoading(false)
                        setMsg("El nombre ya esta en uso.")
                        setError(true)
                        timer()


                    } else {

                        const res = await Axios.post(url + "update/producto", {original: original, nombre: datos.producto, existencias: datos.existencias, 
                            cantBolsa: datos.cantidadBolsa, precio: datos.precio})

                        if(res){

                            setLoading(false)
                            setSuccess(true)

                            setTimeout(() => {

                                props.navigation.navigate('main')

                            }, 1000)

                        } else {

                            setLoading(false)
                            setMsg("Error de conexion.")
                            setError(true)
                            timer()
                        }

                    }

                }

            } catch(err){
                setLoading(false)
                setFatal(true)
                setTimeout(() => {
                    setFatal(false)
                    props.navigation.navigate('home')
                }, 2000)
            }

        }

        func(url)

    }

    const handleEliminar = () => {
        setConfirmEli(true)
    }
    
    const eliminando = () => {

        setConfirmEli(false)
        setLoading(true)

        const func = async (url) => {

            try{

                const res = await Axios.post(url, {nombre: datos.producto})

                if(res){
                    setLoading(false)
                    setSuccess(true)

                    setTimeout(() => {

                        props.navigation.navigate('main')

                    }, 1000)

                } else {

                    setMsg("Error de conexion.")
                    setError(true)
                    timer()

                }

            } catch(err){
                setLoading(false)
                setFatal(true)
                setTimeout(() => {
                    props.navigation.navigate('home')
                }, 2000)
            }

        }

        func(url + "delete/producto")

    }

    if(fatal)
        return (
            <Fatal 
                fatal={fatal}
                setFatal={setFatal}
            />
        )

    if(loading)
        return (
            <Loading
                loading={loading}
                setLoading={setLoading}
            />
        )

    if(success)
            return (
                <Success 
                    success={success}
                    setSuccess={setSuccess}
                />
            )

    return (

        <View style={{flex: 1}}>

            <Error
                error={error}
                setError={setError}
                message={msg}
            />

            <Confirm
                confirm={confirmMod}
                setConfirm={setConfirmMod}
                texto={"¿Deseas modificar el producto?"}
                funcion={modificando}
            />

            <Confirm
                confirm={confirmEli}
                setConfirm={setConfirmEli}
                texto={"¿Deseas eliminar el producto?"}
                funcion={eliminando}
            />

            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1, padding: 10}}>
                    <FormInvInfo
                        datos={datos}  
                        setDatos={setDatos}
                        handleModificar={handleModificar}
                        handleEliminar={handleEliminar}
                    />
                </ScrollView>
            </View>
        </View>
        
    )
}

export default InvInfo