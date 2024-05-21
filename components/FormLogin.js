import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import ButtonLogin from '../components/ButtonLogin'

const FormLogin = ({handlePress, setDatos, datos}) => {

    const [ borderUser, setBorderUser ] = useState("black")
    const [ borderPassword, setBorderPassword ] = useState("black")

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1, flexDirection: "column", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
                <View style={styles.contsInputs}>
                    <Text style={styles.texts}>Usuario</Text>
                    <TextInput style={[styles.inputs, {borderColor: borderUser}]} 
                        value={datos.user}
                        onFocus={() => {setBorderUser("#5C0E59")}}
                        onBlur={() => {setBorderUser("black")}}
                        onChangeText={(e) => {setDatos({...datos, user: e})}}
                    />
                </View>
                <View style={styles.contsInputs}>
                    <Text style={styles.texts}>Password</Text>
                    <TextInput style={[styles.inputs, {borderColor: borderPassword}]} 
                        value={datos.password}
                        onFocus={() => {setBorderPassword("#5C0E59")}} 
                        onBlur={() => {setBorderPassword("black")}} 
                        onChangeText={(e) => {setDatos({...datos, password: e})}}
                        secureTextEntry={true}
                    />
                </View>
                <ButtonLogin 
                    contsButton={styles.contsButton}
                    handlePress={handlePress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    contsInputs: {
        height: 80,
        width: "90%",
        marginTop: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5
    },
    contsButton: {
        height: 50,
        width: "70%",
        marginTop: 100,
        backgroundColor: "#5C0E59",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    inputs: {
        width: "100%",
        height: "70%",
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 22,
        maxWidth: 300,
        minWidth: 250
    },
    texts: {
        marginLeft: 10,
        fontSize: 16
    }
})

export default FormLogin