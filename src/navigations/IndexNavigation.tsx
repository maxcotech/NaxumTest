import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './../screens/Login/Login';
import AccountsList from '../screens/AccountsList/AccountsList';
import CreateAccount from "../screens/ManageAccount/CreateAccount";
import { Button, Text } from 'native-base';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HStack } from 'native-base';
import routes from "./../config/routes.config";

const Stack = createNativeStackNavigator();
export default function IndexNavigation(){
  
    return (
        <>
        <Stack.Navigator >
            <Stack.Screen 
                options={{ headerShown: false, animation: "slide_from_right" }} 
                name={routes.login}
                component={Login}
            />
            <Stack.Screen
                options={{ headerTitle:" Accounts", headerShown: false, animation: "slide_from_right" }} 
                name={routes.accountList}
                component={AccountsList}
            />
            <Stack.Screen
                options={{ headerTitle:"Create Account", animation: "slide_from_right" }} 
                name={routes.createAccount}
                component={CreateAccount}
            />
        </Stack.Navigator>
        
        </>
    )
}