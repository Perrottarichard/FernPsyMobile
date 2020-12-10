import React, { useState } from 'react';
import {
  ToastAndroid, View, Text, StyleSheet, ScrollView, TouchableHighlight,
} from 'react-native';
import { Input } from 'react-native-elements';
import userService from '../services/userService';
import Graphic from '../undraw_mobile_login_ikmv.svg';

const RegisterForm = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading]);

  // --not in use--
  // const genderOptions = [
  //   { value: 'ชาย', label: 'ชาย' },
  //   { value: 'หญิง', label: 'หญิง' },
  //   { value: 'ชายรักชาย', label: 'ชายรักชาย' },
  //   { value: 'หญิงรักหญิง', label: 'หญิงรักหญิง' },
  //   { value: 'อื่นๆ', label: 'อื่นๆ' }
  // ]
  const submitRegister = async () => {
    // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(password)
    // 8-20 char, number, upper, lower password checker -- not in use
    if (!password) {
      ToastAndroid.show('You must have a password', ToastAndroid.SHORT);
    } else if (password !== confirmPassword) {
      ToastAndroid.show('กรุณายืนยัน password ให้ถูกต้อง', ToastAndroid.SHORT);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      ToastAndroid.show('กรุณากรอก Email ให้ถูกต้อง', ToastAndroid.SHORT);
    } else {
      setIsLoading(true);
      try {
        await userService.registerUser({ password, email: email.toLowerCase() });
        ToastAndroid.show('สำเร็จแล้ว คุณสามารถล็อคอินและตั้งกระทู้ถามได้เลยค่ะ', ToastAndroid.SHORT);
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        navigation.navigate('LoginForm');
      } catch (error) {
        console.log(error);
        ToastAndroid.show('มีข้อผิดพลาด กรุณาลองใหม่ค่ะ', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.graphicView}>
        <Graphic width={200} height={200} />
      </View>
      <View style={styles.formView}>
        <Input keyboardType="email-address" placeholder="email" onChangeText={(email) => setEmail(email)} style={styles.input} />

        <Input placeholder="Password" autoCompleteType="password" secureTextEntryonChangeText={(pass) => setPassword(pass)} style={styles.input} />

        <Input onChangeText={(cpass) => setConfirmPassword(cpass)} type="password" placeholder="ยืนยัน Password" secureTextEntry style={styles.input} />

        <TouchableHighlight onPress={submitRegister} style={styles.submitRegister}>
          <Text style={styles.submitRegisterText}>
            สมัครเข้าใช้งาน
          </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="white" onPress={() => navigation.navigate('LoginForm')} style={styles.cancelRegister}>
          <Text style={styles.cancelRegisterText}>
            ยกเลิก
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  graphicView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 0
  },
  submitRegister: {
    backgroundColor: '#252626',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
    margin: 8,
  },
  cancelRegister: {
    borderRadius: 20,
    padding: 10,
    width: 300,
    margin: 8,
  },
  submitRegisterText: {
    color: '#d896ac',
    alignSelf: 'center',
  },
  cancelRegisterText: {
    color: '#d896ac',
    alignSelf: 'center',
  },
});

export default RegisterForm;
