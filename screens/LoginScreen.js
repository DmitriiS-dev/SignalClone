import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from '@rneui/themed';
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import {auth} from "../fb"

import {signInWithEmailAndPassword} from "firebase/auth";

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("Home")
            }
        })

        //cleanup function:
        return () => {
            unsubscribe()
        }
    }, [])

    const signIn = () => {
        console.log("Goes to the Sign in")
        signInWithEmailAndPassword(email,password)
        .catch(error => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Image source={require("../images/signal_logo.jpg")}
            style={{width: 150, height: 150}}
            />
            <View style={styles.inputContainer}>
                <Input placeholder='Email' autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)}/>
                <Input placeholder='Password' secureTextEntry type="password" value={password}  onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn}/>
            </View>

            <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
            <Button onPress={() => {navigation.navigate('Register')}} containerStyle={styles.button}  type="outline" title="Register"/>
            <View style={{height: 50}} />

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputContainer: {
        width: 300
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    button: {
        width: 200,
        marginTop: 10
    }
})