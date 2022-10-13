import React, {useContext} from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { NativeBaseProvider, Text, Box } from "native-base";
import { HeaderBackButton } from "@react-navigation/elements";

//Contexts
import AuthState from "./src/contexts/authState";


//Views
import Login from "./src/views/Login";
import Home from "./src/views/Home";

//Gradient
const LinearGradient = require('expo-linear-gradient').LinearGradient;
const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function App() {
  //Context de Autenticacion
  

  return (
    <AuthState>
      <NavigationContainer>
        <NativeBaseProvider config={config}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name="Login" 
              component={Login}
              options={{
                title: "Iniciar Sesion",
                headerShown: false,
              
              }}
            />
            <Stack.Screen 
              name="Home" 
              component={Home}
              
              options={{
                title: "Home",
                headerShown: true
              }}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </AuthState>
  );
}