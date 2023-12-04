import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import telas principais
import Perfil from './Perfil';
import Home from './Home';

const Tab = createBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarStyle: {
            backgroundColor: '#000', // Cor de fundo da aba "Home"
          },
          tabBarInactiveTintColor: 'gray', // Cor quando a aba não está ativa
        }}
      />
    
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarStyle: {
            backgroundColor: '#000', 
          },
          tabBarInactiveTintColor: 'gray', 
        }}
      />
    </Tab.Navigator>
  );
}


