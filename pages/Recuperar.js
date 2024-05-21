import React, { useState } from 'react'
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native'

import Loading from '../components/Loading'
import Success from '../components/Success'
import Fatal from '../components/Fatal'
import Error from '../components/Error'
import Confirm from '../components/Confirm'

import Axios from 'axios'
import url from '../config/config'

const Recuperar = (props) => {

    const [ codigo, setCodigo ] = useState("")
    const [ newPassword, setNewPassword ] = useState("")
    const [ seleccionadoUno, setSeleccionadoUno ] = useState(false)
    const [ seleccionadoDos, setSeleccionadoDos ] = useState(false)
    
    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ fatal, setFatal ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ confirm, setConfirm ] = useState(false)
    const [ msg, setMsg ] = useState("")

    const timerError = (valor) => {
        setTimeout(() => {
            setError(false)
        }, valor)
    }

    const handlePress = () => {
        if(codigo && newPassword){
            setConfirm(true)
        } else {
            setMsg("Debes completar todos los campos.")
            setError(true)
            timerError(1000)
        }
    }

    const cambiando = () => {

        setConfirm(false)

        const func = async () => {

            try{

                setLoading(true)

                const res = (await Axios.get(url + "get/token")).data[0].token

                if(res == codigo){

                    const cambio = (await Axios.post(url + "update/password", { password: newPassword })).data

                    if(cambio.affectedRows == 1){

                        setLoading(false)
                        setSuccess(true)
                        setTimeout(() => {
                            setSuccess(false)
                            props.navigation.navigate("login")
                        }, 2000)

                    } else {
                        setLoading(false)
                        setMsg("Error al cambiar contraseña.")
                        setError(true)
                        timerError(1000)
                        setTimeout(() => {
                            props.navigation.navigate("login")
                        }, 1000)
                    }

                    setLoading(false)

                } else {

                    setLoading(false)
                    setMsg("Los codigos no coinciden.")
                    setError(true)
                    timerError(1000)
                    setTimeout(() => {
                        props.navigation.navigate("login")
                    }, 1000)

                }

            } catch(err){
                setLoading(false)
                setFatal(true)
                setTimeout(() => {
                    setFatal(false)
                    props.navigation.navigate("login")
                }, 1000)
            }

        }

        func()

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

    return (
        <View style={{flex: 1, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>

            <Confirm
                confirm={confirm}
                setConfirm={setConfirm}
                texto={"¿Estas seguro de cambiar tu contraseña?"}
                funcion={cambiando}
            />

            <Loading
                loading={loading}
                setLoading={setLoading}
            />

            <Error
                error={error}
                setError={setError}
                message={msg}
            />

            <View style={{width: "100%", height: 100, justifyContent: "center", alignItems: "center"}}>
                <Text style={[styles.text, {paddingLeft: 25}]}>Codigo de seguridad</Text>
                <TextInput style={[styles.inputs, {fontWeight: "bold"}, 
                    seleccionadoUno ? {borderColor: "#5C0E59"} : {borderColor: "#000000"}]} textAlign="center" 
                    onFocus={ () => { setSeleccionadoUno(true) } }
                    onBlur={ () => { setSeleccionadoUno(false) } }
                    onChangeText={ value => { setCodigo(value) } }
                    value={codigo}
                />
            </View>

            <View style={{width: "100%", height: 100, marginTop: 20, justifyContent: "center", alignItems: "center"}}>
                <Text style={[styles.text, { textAlign: "center" }]}>Nueva contraseña</Text>
                <TextInput style={[styles.inputs, seleccionadoDos ? {borderColor: "#5C0E59"} : {borderColor: "#000000"}]} 
                    onFocus={ () => { setSeleccionadoDos(true) } }
                    onBlur={ () => { setSeleccionadoDos(false) } }
                    onChangeText={ value => { setNewPassword(value) } }
                    value={newPassword}
                />
            </View>

            <View style={{width: "100%", height: 100, marginTop: 100, justifyContent: "center", alignItems: "center"}}>
                <Pressable style={styles.boton}
                    onPress={handlePress}
                >
                    <Text style={{ color: "#5C0E59", fontSize: 20, fontWeight: "bold" }}>RECUPERAR</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    inputs: {
        width: "90%", 
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        fontFamily: "sans-serif",
        fontSize: 25
    },
    text: {
        width: "100%",
        fontSize: 18
    },
    boton: {
        borderColor: "#5C0E59",
        borderWidth: 2,
        width: "80%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    }
})

export default Recuperar