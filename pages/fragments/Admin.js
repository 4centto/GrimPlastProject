import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, RefreshControl, TextInput, StyleSheet, Pressable } from 'react-native'

import Loading from '../../components/Loading'
import Success from '../../components/Success'
import Fatal from '../../components/Fatal'
import Error from '../../components/Error'
import Confirm from '../../components/Confirm'

import Axios from 'axios'
import url from '../../config/config'

const Admin = (props) => {

    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ correo, setCorreo ] = useState("")
    const [ token, setToken ] = useState("")

    const [ refreshing, setRefreshing ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ fatal, setFatal ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ confirm, setConfirm ] = useState(false)
    const [ msg, setMsg ] = useState(false)

    const timerError = () => {
        setTimeout(() => {
            setError(false) 
        }, 1000)
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {

            const func = async () => {

                try{
                    const datos = (await Axios.get(url + "get/admin")).data[0]
                    setUsername(datos.username_admin)
                    setPassword(datos.password_admin)
                    setCorreo(datos.correo_administrador)
                    setToken(datos.token)
    
                } catch(err){
                    setFatal(true)
                    setTimeout(() => {
                        setFatal(false)
                        props.navigation.navigate("home")
                    }, 2000)
                }
    
            }

            func()
            setRefreshing(false)
        }, 2000)
    }, [refreshing])

    useEffect(() => {

        const func = async () => {

            try{
                const datos = (await Axios.get(url + "get/admin")).data[0]
                setUsername(datos.username_admin)
                setPassword(datos.password_admin)
                setCorreo(datos.correo_administrador)
                setToken(datos.token)

            } catch(err){
                setFatal(true)
                setTimeout(() => {
                    setFatal(false)
                    props.navigation.navigate("home")
                }, 2000)
            }

        }

        func()

    }, [])

    const handlePress = () => {
        if(username && password && correo && token){
            if(password.length >= 10){

                var re = /[a-zA-Z]+/g

                if(token.length >= 4){

                    if(re.exec(token) !== null){
                        setMsg("El token debe contener puros digitos.")
                        setError(true)
                        timerError()
                    } else {

                        re = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/g

                        if(re.exec(correo) !== null){

                            setConfirm(true)

                        } else {
                            setMsg("Correo invalido.")
                            setError(true)
                            timerError()
                        }
                        
                    }

                } else {
                    setMsg("El token debe de tener al menos 4 digitos.")
                    setError(true)
                    timerError()
                }
            } else {
                setMsg("El password debe de ser de al menos 10 caracteres.")
                setError(true)
                timerError()
            }
        } else {
            setMsg("Debes completar todos los campos")
            setError(true)
            timerError()
        }
    }

    const cambiando = () => {
        setConfirm(false)
        setLoading(true)

        const func = async () => {
            try{

                const res = (await Axios.post(url + "update/admin", {password, correo, token})).data

                if(res.affectedRows == 1){
                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => {
                        setSuccess(false)
                        props.navigation.navigate("home")
                    }, 2000)
                } else {
                    setFatal(true)
                    setTimeout(() => {
                        setFatal(false)
                        props.navigation.navigate("home")
                    }, 2000)
                }

            } catch(err){
                setFatal(true)
                setTimeout(() => {
                    setFatal(false)
                    props.navigation.navigate("home")
                }, 2000)
            }
        }

        func()

    }

    if(success)
        return (
            <Success
                succes={success}
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
        <ScrollView style={{flex: 1, padding: 20, display: "flex", textAlign: "center", alignContent: "center"}}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >

            <Error
                error={error}
                setError={setError}
                message={msg}
            />

            <Confirm
                confirm={confirm}
                setConfirm={setConfirm}
                texto={"¿Deseas modificar tu informacion?"}
                funcion={cambiando}
            />

            <View style={{flex: 1}}>
                <Text style={{fontSize: 40, fontWeight: "bold", textAlign: "center"}}>{username}</Text>

                <View style={{flex: 1, marginTop: 30, padding: 5}}>

                    <View style={styles.contInputs}>
                        <Text style={{fontSize: 18, paddingLeft: 10, marginBottom: 5}}>Correo</Text>
                        <TextInput
                            style={styles.inputs}
                            value={correo}
                            onChangeText={value => { setCorreo(value) }}
                        ></TextInput>
                    </View>

                    <View style={styles.contInputs}>
                        <Text style={{fontSize: 18, paddingLeft: 10, marginBottom: 5}}>Password</Text>
                        <TextInput
                            style={styles.inputs}
                            value={password}
                            onChangeText={value => { setPassword(value) }}
                        ></TextInput>
                    </View>

                    <View style={[styles.contInputs, {marginTop: 50}]}>
                        <Text style={{textAlign: "center", fontSize: 18, marginBottom: 5, fontWeight: "bold"}}>Codigo se seguridad</Text>
                        <TextInput
                            style={[styles.inputs, {fontWeight: "bold", fontSize: 25}]}
                            value={token}
                            textAlign={"center"}
                            onChangeText={value => { setToken(value) }}
                        ></TextInput>
                    </View>

                    <View style={[styles.contInputs, {marginTop: 70, justifyContent: "center", alignItems: "center"}]}>
                        <Pressable style={{backgroundColor: "#5C0E59", width: "80%", minWidth: 200, maxWidth: 400, height: 50,
                            justifyContent: "center", alignItems: "center", borderRadius: 50}}
                            onPress={handlePress}    
                        >
                            <Text style={{color: "white", textAlign: "center", fontSize: 20, fontWeight: "bold"}}>ACTUALIZAR</Text>
                        </Pressable>
                    </View>

                </View>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputs: {
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    contInputs: {
        height: 70,
        marginTop: 10,
        marginBottom: 10
    }
})

export default Admin