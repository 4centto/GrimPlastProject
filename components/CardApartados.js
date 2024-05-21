import React, { useEffect, useState } from 'react'
import { Pressable, View, Text, StyleSheet, ScrollView } from 'react-native'
import { Table, Rows, Row } from 'react-native-table-component'

const CardApartados = ({datos, handleCancel, handleConclude}) => {

    const [ tableData, setTableData ] = useState({
        tableHead: [ "Producto", "Cantidad" ],
        data: []
    })

    const [ products, setProductos ] = useState([])
    const [ cantidads, setCantidades ] = useState([])

    useEffect(() => {

        const productos = datos.productos_apartado.split("@")
        const cantidades = datos.cantidad_apartado.split("@")

        setProductos(productos)
        setCantidades(cantidades)

        const pedido = []

        for(let i = 0; i < productos.length; i++){
            pedido.push([ productos[i], cantidades[i] ])
        }

        setTableData({
            ...tableData,
            data: pedido
        })

    }, [])

    return (
        <View style={styles.contMain}>

            <View style={styles.main}>

                    <View style={{flex: 1, borderRadius: 20, elevation: 5, widht: "100%", backgroundColor: "#5C0E40", padding: 20, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 40, color: "white"}} >{datos.nombre_cliente}</Text>
                    </View>

                    <View style={styles.contTabla}>
                        <ScrollView style={{fllex: 1}}>
                            <Table style={styles.tabla}>
                                <Row data={tableData.tableHead} style={styles.header} textStyle={{ color: "white", fontSize: 25, textAlign: "center" }} />
                                <Rows data={tableData.data} style={styles.filas} textStyle={{ margin: 5, color: "white", fontSize: 17, textAlign: "center" }} />
                            </Table>
                        </ScrollView>
                    </View>

                    <View style={{flex: 1, width: "100%", marginTop: 10}}>
                        <Text style={{fontSize: 20, color: "white"}}>TOTAL:  ${datos.costetotal_apartado}</Text>
                    </View>

                    <View style={{flex: 1}}>
                        <Text style={{color: "white", fontSize: 18, fontStyle: "italic"}}>"{datos.comentarios_apartado}"</Text>
                    </View>

                    <View style={{flex: 1, flexDirection: "row", marginTop: 10, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{marginRight: 20, fontSize: 18, color: "white"}}>{datos.fecha_apartado}</Text>
                        <Text style={{fontSize: 18, color: "white"}}>{datos.hora_apartado}</Text>
                    </View>

                    <View style={styles.contBotones}>
                        <Pressable style={[styles.botones, {backgroundColor: "rgb(51, 0, 51)"}]}
                            onPress={() => { handleConclude(datos.id_apartado, products, cantidads, datos.nombre_cliente, datos.costetotal_apartado) }}
                        >
                            <Text style={{fontSize: 20, color: "white"}}>CONCLUIR</Text>
                        </Pressable>
                        <Pressable style={[styles.botones, {marginTop: 20, borderColor: "black", borderWidth: 2}]}
                            onPress={() => { handleCancel(datos.id_apartado, products, cantidads) }}
                        >
                            <Text style={{fontSize: 20, color: "white"}}>CANCELAR</Text>
                        </Pressable>
                    </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    botones: {
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    contBotones: {
        width: "100%",
        minWidth: 200,
        maxWidth: 500,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    tabla: {
        justifyContent: "center"
    },
    header: {
        marginBottom: 5
    },
    filas: {
        backgroundColor: "rgba(255, 179, 255, 0.1)",
        margin: 5,
        borderRadius: 5
    },
    main: {
        backgroundColor: "#5C0E59",
        width: "100%",
        height: "100%",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    contMain: {
        width: 300,
        height: "95%",
        minWidth: 250,
        maxWidth: 800,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
        marginRight: 20
    },
    contTabla: {
        backgroundColor: "#5C0E40",
        borderRadius: 20,
        elevation: 10,
        width: "100%",
        height: 200,
        marginTop: 20,
        padding: 5
    }
})

export default CardApartados