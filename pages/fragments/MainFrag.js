import React from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import { useState, useEffect } from 'react'
import Axios from 'axios'
//Componentes
import Card from '../../components/Card'
import Fatal from '../../components/Fatal'
//Extras
import url from '../../config/config'

const MainFrag = (props) => {

    const [ datos, setDatos ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ fatal, setFatal ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)

        setTimeout(() => {

            const func = async (url) => {

                try{
    
                    const res = await (await Axios.get(url)).data            
                    setDatos(res)
    
                } catch(err){
                    setFatal(true)
                    setTimeout(() => {
                        setFatal(false)
                        props.navigation.navigate('login')
                    }, 2000)
                }
    
            }
    
            func(url + "get/productos")

            setRefreshing(false)

        }, 2000)

    }, [refreshing])

    useEffect(() => {

        const func = async (url) => {

            setLoading(true)
            try{

                const res = await (await Axios.get(url)).data            
                setDatos(res)

                setLoading(false)
            } catch(err){
                setLoading(false)
                setFatal(true)
                setTimeout(() => {
                    setFatal(false)
                    props.navigation.navigate('login')
                }, 2000)
            }

        }

        func(url + "get/productos")

    }, [])

    const handlePressItem = (e) => {
        props.navigation.navigate("inventario-info", {producto: e})
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
            <ScrollView style={{flex: 1, padding: 20, display: "flex", textAlign: "center", alignContent: "center"}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    datos.map((value) => {
                        return (
                            <Card
                                key={value.nombre_producto}
                                data={value}
                                onPress={handlePressItem}
                            />
                        )
                    })
                }
            </ScrollView>
        </View> 
    )
}

export default MainFrag