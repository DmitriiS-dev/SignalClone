import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import {Button, Input, Text} from '@rneui/themed'
import { useState } from 'react';

import {auth} from "../fb";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({navigation}) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        })
    }, [navigation]);

    defaultPhotoURL = "../images/default_user.jpg"

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            return updateProfile(authUser.user, {
                displayName: name,
                photoURL: imageUrl || defaultPhotoURL //adjust this - may cause an error
            })
        }).catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behaviour="padding" style={styles.container}>
            <StatusBar style='light'></StatusBar>
            <Text h3 style={{marginBottom: 30}}>Create a Signal account</Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name' type='text' value={name} 
                    onChangeText={(text) => setName(text)}/>
                <Input
                    placeholder='Email'  type='email' value={email} 
                    onChangeText={(text) => setEmail(text)}/>
                <Input
                    placeholder='Password' secureTextEntry  type='password' value={password} 
                    onChangeText={(text) => setPassword(text)}/>
                <Input
                    placeholder='Profile Picture URL (optional)'  type='text' value={imageUrl} 
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}
                    />
            </View>
            <Button containerStyle={styles.button} title="Register" raised onPress={register}></Button>
            <View style={{height: 50}} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    button:{
        width: 200,
        marginTop: 10
    },
    inputContainer:{
        width: 300,

    }
})