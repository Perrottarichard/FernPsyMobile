/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {Image} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

const OnboardingScreen = ({setIsFirstLaunch}) => {

  return(
    <Onboarding
      onSkip={() => setIsFirstLaunch(false)}
      onDone={() => setIsFirstLaunch(false)}
      pages={[
      {
        backgroundColor: '#fff',
        image: <Image
          source={require('../assets/undraw_welcome_cats_thqn.png')}
          style={{height: 240, width: '100%'}}
          />,
        title: 'Welcome to AskFern',
        subtitle: '',
      },
      {
        backgroundColor: '#fff',
        image: <Image
          source={require('../assets/undraw_Add_files_re_v09g.png')}
          style={{height: 240, width: '100%'}}
          />,
        title: 'Post Questions',
        subtitle: '',
      },
      {
        backgroundColor: '#fff',
        image: <Image
          source={require('../assets/undraw_public_discussion_btnw.png')}
          style={{height: 240, width: '100%'}}
          />,
        title: 'Comment and reply to other posts',
        subtitle: '',
      },
      {
        backgroundColor: '#fff',
        image: <Image
          source={require('../assets/undraw_reading_0re1.png')}
          style={{height: 240, width: '100%'}}
          />,
        title: 'Read articles',
        subtitle: '',
      },
      {
        backgroundColor: '#fff',
        image: <Image
          source={require('../assets/undraw_Personal_goals_re_iow7.png')}
          style={{height: 240, width: '100%'}}
          />,
        title: 'Track your daily mood',
        subtitle: '',
      },
      {
        backgroundColor: '#fff',
        image: <Image
          source={require('../assets/undraw_superhero_kguv.png')}
          style={{height: 240, width: '100%'}}
          />,
        title: 'Climb the ranks',
        subtitle: 'Get points to level up and earn more customizations for your avatar',
      },
    ]}
    />
  )
}

export default OnboardingScreen;