import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/activeUserReducer'
import loginService from '../services/loginService'
import forumService from '../services/forumService'
import RegisterForm from './RegisterForm'
import {View, Text, Button, ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { TextInput } from 'react-native-gesture-handler'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Kanit',
  color: 'black'
}
const formViewStyle = {
  display: 'block',
  textAlign: 'center'
}
const formStyle = {
  width: '70%',
  display: 'inline-block'
}
const labelStyle = {
  float: 'left',
  marginBottom: '0px',
  padding: '0px',
  fontFamily: 'Kanit',
  color: 'black'
}
const loginButtonStyle = {
  float: 'center',
  width: '100px',
  fontFamily: 'Kanit'
}

const LoginForm = (props) => {
  const { setLoggedIn, navigation } = props
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  React.useEffect(() => {
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
        AsyncStorage.setItem(
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
    <View className='container' id='login-form'>
      <Text style={textStyle}>เข้าสู่ระบบ</Text>
      <View id='form-View' style={formViewStyle}>
        <TextInput style={formStyle}>
            <Input onChange={handleChangeUser} value={username} placeholder='username'></Input>
            <Input id='password' type="password" onChange={handleChangePass} value={password} placeholder='password'></Input>
            <Button style={loginButtonStyle} id='submit-login' type="submit">เข้าสู่ระบบ</Button>
        </TextInput>
      </View>
      <View id='no-account-View'>
        <Text style={textStyle}>ยังไม่มีแอคเคาท์ คลิกที่นี่</Text>
        <RegisterForm />
      </View>
    </View>
  )
}

export default LoginForm