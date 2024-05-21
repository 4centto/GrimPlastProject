import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Axios from 'axios'
//Componentes
import StatsData from '../../components/StatsData'
import Loading from '../../components/Loading'
import Error from '../../components/Error'
import Fatal from '../../components/Fatal'
//Extras
import url from '../../config/config'

const Stats = (props) => {

    const [ productos, setProductos ] = useState(true)
    const [ clientes, setClientes ] = useState(false)
    const [ background, setBackground ] = useState({
        selected: "#CF6FDD",
        unselected: "#DADADA"
    })

    const [ datos, setDatos ] = useState([])

    const [ fatal, setFatal ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const timerFatal = () => {
        setTimeout(() => {
            setDatos([])
            setFatal(false)
            props.navigation.navigate('home')
        }, 1000)
    }

    function generarLetra(){
        var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
        var numero = (Math.random()*15).toFixed(0);
        return letras[numero];
    }
        
    function getRandomColor(){
        var coolor = "";
        for(var i=0;i<6;i++){
            coolor = coolor + generarLetra() ;
        }
        return "#" + coolor;
    }

    useEffect(() => {
        setProductos(true) 
        setClientes(false)
        setLoading(true)
        const func = async () => {
                
            try{

                const registros = await (await Axios.get(url + "get/productoMasComprado")).data

                const arreglo = []

                registros.map(value => {
                    arreglo.push({
                        name: value.nombre_producto,
                        cantidad: value.cantidad_producto,
                        color: getRandomColor(),
                        legendFontColor: "#000000",
                        legendFontSize: 12
                    })
                })

                setDatos(arreglo)

                setLoading(false)

            } catch(err){
                setLoading(false)
                setFatal(true)
                timerFatal()
            }

        }

        func()
        console.log(datos)
    }, [])

    const handleProductos = () => {

        setProductos(true) 
        setClientes(false)
        setLoading(true)
        const func = async () => {
                
            try{

                const registros = await (await Axios.get(url + "get/productoMasComprado")).data

                const arreglo = []

                registros.map(value => {
                    arreglo.push({
                        name: value.nombre_producto,
                        cantidad: value.cantidad_producto,
                        color: getRandomColor(),
                        legendFontColor: "#000000",
                        legendFontSize: 15
                    })
                })

                setDatos(arreglo)

                setLoading(false)

            } catch(err){
                setLoading(false)
                setFatal(true)
                timerFatal()
            }

        }

        func()

    }

    const handleClientes = () => {
        setProductos(false) 
        setClientes(true)
        setLoading(true)
        const func = async () => {
                
            try{

                const registros = await (await Axios.get(url + "get/clienteMasCompro")).data

                const arreglo = []

                registros.map(value => {
                    arreglo.push({
                        name: value.nombre_cliente,
                        cantidad: value.cantidad_cliente,
                        color: getRandomColor(),
                        legendFontColor: "#000000",
                        legendFontSize: 15
                    })
                })

                setDatos(arreglo)

                setLoading(false)

            } catch(err){
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

    return (
        <View style={{flex: 1}}>
            <Loading
                loading={loading}
                setLoading={setLoading}
            />
            <View style={[styles.contenedores, {flex: 1, width: "100%", flexDirection: "row"}]}>
                <Pressable 
                    style={[styles.toggle, {borderTopLeftRadius: 20, borderBottomLeftRadius: 20}, productos ? {backgroundColor: background.selected, elevation: 4} : {backgroundColor: background.unselected, elevation: 0}]}
                    onPress={handleProductos}
                >
                    <Text style={{fontSize: 15}}>PRODUCTOS</Text>
                </Pressable>
                <Pressable 
                    style={[styles.toggle, {borderTopRightRadius: 20, borderBottomRightRadius: 20}, clientes ? {backgroundColor: background.selected, elevation: 4} : {backgroundColor: background.unselected, elevation: 0}]}
                    onPress={handleClientes}
                >
                    <Text style={{fontSize: 15}}>CLIENTES</Text>
                </Pressable>
            </View>
            <View style={[styles.contenedores, {flex: 9, width: "100%", padding: 10}]}>
                <StatsData
                    datos={datos}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedores: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    toggle: {
        width: "40%",
        minWidth: 150,
        maxWidth: 300,
        height: "70%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "black",
        elevation: 1
    }
})

export default Stats