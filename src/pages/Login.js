import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import '../components/styles/Login.css'
import Loading from '../components/Loading'
import Success from '../components/Success'
import Fatal from '../components/Fatal'
import Error from '../components/Error'
import url from '../config/config'

const Login = ({history}) => {

    const [ registro, setRegistro ] = useState(false)
    const [ login, setLogin ] = useState(true)
    const [ nombre, setNombre ] = useState("")
    const [ correo, setCorreo ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ fatal, setFatal ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ errorMSG, setErrorMSG ] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
    }

    const timerLloading = () => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    const timerError = () => {
        setTimeout(() => {
            setError(false)
        }, 2000)
    }

    const handleRegistrarse = () => {
        setLoading(true)
        setRegistro(true)
        setLogin(false)
        setCorreo("")
        setPassword("")
        timerLloading()
    }

    const handleCerrar = () => {
        setLoading(true)
        setRegistro(false)
        setLogin(true)
        setCorreo("")
        setPassword("")
        setNombre("")
        timerLloading()
    }

    const registrando = () => {
        if(nombre && correo && password){

            const re = /[a-zA-Z0-9]+@[a-zA-z0-9]+\.[a-zA-Z0-9]+/g
            const result = re.exec(correo)

            if(result !== null){

                setLoading(true)

                const func = async () => {

                    try{

                        const valNombre = await (await Axios.post(url + "get/cliente/registro/nombre", { nombre })).data

                        if(valNombre.length > 0){
                            setErrorMSG("El nombre ingresado ya esta en uso.")
                            setError(true)
                            timerError()
                            return;
                        } else {

                            const valCorreo = await (await Axios.post(url + "get/cliente/registro/correo", { correo })).data

                            if(valCorreo.length > 0){
                                setErrorMSG("El correo ingresado ya esta en uso.")
                                setError(true)
                                timerError()
                                return;
                            } else {

                                const titulo = "PETICION DE REGISTRO"
                                const mensg = nombre + " quiere registrarse en el sistema. Para confirmarlo revisa tu lista de espera de clientes en la APP."

                                const res = await Axios.post(url + "insert/cliente", { nombre, correo, password })
                                const sendMail = await Axios.post(url + "send/mail", { titulo, mensaje: mensg})

                                if(res.data.affectedRows == 1){

                                    setLoading(false)
                                    setSuccess(true)
                                    setTimeout(() => {
                                        setNombre("")
                                        setSuccess(false)
                                        setLogin(true)
                                        setRegistro(false)
                                    }, 1000)

                                } else {
                                    setErrorMSG("NO SE PUDO REGISTRAR AL CLIENTE.")
                                    setError(true)
                                    timerError()
                                }

                            }

                        }

                    } catch(err){
                        console.log(err)
                        setLoading(false)
                        setFatal(true)
                        setTimeout(() => {
                            setRegistro(false)
                            setLogin(true)
                            setCorreo("")
                            setNombre("")
                            setPassword("")
                            setFatal(false)
                        }, 1000)
                    }

                }

                setTimeout(() => {
                    func() 
                    setLoading(false)
                }, 500)

            } else {
                setErrorMSG("Correo invalido.")
                setError(true)
                timerError()
            }

        } else {
            setErrorMSG("Debes llenar todos los campos")
            setError(true)
            timerError()
        }
    }

    const logeando = () => {
        if(correo && password){

            const func = async () => {
                setLoading(true)
                try{

                    const res = await (await Axios.post(url + "get/cliente/registro/correo", { correo })).data

                    if(res.length > 0){

                        if(res[0].correo_cliente == correo){

                            if(res[0].password_cliente == password){
                                
                                if(res[0].cliente_verificado == "true"){
                                    setTimeout(() => {
                                        setLoading(false)
                                        history.replace({
                                            pathname: "/Home",
                                            search: "",
                                            state: {
                                                correo
                                            }
                                        })
                                    }, 1000)
                                } else {
                                    setLoading(false)
                                    setErrorMSG("Espera hasta que el administrador te conceda el acceso.")
                                    setError(true)
                                    timerError()
                                }

                            } else {
                                setLoading(false)
                                setErrorMSG("Contraseña incorrecta.")
                                setError(true)
                                timerError()
                            }

                        } else {
                            setLoading(false)
                            setErrorMSG("Correo incorrecto.")
                            setError(true)
                            timerError()
                        }

                    } else {
                        setLoading(false)
                        setErrorMSG("LA CUENTA NO EXISTE")
                        setError(true)
                        timerError()
                    }

                } catch(err){
                    console.log(err)
                    setLoading(false)
                    setFatal(true)
                    setTimeout(() => {
                        setCorreo("")
                        setNombre("")
                        setPassword("")
                        setFatal(false)
                    }, 1000)
                }
            }

            func()

        } else {
            setErrorMSG("DEBES COMPLETAR TODOS LOS CAMPOS")
            setError(true)
            timerError()
        }
    }

    if(fatal)
        return <Fatal />

    if(success)
        return <Success />

    if(loading)
        return <Loading />

    return (
        <div className="conthome">
            <Error
                error={error}
                mensaje={errorMSG}
            />
            <div className="contRegistro" style={ registro ? { display: "contents" } : { display: "none" } } onSubmit={handleSubmit}>
                <form autoComplete="off">
                    <div className="inputRegistro">
                        <p>Nombre de la marca:</p>
                        <input type="text" autoFocus value={nombre} onChange={ e => { setNombre( e.target.value ) } } maxLength="15" />
                    </div>
                    <div className="inputRegistro">
                        <p>Correo:</p>
                        <input type="text" value={ correo } onChange={ e => { setCorreo( e.target.value ) } } />
                    </div>
                    <div className="inputRegistro">
                        <p>Contraseña:</p>
                        <input type="text" value={ password } onChange={ e => { setPassword( e.target.value ) } } />
                    </div>
                    <div className="inputRegistro">
                        <button onClick={ handleCerrar }>CERRAR</button>
                        <button onClick={ registrando }>REGISTRARSE</button>
                    </div>
                </form>
            </div>
            <div className="contLogin" style={ login ? { display: "contents" } : { display: "none" } } onSubmit={handleSubmit}>
                <form autoComplete="off">
                    <div className="inputRegistro">
                        <p>Correo:</p>
                        <input type="text" value={ correo } onChange={ e => { setCorreo( e.target.value ) } } />
                    </div>
                    <div className="inputRegistro">
                        <p>Contraseña:</p>
                        <input type="password" value={ password } onChange={ e => { setPassword( e.target.value ) } } />
                    </div>
                    <div className="inputRegistro">
                        <button onClick={ handleRegistrarse }>REGISTRARSE</button>
                        <button onClick={logeando}>INICIAR SESION</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login