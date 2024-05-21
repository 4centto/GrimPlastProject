import React from 'react'
import { useState } from 'react'
import { View, ScrollView } from 'react-native'
import Axios from 'axios'
//Componentes
import FormAddProducto from '../../components/FormAddProducto'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import Fatal from '../../components/Fatal'
import Success from '../../components/Success'
//Extras
import url from '../../config/config'

const AddProducto = (props) => {

    const [ datos, setDatos ] = useState({
        nombre: '',
        existencias: '',
        cantBolsa: '',
        precio: ''
    })
    
    const [ msg, setMsg ] = useState("")
    const [ error, setError ] = useState(false)
    const [ fatal, setFatal ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const validarCampos = () => {
        if(datos.nombre && datos.existencias && datos.cantBolsa && datos.precio){
            return true
        } else {
            return false
        }
    }

    const timerError = () => {
        setTimeout(() => {
            setError(false)
        }, 1000)
    }
    const timerFatal = () => {
        setTimeout(() => {
            setDatos({
                nombre: '',
                existencias: '',
                cantBolsa: '',
                precio: ''
            })
            setFatal(false)
            props.navigation.navigate('home')
        }, 1000)
    }
    const timerSucces = () => {
        setTimeout(() => {
            setDatos({
                nombre: '',
                existencias: '',
                cantBolsa: '',
                precio: ''
            })
            setSuccess(false)
            props.navigation.navigate('home')
        }, 1000)
    }

    const handleAgregar = () => {
        if(validarCampos() == true){

            setLoading(true)

            const func = async () => {
                try{

                    const res = await (await Axios.post(url + "get/producto", {nombreProducto: datos.nombre})).data
                    
                    if(res.length > 0){
                        
                        setLoading(false)
                        setMsg("El producto ya esta registrado.")
                        setError(true)
                        timerError()

                    } else {
                        
                        const resp = await Axios.post(url + "insert/producto", {nombre: datos.nombre, existencias: datos.existencias, 
                                                                                cantBolsa: datos.cantBolsa, precio: datos.precio})

                        if(resp){
                            setLoading(false)
                            setSuccess(true)
                            timerSucces()
                        } else {
                            setLoading(false)
                            setFatal(true)
                            timerFatal()
                        }

                    }
    
                } catch(err){
                    console.log(err)
                    setLoading(false)
                    setFatal(true)
                    timerFatal()
                }
            }

            func()

        } else {
            setMsg("Debes llenar todos los campos.")
            setError(true)
            timerError()
        }
    }

    if(success)
        return (
            <Success
                success={success}
                setSuccess={setSuccess}
            />
        )

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

    return (
        <View style={{flex: 1}}>

            <Error
                error={error}
                setError={setError}
                message={msg}
            />

            <ScrollView style={{flex: 1}}>
                <FormAddProducto
                    datos={datos}
                    setDatos={setDatos}
                    handleAgregar={handleAgregar}
                />
            </ScrollView>
        </View>
    )
}

export default AddProducto