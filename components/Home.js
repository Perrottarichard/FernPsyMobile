import React from 'react'
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native'
import WelcomeCats from '../undraw_welcome_cats_thqn.svg'
import LoginForm from './LoginForm'

const Home = () => {
  return(
    <View style={styles.container}>
      <View style={styles.cats}>
      <WelcomeCats width={280} height={220}/>
      </View>
      <View>
      <LoginForm/>
      </View>
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
  cats: {
    paddingTop: 30,
    alignSelf: 'center'
  }
})
export default Home