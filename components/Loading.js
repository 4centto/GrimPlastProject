import React from 'react'
import { Modal, View, ActivityIndicator } from 'react-native'

const Loading = ({loading, setLoading}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={loading}
            onRequestClose={() => {setLoading(!loading)}}
        >
            <View style={{flex: 1, display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center"}}>
                <View style={{backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center", shadowColor: "#000",
                            shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5}}>
                    <ActivityIndicator size="large" color="#5C0E59" />
                </View>
            </View>
        </Modal>
    )
}

export default Loading