import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from "./navigator/StackNavigator";

const RootComponent = (props) => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default RootComponent