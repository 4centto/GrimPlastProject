import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const ButtonLogin = ({contsButton, handlePress }) => {

    return (
        <View style={contsButton}>
            <TouchableOpacity style={styles.boton} onPress={handlePress}>
                <Text style={{color: "white", fontSize: 20}}>INICIAR SESION</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    boton: {
        width: "100%", 
        height: "100%", 
        borderRadius: 50,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default ButtonLogin