import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Login from './pages/Login'
import Main from './pages/Main'
import InvInfo from './pages/InvInfo'
import Recuperar from './pages/Recuperar'

import { enableScreens } from 'react-native-screens'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { View, StyleSheet } from 'react-native';

enableScreens();
const Stack = createNativeStackNavigator()

//
export default App = () => {

  return (
    <View style={styles.main}>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="inventario-info" component={InvInfo} options={{ headerShown: false }} />
          <Stack.Screen name="recuperar-password" component={Recuperar} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )

}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})