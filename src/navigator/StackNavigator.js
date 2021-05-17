import React, { } from 'react';
import Animated from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import WishList from '../screens/WishList';
import DetailVideo from '../screens/DetailVideo';
import MyDrawer from './DrawNavigator';
import Login from "../screens/Login";
import Home from '../screens/Home';

const MainStack = createStackNavigator();


const StackNavigation = (props) => {

    return (
        <Animated.View style={{ flex: 1 }}>
            <MainStack.Navigator
                headerMode="none">
                <MainStack.Screen name="Home">{props => <MyDrawer {...props} />}</MainStack.Screen>
                <MainStack.Screen name="WishList">{props => <WishList {...props} />}</MainStack.Screen>
                <MainStack.Screen name="Login">{props => <Login {...props} />}</MainStack.Screen>
                <MainStack.Screen name="DetailVideo">{props => <DetailVideo {...props} />}</MainStack.Screen>
            </MainStack.Navigator>
        </Animated.View>
    );
};

export default StackNavigation;
