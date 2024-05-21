import React, { useEffect, useState } from 'react'
import { ScrollView, View, RefreshControl, Text } from 'react-native'
import Axios from 'axios'
//Componentes
import Loading from '../../components/Loading'
import Fatal from '../../components/Fatal'
import Confirm from '../../components/Confirm'
import CardCliente from '../../components/CardCliente'
import Success from '../../components/Success'
//Extras
import url from '../../config/config'

const Clients = (props) => {

    const [ loading, setLoading ] = useState(false)
    const [ clientes, setClientes ] = useState([])
    const [ fatal, setFatal ] = useState(false)
    const [ correo, setCorreo ] = useState("")
    const [ confirmEliminar, setConfirmEliminar ] = useState(false)
    const [ confirmValidar, setConfirmValidar ] = useState(false)
    const [ msg, setMsg ] = useState("")
    const [ success, setSuccess ] = useState(false)
    const [ nombre, setNombre ] = useState("")
    const [ refreshing, setRefreshing ] = useState(false)
    const [ clientesEspera, setClientesEspera ] = useState([])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)

            const func = async () => {
    
                try{
    
                    const res = await (await Axios.get(url + "get/clientes")).data
                    const resDos = await (await Axios.get(url + "get/clientesnovalidados")).data
                    setClientes(res)
                    setClientesEspera(resDos)
    
                } catch(err){
                    console.log(err)
                    setFatal(true)
                    timerFatal()
                }
    
            }
    
            func()

        }, 2000)

    }, [])

    const timerFatal = () => {
        setTimeout(() => {
            setFatal(false)
            props.navigation.navigate('login')
        }, 1000)
    }

    useEffect(() => {

        const func = async () => {

            setLoading(true)

            try{

                const res = await (await Axios.get(url + "get/clientes")).data
                const resDos = await (await Axios.get(url + "get/clientesnovalidados")).data
                setClientes(res)
                setClientesEspera(resDos)

                setLoading(false)

            } catch(err){
                console.log(err)
                setLoading(false)
                setFatal(true)
                timerFatal()
            }

        }

        func()

    }, [])

    const handleConfirmEliminar = (correo, nombre) => {
        setMsg("¿Deseas eliminar a " + correo + "?")
        setConfirmEliminar(true)
        setCorreo(correo)
        setNombre(nombre)
    }

    const eliminando = () => {
        setConfirmEliminar(false)
        setLoading(true)

        const func = async () => {
            try{

                const res = await Axios.post(url + "delete/cliente", { correo: correo })
                const del = await Axios.post(url + "delete/clienteStats", { nombre: nombre })

                if(res && del){

                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => {
                        setSuccess(false)
                        props.navigation.navigate('home')
                    }, 1000)

                } else {
                    console.log(err)
                    setLoading(false)
                    setFatal(true)
                    timerFatal()
                }

            } catch(err){
                console.log(err)
                setLoading(false)
                setFatal(true)
                timerFatal()
            }
        }

        func()

    }

    const handleConfirmValidar = (correo, nombre) => {
        setMsg("¿Deseas confirmar a " + correo + "?")
        setConfirmValidar(true)
        setCorreo(correo)
        setNombre(nombre)
    }

    const validandoCliente = () => {
        setConfirmEliminar(false)
        setLoading(true)

        const func = async () => {
            try{

                const confirmado = await Axios.post(url + "validate/client", { nombre, correo })
                const stats = await Axios.post(url + "insert/clienteMasCompro", { nombre })

                if(confirmado && stats){

                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => {
                        setSuccess(false)
                        props.navigation.navigate('home')
                    }, 1000)

                } else {
                    console.log(err)
                    setLoading(false)
                    setFatal(true)
                    timerFatal()
                }

            } catch(err){
                console.log(err)
                setLoading(false)
                setFatal(true)
                timerFatal()
            }
        }

        func()

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
            <Confirm
                confirm={confirmEliminar}
                setConfirm={setConfirmEliminar}
                texto={msg}
                funcion={eliminando}
            />
            <Confirm
                confirm={confirmValidar}
                setConfirm={setConfirmValidar}
                texto={msg}
                funcion={validandoCliente}
            />
            <ScrollView style={{flex: 1, alignContent: "center", padding: 20}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    clientes.map(value => {
                        return (
                            <CardCliente 
                                key={value.correo_cliente}
                                data={value}
                                onPress={handleConfirmEliminar}
                            />
                        )
                    })
                }
                <Text style={{textAlign: "center", marginTop: 50, fontSize: 30, fontWeight: "bold", marginBottom: 20}}>LISTA DE ESPERA</Text>
                {
                    clientesEspera.map(value => {
                        return (
                            <CardCliente 
                                key={value.correo_cliente}
                                data={value}
                                onPress={handleConfirmValidar}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    )

}

export default Clients