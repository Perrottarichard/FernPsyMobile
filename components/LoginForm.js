import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, Text, ToastAndroid, StyleSheet, ScrollView, ActivityIndicator, TouchableHighlight,
} from 'react-native';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../reducers/activeUserReducer';
import loginService from '../services/loginService';
import forumService from '../services/forumService';
import WelcomeCats from '../undraw_welcome_cats_thqn.svg';

const LoginForm = (props) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      ToastAndroid.show('กรุณาใส่ username และ password', ToastAndroid.SHORT);
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
        <Input keyboardType="email-address" autoCompleteType="username" onChangeText={(text) => setEmail(text)} placeholder="Email" leftIcon={{ type: 'material-community-icons', name: 'email', color: 'gray' }} />
        <Input autoCompleteType="password" onChangeText={(text) => setPassword(text)} placeholder="Password" secureTextEntry leftIcon={{ type: 'material-community-icons', name: 'lock-outline', color: 'gray' }} />
        <TouchableHighlight onPress={submitLogin} style={styles.loginButton}>
          {isLoading ? <ActivityIndicator size="small" color="white" />
            : (
              <Text style={styles.loginButtonText}>
                เข้าสู่ระบบ
              </Text>
            )}
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight underlayColor="white" style={styles.goToRegisterButton} onPress={() => navigation.navigate('RegisterForm')}>
          <Text style={styles.openRegText}>
            ยังไม่มีแอคเคาท์ คลิกที่นี่
            สมัครเลย
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#252626',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
    margin: 8,
    alignSelf: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#d896ac',
    alignSelf: 'center',
  },
  openRegText: {
    color: '#d896ac',
    alignSelf: 'center',
  },
  goToRegisterButton: {
    borderRadius: 20,
    padding: 10,
    width: 300,
    margin: 8,
    alignSelf: 'center',
  },
  cats: {
    paddingTop: 20,
    alignSelf: 'center',
  },
});

export default LoginForm;
