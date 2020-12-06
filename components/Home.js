import React from 'react'
import {useSelector} from 'react-redux'
import { View, StyleSheet, Text} from 'react-native'
import LoginNavigate from './LoginNavigate'
import Logout from './Logout'
import MyQuestions from './MyQuestions'

const Home = () => {
  const user = useSelector(state => state.activeUser)
  
  if(user && user.token) {
    return(
      <View>
        <Logout/>
        <MyQuestions/>
      </View>
    )
  }
  return(
    <View style={styles.container}>
      <LoginNavigate/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 20,
    paddingRight: 20
  },
})
export default Home