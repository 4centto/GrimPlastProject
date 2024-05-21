import React from 'react'
import { useState } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'

const Card = ({data, onPress}) => {

    return (
        <Pressable style={styles.boton} onPress={() => {onPress(data.correo_cliente, data.nombre_cliente)}}>
            <View style={styles.main}>
                <View style={{flex: 2, elevation: 5, backgroundColor: "#5C0E40", borderRadius: 20, 
                            textAlign: "center", alignItems: "center", justifyContent: "center", padding: 10}}>
                    <Text style={{fontSize: 50, color: "white"}}>{data.nombre_cliente}</Text>
                </View>
                <View style={{flex: 1, padding: 5, textAlign: "center", alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 30, color: "white", textAlign: "center"}}>{data.correo_cliente}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#5C0E59",
        width: "100%",
        height: "100%",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        padding: 10
    },
    boton: {
        width: "100%",
        height: 130,
        minWidth: 250,
        maxWidth: 800,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20
    }
})

export default Card