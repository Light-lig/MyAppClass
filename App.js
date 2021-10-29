import React from "react";
import { NativeBaseProvider } from "native-base";
import Home from "./src/views/home";
import AddItem from "./src/views/AddItem";
import Edit from "./src/views/Edit";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Turismo",
              headerStyle: {
                backgroundColor: "rgb(16, 185, 129)",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Add"
            component={AddItem}
            options={{
              title: "Agregar",
              headerStyle: {
                backgroundColor: "rgb(16, 185, 129)",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{
              title: "Editar",
              headerStyle: {
                backgroundColor: "rgb(16, 185, 129)",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
