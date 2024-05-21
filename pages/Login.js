import React, { useState } from 'react'
import Axios from 'axios'
//Components
import FormLogin from '../components/FormLogin'
import Loading from '../components/Loading'
import { View, Text, Pressable } from 'react-native'
import Error from '../components/Error'
import Fatal from '../components/Fatal'
//Extras
import url from '../config/config'

const Login = (props) => {

    const [ datos, setDatos ] = useState({
        user: '',
        password: ''
    })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ msg, setMsg ] = useState("")
    const [ fatal, setFatal ] = useState(false)

    const timer = () => {
        setTimeout(() => {setError(false)}, 1000)
    }

    const handlePress = () => {

        if(!datos.user || !datos.password){
            setMsg("Debes llenar los campos.")
            setError(true)
            timer()
        } else {

            setLoading(true)
            const func = async (url) => {
                try{

                    const res = await (await Axios.get(url)).data
                    const username = res[0].username_admin
                    const pass = res[0].password_admin

                    if(datos.user == username){
                        if(datos.password == pass){

                            props.navigation.navigate("main")
                            setLoading(false)

                        } else {
                            setLoading(false)
                            setMsg("Contraseña incorrecta.")
                            setError(true)
                            timer()
                        }
                    } else {
                        setLoading(false)
                        setMsg("Usuario incorrecto.")
                        setError(true)
                        timer()
                    }

                } catch(err){
                    setLoading(false)
                    setFatal(true)
                    setTimeout(() => { setFatal(false) }, 1000)
                }

            }

            func(url + "get/admin")

        }

    }

    if(fatal)
        return (
            <Fatal
                fatal ={fatal}
                setFatal={setFatal}
            />
        )

    return (
        <View style={{flex: 1, display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", alignItems: "center"}}>

            <Error
                error={error}
                setError={setError}
                message={msg}
            />

            <Loading
                loading={loading}
                setLoading={setLoading}
            />

            <FormLogin
                handlePress={handlePress}
                setDatos={setDatos}
                datos={datos}
            />

            <Pressable style={{height: 20, width: 150, display: "flex", textAlign: "center", alignItems: "center",
                                justifyContent: "center", marginBottom: 20}}
                onPress={() => {
                    props.navigation.navigate("recuperar-password")
                }}
            >
                <Text style={{fontSize: 15, color: "blue", fontWeight: "bold"}}>Recuperar contraseña</Text>
            </Pressable>

        </View>
    )

}

export default Login