import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import WishList from '../screens/WishList';
import Login from '../screens/Login';
import { useDispatch, useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {

    const { isLogin } = useSelector(state => {
        console.log('stateuseSelector', state);
        return state.CommonReducer
    });

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            {
                isLogin ?
                    <Drawer.Screen name="WishList" component={WishList} />
                    :
                    <Drawer.Screen name="Login" component={Login} />
            }
        </Drawer.Navigator>
    );
}

export default MyDrawer;