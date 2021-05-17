import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    GoogleSignin,
} from '@react-native-google-signin/google-signin';

const Toolbar = (props) => {

    const { isLogin } = useSelector(state => {
        console.log('stateuseSelector', state);
        return state.CommonReducer
    });

    const dispatch = useDispatch()

    const navigateTo = (name) => {
        props.navigation.navigate(name)
    }

    const onClickLogout = async () => {
        try {
            const currentUser = await GoogleSignin.getCurrentUser();
            if (currentUser) {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
            }
            dispatch({ type: 'LOGIN', isLogin: false })
            props.navigation.navigate('Home')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={{ backgroundColor: "red", height: 50, flexDirection: "row" }}>

            <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", }} onPress={() => navigateTo('Home')}>
                <Text style={{ color: 'white', fontWeight: "bold" }}>HOME</Text>
            </TouchableOpacity>
            {
                isLogin ?
                    <>
                        <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", }} onPress={() => navigateTo('WishList')}>
                            <Text style={{ color: 'white', fontWeight: "bold" }}>WISHLIST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", }} onPress={onClickLogout}>
                            <Icon name="logout" size={30} color="white" style={{}} />
                        </TouchableOpacity>
                    </>
                    :
                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", }} onPress={() => navigateTo('Login')}>
                        <Text style={{ color: 'white', fontWeight: "bold" }}>LOGIN</Text>
                    </TouchableOpacity>
            }


        </View>
    )
}

export default Toolbar