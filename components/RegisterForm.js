import React, { useState } from 'react'
import { ToastAndroid, View, Text, Button, TextInput, Modal, StyleSheet, TouchableHighlight} from 'react-native'
import userService from '../services/userService'

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
        <Button style={styles.openButton} onPress={toggle} title='สมัครเลย'></Button>
        <Modal animationType='slide' visible={modal}>
          <View style={styles.modalView}>
            <Text>สมัครเข้าใช้งาน</Text>

            <TextInput placeholder='email' onChangeText={email => setEmail(email)} value={email}></TextInput>

            <TextInput placeholder='Password'autoCompleteType="password" secureTextEntry={true}onChangeText={pass => setPassword(pass)} value={password}></TextInput>

            <TextInput onChangeText={cpass => setConfirmPassword(cpass)} type='password' placeholder='ยืนยัน Password' value={confirmPassword} secureTextEntry={true}></TextInput>

            <Button onPress={submitRegister} title='สมัครเลย'></Button>
            <Button onPress={toggle} title='ยกเลิก'></Button>
            </View>
        </Modal>
    </View >
  )
}
const styles = StyleSheet.create({
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default RegisterForm