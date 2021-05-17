import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Input, Button } from 'react-native-elements';
import Toolbar from "../components/Toolbar";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginData } from '../common/loginData'



const Login = (props) => {

    const [userName, setName] = useState('')
    const [password, setPass] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('LoginScreen props', props);
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '83317166024-j7oakjro8ckr867i7d8ui1nah8i6ctkp.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        })
        isSignedIn()
    }, [])

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        console.log('isSignedIn', isSignedIn);

    };

    const onClickLogIn = () => {
     if(checkDataLogin()){
        dispatch({ type: 'LOGIN', isLogin: true })
        navigateToHome()
        console.log('onClickLogIn');
     }else{
         console.log('ko dang nhap dc');
     }
    }

    const navigateToHome = () => {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Home' },
                ],
            })
        )
    }

    const checkDataLogin = () => {
        let index = loginData.findIndex(elm => elm.userName == userName)
        if (index < 0) return false
        else {
            if (loginData[index].passWord != password) return false
            else return true
        }
    }

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);
            // isSignedIn()
            if (userInfo) {
                dispatch({ type: 'LOGIN', isLogin: true })
                navigateToHome()
            }
        } catch (error) {
            console.log('googleSignIn error', error);

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    return (
        <View style={{ flex: 1, }}>
            <Toolbar {...props} />
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 30 }}>LOGIN</Text>
                <Input
                    placeholder='Email'
                    onChangeText={text => setName(text)}
                />
                {/* <Input
                placeholder="Comment"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={value => this.setState({ comment: value })}
            />


            <Input
                placeholder='INPUT WITH ERROR MESSAGE'
                errorStyle={{ color: 'red' }}
                errorMessage='ENTER A VALID ERROR HERE'
            /> */}

                <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPass(text)} />
                <Button
                    containerStyle={{ width: 290, height: 48, marginBottom: 10 }}
                    onPress={onClickLogIn}
                    title="Login"
                />
                <GoogleSigninButton
                    style={{ width: 300, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={googleSignIn}
                    disabled={false} />
            </View>
        </View>
    )
}

export default Login;