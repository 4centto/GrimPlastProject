import React from 'react'
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native'

const Confirm = ({ confirm, setConfirm, texto, funcion }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={confirm}
            onRequestClose={() => {setConfirm(!confirm)}}
        >
            <View style={{flex: 1, display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center"}}>
                <View style={{backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", shadowColor: "#000",
                            shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, maxWidth: 500,
                            minWidth: 200}}>
                    <Text style={{fontSize: 20}}>{texto}</Text>
                    <TouchableOpacity 
                        style={[styles.botones, {backgroundColor: "#5C0E99"}]}
                        onPress={funcion}
                    >
                        <Text style={[styles.textBtn, {color: "white"}]}>SI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.botones, {borderColor: "black", borderWidth: 2}]}
                        onPress={() => {setConfirm(false)}}
                        >
                        <Text style={styles.textBtn}>NO</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    botones: {
        width: "100%",
        minWidth: 200,
        maxWidth: 450,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        borderRadius: 30
    },
    textBtn: {
        fontSize: 20
    }
})

export default Confirm