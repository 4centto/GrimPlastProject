import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
//Paginas
import MainFrag from './fragments/MainFrag'
import AddProducto from './fragments/AddProducto'
import Stats from './fragments/Stats'
import Apartados from './fragments/Apartados'
import Clients from './fragments/Clients'
import Admin from './fragments/Admin'

const Drawer = createDrawerNavigator();
const options = (titulo) => {
    const datos = {
        title: titulo,
        drawerActiveBackgroundColor: "rgba(100, 100, 100, 0.1)",
        drawerActiveTintColor: "purple",
        drawerContentContainerStyle: {
            padding: 5
        },
        drawerItemStyle: {
            borderColor: "black",
            borderBottomWidth: 1
        },
        drawerLabelStyle: {
            fontSize: 18
        },
        overlayColor: "rgba(163, 73, 164, 0.5)"
    }

    return datos

}

const Main = () => {

    return (

        <Drawer.Navigator>
            <Drawer.Screen options={options("Inventario")} name="home" component={MainFrag} />
            <Drawer.Screen options={options("Agregar Producto")} name="addProduct" component={AddProducto} />
            <Drawer.Screen options={options("Apartados")} name="apartados" component={Apartados} />
            <Drawer.Screen options={options("Clientes")} name="clients" component={Clients} />
            <Drawer.Screen options={options("Stats")} name="stats" component={Stats} />
            <Drawer.Screen options={options("Mi Espacio")} name="admin" component={Admin} />
        </Drawer.Navigator>

    )
}

export default Main