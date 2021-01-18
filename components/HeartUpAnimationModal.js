/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {Modal} from 'react-native-paper'
import LottieView from 'lottie-react-native'


const HeartUpAnimationModal = () => {

  return(  
    <Modal
      visible={true}
      contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
      <LottieView
        source={require('../assets/heartUpAnimation.json')}
        autoPlay
        loop={false}
        style={{zIndex: 99}}/>
    </Modal>
  )
}

export default HeartUpAnimationModal;