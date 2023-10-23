import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack'

import Constants from "expo-constants";
import React, { useEffect, useState } from 'react'

import Home from "./pages/Home";
import AppBar from "./components/AppBar";
import StadisticsList from "./pages/StadisticsList";
import StatusPage from "./pages/StatusPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home"  options={{  title: 'Inicio',  }}  component={Home} />
          <Stack.Screen name="StadisticsList"  options={{  title: 'Estadisticas',  }} component={StadisticsList} />
          <Stack.Screen name="StatusPage"  options={{  title: 'Estado del dispositivo',  }} component={StatusPage} />
          {/* <Stack.Screen name="Activate" component={ActivateScreen} /> */}
          {/* <Stack.Screen name="MapScreen" component={MapScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
