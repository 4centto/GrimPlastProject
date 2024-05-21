import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { View, StyleSheet, Text, TouchableHighlight, Touchable } from 'react-native'

const Card = ({data, onPress}) => {

    const [ estado, setEstado ] = useState(data.nombre_producto)

    return (
        <TouchableHighlight style={styles.boton} onPress={() => {onPress(estado)}}>
            <View style={styles.main}>
                <View style={{flex: 1, elevation: 5, backgroundColor: "#5C0E40", borderRadius: 20, textAlign: "center", alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 50, color: "white"}}>{data.bolsasactuales_producto}</Text>
                </View>
                <View style={{flex: 2, padding: 5, textAlign: "center", alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 30, color: "white", textAlign: "center"}}>{data.nombre_producto}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: "#5C0E59",
        width: "100%",
        height: "100%",
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        padding: 10
    },
    boton: {
        width: "100%",
        height: 150,
        minWidth: 250,
        maxWidth: 800,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20
    }
})

export default Card