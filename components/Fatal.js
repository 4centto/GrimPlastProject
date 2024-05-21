import React from 'react'
import { Image, Modal, Text, View } from 'react-native'
import Imagen from '../assets/fatalimage.png'

const Fatal = ({fatal, setFatal}) => {
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={fatal}
        >
            <View style={{flex: 1, display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center"}}>
                <View style={{width: 200, minWidth: 200, maxWidth: 500, alignItems: "center", justifyContent: "center"}}>
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
                    <Text style={{fontSize: 30}}>Fatal error!!</Text>
                </View>
            </View>
        </Modal>
    )
}
export default Fatal