import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, Text, ToastAndroid, StyleSheet, ScrollView, ActivityIndicator, TouchableHighlight,
} from 'react-native';
import { Input } from 'react-native-elements';
import {Button} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../reducers/activeUserReducer';
import loginService from '../services/loginService';
import forumService from '../services/forumService';
import WelcomeCats from '../assets/undraw_welcome_cats_thqn.svg';

const LoginForm = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading]);

  const submitLogin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      ToastAndroid.show('กรุณาใส่ email และ password', ToastAndroid.SHORT);
      setIsLoading(false);
    } else {
      try {
        const user = await loginService.userlogin({ email: email.toLowerCase(), password });
        await AsyncStorage.setItem(
          'loggedForumUser', JSON.stringify(user),
        );
        dispatch(setUser(user));
        forumService.setToken(user.token);
        ToastAndroid.show(`ยินดีต้อนรับ คุณ ${user.email}`, ToastAndroid.SHORT);
      } catch (error) {
        console.log(error.message);
        if (error.message.includes('401')) {
          setIsLoading(false);
          ToastAndroid.show('กรุณาตรวจสอบความถูกต้องของ email และ password', ToastAndroid.SHORT);
        } else {
          setIsLoading(false);
          ToastAndroid.show('มีข้อผิดพลาด', ToastAndroid.SHORT);
        }
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.cats}>
        <WelcomeCats width={200} height={200} />
      </View>
      <View>
        <Input keyboardType="email-address" autoCompleteType="username" onChangeText={(text) => setEmail(text)} placeholder="Email" leftIcon={{ type: 'material-community-icons', name: 'email', color: 'lightgray' }} />
        <Input autoCompleteType="password" onChangeText={(text) => setPassword(text)} placeholder="Password" secureTextEntry={hidePass} leftIcon={{ type: 'material-community-icons', name: 'lock-outline', color: 'lightgray' }} rightIcon={hidePass ? { type: 'font-awesome-5', name: 'eye-slash', color: 'lightgray', size: 20, onPress: () => setHidePass(!hidePass) } : { type: 'font-awesome-5', name: 'eye', color: 'lightgray', size: 20, onPress: () => setHidePass(!hidePass) }}/>

        {isLoading ? <ActivityIndicator style={styles.activity} size="large" color='lightpink'/>
            : 
        <Button onPress={submitLogin} style={styles.loginButton} icon='login' mode='contained'>
              <Text style={styles.loginButtonText}>
                เข้าสู่ระบบ
              </Text>
        </Button>
}
      </View>
      <View>
        <Button style={styles.goToRegisterButton} mode='contained' icon='account-plus' onPress={() => navigation.navigate('RegisterForm')}>
          <Text style={styles.openRegText}>
           สมัครตอนนี้
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightpink',
    marginBottom: 20,
    marginTop: 5
  },
  activity: {
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    marginBottom: 20,
    marginTop: 5
  },
  loginButtonText: {
    color: 'black',
    alignSelf: 'center',
  },
  openRegText: {
    color: 'black',
    alignSelf: 'center',
  },
  goToRegisterButton: {
    alignSelf: 'center',
    borderRadius: 20,
    width: 300,
    backgroundColor: 'lightgray',
    marginBottom: 20
  },
  cats: {
    paddingTop: 20,
    alignSelf: 'center',
  },
});

export default LoginForm;
