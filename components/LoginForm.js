import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/activeUserReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import RegisterForm from './RegisterForm'
import {View, Text, Button, ToastAndroid, TextInput} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginForm = (props) => {
  const { setLoggedIn, navigation } = props
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const handleChangeUser = (event) => {
    setUsername(event.target.value)
  }
  const handleChangePass = (event) => {
    setPassword(event.target.value)
  }
  const submitLogin = async event => {
    event.preventDefault()
    if (!username || !password) {
      ToastAndroid.show('กรุณาใส่ username และ password')
    }
    else {
      try {
        const user = await loginService.userlogin({ username, password })
        await AsyncStorage.setItem(
          'loggedForumUser', JSON.stringify(user)
        )
        forumService.setToken(user.token)
        dispatch(setUser(user))
        ToastAndroid.show(`ยินดีต้อนรับ คุณ ${user.username}`)
        setLoggedIn(true)
        setUsername('')
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
      <Text>เข้าสู่ระบบ</Text>
      <View >
            <TextInput onChange={handleChangeUser} value={username} placeholder='username'></TextInput>
            <TextInput autoCompleteType='password' onChange={handleChangePass} value={password} placeholder='password'></TextInput>
            <Button onPress={submitLogin} title='เข้าสู่ระบบ'></Button>
      </View>
      <View >
        <Text>ยังไม่มีแอคเคาท์ คลิกที่นี่</Text>
        {/* <RegisterForm /> */}
      </View>
    </View>
  )
}

export default LoginForm;
