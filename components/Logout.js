import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, View, ToastAndroid } from 'react-native'
import { clearUser } from '../reducers/activeUserReducer'
import AsyncStorage from '@react-native-community/async-storage'

const Logout = (props) => {
  const { setLoggedIn, navigation } = props

  const dispatch = useDispatch()
  const logout = () => {
    AsyncStorage.clear()
    setLoggedIn(false)
    ToastAndroid.show('ออกจากระบบสำเร็จแล้ว')
    dispatch(clearUser())
    navigation.navigate('Home')
  }
  return (
    <View id='nav-logout-button'>
      <Button onClick={logout}>ออกจากระบบ</Button>
    </View>
  )
}
export default Logout