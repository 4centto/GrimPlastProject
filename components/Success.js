import React from 'react'
import { Image, Modal, Text, View } from 'react-native'
import Imagen from '../assets/succesimage.png'

const Success = ({success, setSuccess}) => {
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={success}
            onRequestClose={() => {setSuccess(!success)}}
        >
            <View style={{flex: 1, display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center"}}>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <Image
                        source={Imagen}
                        style={{
                            width: 150,
                            height: 150,
                            minWidth: 150,
                            maxWidth: 450,
                            resizeMode: "contain",
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
}
export default Success