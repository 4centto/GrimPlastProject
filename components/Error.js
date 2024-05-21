import React from 'react'
import { useEffect } from 'react'
import { Modal, View, Text } from 'react-native'

const Error = ({ error, setError, message }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={error}
            onRequestClose={() => {setError(!error)}}
        >
            <View style={{flex: 1, display: "flex", textAlign: "center", alignItems: "center", justifyContent: "flex-end"}}>
                <View style={{width: "100%", backgroundColor: "red", padding: 10}}>
                    <Text style={{color: "black", fontSize: 15}}>{message}</Text>
                </View>
            </View>
        </Modal>
    )
}

export default Error