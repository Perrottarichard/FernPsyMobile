import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/activeUserReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import RegisterForm from './RegisterForm'
import {View, Text, Button, ToastAndroid, Pressable, StyleSheet} from 'react-native'
import {Input} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginForm = (props) => {
  const { navigation } = props
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const submitLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show('กรุณาใส่ username และ password', ToastAndroid.SHORT)
    }
    else {
      try {
        const user = await loginService.userlogin({ email, password })
        await AsyncStorage.setItem(
          'loggedForumUser', JSON.stringify(user)
        )
        forumService.setToken(user.token)
        dispatch(setUser(user))
        ToastAndroid.show(`ยินดีต้อนรับ คุณ ${user.username}`, ToastAndroid.SHORT)
        setEmail('')
        setPassword('')
        navigation.navigate('Home')
      }
      catch (error) {
        console.log(error.message)
        if (error.message.includes('401')) {
          ToastAndroid.show('กรุณาตรวจสอบความถูกต้องของ username และ password')
        } else {
          ToastAndroid.show('มีข้อผิดพลาด')
        }
      }
    }
  }
  return (
    <View>
      <View >
            <Input autoCompleteType='username'onChangeText={text => setEmail(text)} value={email} placeholder='Email' leftIcon={{ type: 'material-community-icons', name: 'email', color: 'gray' }}></Input>
            <Input autoCompleteType='password' onChangeText={text => setPassword(text)} value={password} placeholder='Password' secureTextEntry={true} leftIcon={{ type: 'material-community-icons', name: 'lock-outline', color: 'gray' }} ></Input>
            <Pressable onPress={submitLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>
              เข้าสู่ระบบ
              </Text>
            </Pressable>
      </View>
      <View >
        <Text>ยังไม่มีแอคเคาท์ คลิกที่นี่'</Text>
        <RegisterForm />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#252626',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
    margin: 8,
    alignSelf: 'center'
  },
  loginButtonText: {
    color: '#d896ac',
    alignSelf: 'center'
  }
})

export default LoginForm;
