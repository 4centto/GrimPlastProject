import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native'

const FormAddProducto = ({datos, setDatos, handleAgregar}) => {
    return (
        <View style={{flex: 1, alignContent: "center", alignItems: "center"}}>
            <View style={styles.contCuerpo}>
                <View style={{width: "100%", height: 70, marginTop: 30, alignItems: "center", justifyContent: "center"}}>
                    <View stytle={{width: "100%"}}>
                        <Text style={{fontSize: 15}}>Nombre</Text>
                    </View>
                    <TextInput
                        value={datos.nombre}
                        style={styles.inputs}
                        textAlign={"center"}
                        onChangeText={val => { setDatos({...datos, nombre: val}) }}
                    />
                </View>
                <View style={{width: "100%", height: 70, marginTop: 30, alignItems: "center", justifyContent: "center"}}>
                    <View stytle={{width: "100%"}}>
                        <Text style={{fontSize: 15}}>Existencias</Text>
                    </View>
                    <TextInput
                        value={datos.existencias}
                        style={styles.inputs}
                        textAlign={"center"}
                        onChangeText={val => { setDatos({...datos, existencias: val}) }}
                        keyboardType={"numeric"}
                    />
                </View>
                <View style={{width: "100%", height: 70, marginTop: 30, alignItems: "center", justifyContent: "center"}}>
                    <View stytle={{width: "100%"}}>
                        <Text style={{fontSize: 15}}>Cant. por bolsa</Text>
                    </View>
                    <TextInput
                        value={datos.cantBolsa}
                        style={styles.inputs}
                        textAlign={"center"}
                        onChangeText={val => { setDatos({...datos, cantBolsa: val}) }}
                        keyboardType={"numeric"}
                    />
                </View>
                <View style={{width: "100%", height: 70, marginTop: 30, alignItems: "center", justifyContent: "center"}}>
                    <View stytle={{width: "100%"}}>
                        <Text style={{fontSize: 15}}>Precio/Pieza</Text>
                    </View>
                    <TextInput
                        value={datos.precio}
                        style={styles.inputs}
                        textAlign={"center"}
                        onChangeText={val => { setDatos({...datos, precio: val}) }}
                        keyboardType={"numeric"}
                    />
                </View>
                <View style={{width: "100%", height: 60, marginTop: 70, alignItems: "center", justifyContent: "center", minWidth: 200, maxWidth: 500}}>
                    
                    <TouchableHighlight style={{width: "90%", height: 50, backgroundColor: "#5C0E99", alignItems: "center", justifyContent: "center",
                                                borderRadius: 30}} onPress={handleAgregar}>
                        <Text style={{fontSize: 25, color: "white"}}>Agregar</Text>
                    </TouchableHighlight>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contCuerpo: {
        width: "100%",
        minWidth: 200,
        maxWidth: 500,
        padding: 5
    },
    inputs: {
        width: "80%",
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "black",
        fontSize: 25
    }
})

export default FormAddProducto