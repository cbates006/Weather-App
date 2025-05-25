import { View, Text, StyleSheet, TextInput, Button, SafeAreaView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import CheckBox from 'expo-checkbox'; 
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store'
type tokenType = {
  token:string
}

type RootStackParamsList = {
  Login: undefined,
  AuthWeatherApp: undefined,
}

type Props = NativeStackScreenProps<RootStackParamsList, 'Login'>

function Login( { route, navigation }: Props ) {
  useEffect( () => {
    getAuthorization()
    .then ( (authorized) => {
      if (authorized) {
        console.log("authorized")
      }
      else {
        console.log("not authorized")
      }
    })
  },[])

  async function getAuthorization ():Promise<boolean> {
    let token: string | null 
      try {
        token = await SecureStore.getItemAsync("token")
      }
      catch(err:unknown) {
        token = ''
      }
      const pcip = '100.66.52.19'
      const laptopip = '10.15.6.229' 
      const getToken = await fetch('http://' + pcip + ':3000/users/authz', {
        method: 'POST',
        headers: {
          'X-Auth': token as string
        },
    })
    let returnVal:boolean = false
    if (getToken.status === 200) {
      console.log("token sent")
      returnVal = true
     }
    else if (getToken.status ===401) {
      console.log("token not found")
      returnVal = false
    }
    return(returnVal)
  }

  const loginFun = async() => {
    console.log('Email entered:', email);
    setEmail('');
    console.log('Password entered:', password);
    setPass('');
    const pcip = '100.66.52.45'
    const laptopip = '10.15.6.229' 
    const response = await fetch('http://' + pcip + ':3000/users/auth', { //note that the ip will need to be changed when running on different computers with different addresses
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        email: email,
        password: password,
        }),
      });
      getRes(response)
      
      async function getRes(response:Response) {
        console.log(response.status)
        try {
          if (response.status === 200) {
            const token: tokenType = await response.json()
            console.log(token.token)
            try {
              const options = {keychainAccessible: SecureStore.WHEN_UNLOCKED} 
              await SecureStore.setItemAsync("token",token.token)
            }
            catch (err: unknown) {
              if (err instanceof Error )
              console.log(err.message)
            }
            navigation.navigate("AuthWeatherApp")
          }
          else if (response.status === 403) {
            setError(true)
            console.log('Authentication failed')
          }
        }
        catch(err) {
          if (err instanceof Error) {
            console.log('Error: ${err.message}')
          }
        }
      }
      let token: string | null 
      try {
        token = await SecureStore.getItemAsync("token")
      }
      catch(err:unknown) {
        token = ''
      }
  }
  
  const [isChecked, setChecked] = useState(false);

  const [email, setEmail] = useState<string>('');

  const [error, setError] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const [password, setPass] = useState<string>('');

  const handlePassChange = (text: string) => {
    setPass(text);
  };

  return (
    <View style={styles.container}>
        <View style ={styles.loginButton}><Text style={styles.buttonText}>MyWeather Login</Text></View>
        <View style = {styles.inputBox}>
            <TextInput 
            style={styles.input}
            placeholder="email address"
            onChangeText={handleEmailChange}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            />
            <TextInput 
            style={styles.input}
            placeholder="password"
            onChangeText={handlePassChange}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            />
        </View>
        {error&& <Text style ={styles.errorText}>Username or password incorrect</Text>}
        <View style ={styles.signInButton}><Button title="Sign In" onPress={loginFun} color={"black"} /></View>
        <CheckBox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text>Stay logged in?</Text>
        <Button title="Forgot password?" onPress={() => navigation.navigate("AuthWeatherApp")} />
        <Button title="Create account" onPress={() => navigation.navigate("AuthWeatherApp")} />

    </View>
  )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 35,
    },
    checkbox: {
      margin: 8,
    },
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 40,
      paddingBottom: 200,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      color: "red",
      fontSize: 15,
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      width: 350,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    inputBox: {
      marginTop: 80,
      marginBottom: 20,
    },
    loginButton: {
        width: '100%',
        height: 80,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInButton: {
        width: '70%',
        height: '10%',
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

export default Login