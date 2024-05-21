import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native'

const FormInvInfo = ({datos, setDatos, handleModificar, handleEliminar}) => {
    return (
        <View style={{flex: 1}}>
            <View style={styles.contTitle}>
                <TextInput 
                    value={datos.producto} 
                    style={styles.title} 
                    textAlign={"center"} 
                    onChangeText={val => {setDatos({...datos, producto: val})}}
                />
            </View>
            <View style={styles.contCuerpo}>
                <View style={{width: "100%", height: 70, alignItems: "center", justifyContent: "center"}}>
                    <View stytle={{width: "100%"}}>
                        <Text style={{fontSize: 15}}>Existencias</Text>
                    </View>
                    <TextInput
                        value={datos.existencias}
                        style={styles.inputs}
                        textAlign={"center"}
                        onChangeText={val => {setDatos({...datos, existencias: val})}}
                        keyboardType={"numeric"}
                    />
                </View>
                <View style={{width: "100%", height: 70, marginTop: 30, alignItems: "center", justifyContent: "center"}}>
                    <View stytle={{width: "100%"}}>
                        <Text style={{fontSize: 15}}>Cant. por bolsa</Text>
                    </View>
                    <TextInput
                        value={datos.cantidadBolsa}
                        style={styles.inputs}
                        textAlign={"center"}
                        onChangeText={val => {setDatos({...datos, cantidadBolsa: val})}}
                        keyboardType={"numeric"}
                    />
                </View>
                <View style={{width: "100%", height: 70, marginTop: 30, alignItems: "center", justifyContent: "center"}}>
                    <View stytle={{width: "100%"}}>
                        <Text style={{fontSize: 15}}>Precio</Text>
                    </View>
                    <TextInput
                        value={datos.precio}
                        style={styles.inputs}
                        textAlign={"center"}
                        onChangeText={val => {setDatos({...datos, precio: val})}}
                        keyboardType={"numeric"}
                    />
                </View>
                <View style={{width: "100%", height: 60, marginTop: 70, alignItems: "center", justifyContent: "center", minWidth: 200, maxWidth: 500}}>
                    
                    <TouchableHighlight style={{width: "90%", height: 50, backgroundColor: "#5C0E99", alignItems: "center", justifyContent: "center",
                                                borderRadius: 30}} onPress={handleModificar}>
                        <Text style={{fontSize: 25, color: "white"}}>Modificar</Text>
                    </TouchableHighlight>

                </View>
                <View style={{width: "100%", height: 60, marginTop: 20, alignItems: "center", justifyContent: "center", minWidth: 200, maxWidth: 500}}>
                    
                    <TouchableHighlight style={{width: "90%", height: 50, alignItems: "center", justifyContent: "center", 
                                                borderRadius: 30, borderColor: "red", borderWidth: 2}} onPress={handleEliminar}>
                        <Text style={{fontSize: 25, color: "black"}}>Eliminar</Text>
                    </TouchableHighlight>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        width: "100%", 
        height: "100%", 
        fontSize: 40
    },
    contTitle: {
        width: "100%", 
        height: 50, 
        minHeight: 50,
        maxHeight: 300,
        backgroundColor: "rgba(255, 0, 206, 0.2)", 
        borderRadius: 10, 
        marginTop: 10,
        marginBottom: 20
    },
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
    },
    botones: {

    }
})

export default FormInvInfo