import React, { useState, useEffect } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
//Componentes
import Fatal from '../../components/Fatal'
import CardApartados from '../../components/CardApartados'
import Confirm from '../../components/Confirm'
import Success from '../../components/Success'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
//Extras
import url from '../../config/config'
import Axios from 'axios'

const Apartados = (props) => {

    const [ apartados, setApartados ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ fatal, setFatal ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const [ confirmCancel, setConfirmCancel ] = useState(false)
    const [ confirmConclude, setConfirmConclude ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ msg, setMsg ] = useState("")

    const [ products, setProducts ] = useState([])
    const [ quantities, setQuantities ] = useState([])

    const [ idApartado, setIdApartado ] = useState("")
    const [ clienteApartado, setClienteApartado ] = useState("")
    const [ total, setTotal ] = useState("")

    const [ refreshing, setRefreshing ] = useState(false)

    const onRefresh = React.useCallback(() => {

        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)

            const func = async (url) => {

                try{
    
                    const res = await (await Axios.get(url)).data          
                    setApartados(res)
    
                } catch(err){
                    setFatal(true)
                    timerFatal()
                }
    
            }
    
            func(url + "get/apartados")

        }, 2000)

    }, [])

    const timerFatal = () => {
        setTimeout(() => {
            setFatal(false)
            props.navigation.navigate('login')
        }, 1000)
    }
    const timerError = () => {
        setTimeout(() => {
            setError(false)
        }, 2000)
    }

    useEffect(() => {
        
        const func = async (url) => {

            try{

                const res = await (await Axios.get(url)).data          
                setApartados(res)

            } catch(err){
                setFatal(true)
                timerFatal()
            }

        }

        func(url + "get/apartados")
        
    }, [])

    const handleCancel = e => {
        setMsg("¿Deseas cancelar este apartado?")
        setConfirmCancel(true)
        setIdApartado(e)
    }
    const cancelando = () => {
        setConfirmCancel(false)
        setLoading(true)

        const func = async () => {

            try{

                const res = await Axios.post(url + "delete/apartado", { id: idApartado })

                if(res){
                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => {
                        setSuccess(false)
                    }, 1000)
                } else {
                    setLoading(false)
                    setFatal(true)
                    timerFatal()
                }

            } catch(err){
                console.log(err)
                setFatal(true)
                timerFatal()
            }

        }

        func()

    }

    const handleConclude = (e, p, c, cli, t) => {
        setMsg("¿Deseas concluir este apartado?")
        setConfirmConclude(true)

        setIdApartado(e)
        setProducts(p)
        setQuantities(c)
        setClienteApartado(cli)
        setTotal(t)

    }
    const aux = () => {
        setConfirmConclude(false)
        setLoading(true)
        if(products.length > 0 && quantities.length > 0){

            setTimeout(() => {
                const func = async (producto, cantidad) => {

                    try{
    
                        const inventario = await Axios.post(url + "actualizarInventario", { producto: producto, cantidad: cantidad })
                        const stats = await Axios.post(url + "actualizarStats", { producto: producto, cantidad: cantidad })
    
                    } catch(err){
                        console.log(err)
                        setLoading(false)
                        setFatal(true)
                        timerFatal()
                    }
    
                }
    
                for(let i = 0; i < products.length; i++){
                    func(products[i], quantities[i])
                }

                const funcDos = async () => {

                    try{
    
                        const client = await Axios.post(url + "actualizarStatsCliente", { cliente: clienteApartado, total: total })
                        const del = await Axios.post(url + "delete/apartado", { id: idApartado })
    
                        setLoading(false)
                        setSuccess(true)
                            setTimeout(() => {
                                setSuccess(false)
                                props.navigation.navigate('home')
                            }, 1000)
    
                    } catch(err){
                        setLoading(false)
                        setFatal(true)
                        timerFatal()
                    }
    
                }

                funcDos()

            }, 500)
            
        } else {
            setMsg("ERROR, VUELVE A INTENTARLO.")
            setError(true)
            timerError()
        }
    }
    const concluyendo = () => {
        aux()
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
        <View style={{flex: 1}} >
            <Error
                error={error}
                setError={setError}
                message={msg}
            />
            <Confirm
                confirm={confirmCancel}
                setConfirm={setConfirmCancel}
                texto={msg}
                funcion={cancelando}
            />
            <Confirm
                confirm={confirmConclude}
                setConfirm={setConfirmConclude}
                texto={msg}
                funcion={concluyendo}
            />
            <ScrollView style={{flex: 1, padding: 20}} horizontal={true} 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    apartados.map(value => {

                        return (
                            <CardApartados
                                key={value.id_apartado}
                                datos={value}
                                handleCancel={handleCancel}
                                handleConclude={handleConclude}
                            />
                        )

                    })
                }
            </ScrollView>
        </View>
    )
}

export default Apartados