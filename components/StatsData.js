import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StatsData = ({datos}) => {

    const [ vacio, setVacio ] = useState(false)

    const chartConfig = {
        color: (opacity = 0.2) => `rgba(26, 255, 146, ${opacity})`
    }

    useEffect(() => {
        if(datos.length > 0){
            setVacio(false)
        } else {
            setVacio(true)
        }
    })

    if(vacio)
        return (
            <View style={{width: "100%", height: "100%", minWidth: 200, maxWidth: 500, alignItems: "center", justifyContent: "center"}}>
                <Text 
                    style={
                        {
                        fontSize: 20, 
                        width: "100%",
                        textAlign: "center"
                        }
                    }
                >
                    NO HAY REGISTROS DE ESTA CATEGORIA.
                </Text>
            </View>
        )

    return (
        <PieChart
            data={datos}
            width={windowWidth * 1.4}
            height={windowHeight * .40}
            chartConfig={chartConfig}
            accessor="cantidad"
            backgroundColor="transparent"
            style={{
                backgroundColor: "rgba(100, 100, 100, 0.2)",
                display: "flex",
                flexDirection: "column",
                borderRadius: 20,
                height: 300,
                minHeight: 200,
                maxHeight: 500,
                alignContent: "center",
                justifyContent: "center",
                transform: [
                    {rotateZ: "90deg"}
                ]
            }}
        />
    )
}


export default StatsData