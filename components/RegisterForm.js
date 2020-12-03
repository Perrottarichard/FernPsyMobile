import React, { useState } from 'react'
import { ToastAndroid, View, Text, Modal, StyleSheet, Pressable} from 'react-native'
import {Input} from 'react-native-elements'
import userService from '../services/userService'
import Graphic from '../undraw_mobile_login_ikmv.svg'

const RegisterForm = () => {

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const toggle = () => setModal(!modal);

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
   //8-20 char, number, upper, lower password checker -- not in use
    if (!password) {
      ToastAndroid.show('You must have a password')
    }
    else if (password !== confirmPassword) {
      ToastAndroid.show('กรุณายืนยัน password ให้ถูกต้อง')
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      ToastAndroid.show('กรุณากรอก Email ให้ถูกต้อง')
    }
    else {
      setIsLoading(true)
      setTimeout(() => {
        toggle()
      }, 1500);
      try {
        await userService.registerUser({ password, email})
        ToastAndroid.show('สำเร็จแล้ว คุณสามารถล็อคอินและตั้งกระทู้ถามได้เลยค่ะ')
        setPassword('')
        setConfirmPassword('')
        setEmail('')
      }
      catch (error) {
        console.log(error)
        ToastAndroid.show('มีข้อผิดพลาด กรุณาลองใหม่ค่ะ')
      }
    }
  }

  return (
    <View>
        <Pressable style={styles.openButton} onPress={toggle}>
          <Text style={styles.openRegModalText}>
          สมัครเลย
          </Text>
        </Pressable>
        <Modal animationType='slide' visible={modal}>
        <View style={styles.graphicView}>
        <Graphic width={280} height={280}/>
      </View>
          <View style={styles.modalView}>
            <Text>สมัครเข้าใช้งาน</Text>

            <Input placeholder='email' onChangeText={email => setEmail(email)} value={email}></Input>

            <Input placeholder='Password'autoCompleteType="password" secureTextEntry={true}onChangeText={pass => setPassword(pass)} value={password}></Input>

            <Input onChangeText={cpass => setConfirmPassword(cpass)} type='password' placeholder='ยืนยัน Password' value={confirmPassword} secureTextEntry={true}></Input>

            <Pressable onPress={submitRegister} style={styles.submitRegister}>
              <Text style={styles.submitRegisterText}>
              สมัครเลย
              </Text>
            </Pressable>
            <Pressable onPress={toggle} style={styles.cancelRegister}>
              <Text style={styles.cancelRegisterText}>
              ยกเลิก
              </Text>
            </Pressable>
            </View>
        </Modal>
    </View >
  )
}
const styles = StyleSheet.create({
  graphicView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
    margin: 8,
    alignSelf: 'center'
  },
  openRegModalText: {
    color: '#d896ac',
    alignSelf: 'center'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  submitRegister: {
    backgroundColor: '#252626',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
    margin: 8
  },
  cancelRegister: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 300,
    margin: 8
  },
  submitRegisterText: {
    color: '#d896ac',
    alignSelf: 'center'
  },
  cancelRegisterText: {
    color: '#d896ac',
    alignSelf: 'center'
  }
});

export default RegisterForm