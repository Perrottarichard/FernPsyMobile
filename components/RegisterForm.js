import React, { useState } from 'react'
import { ToastAndroid, View, Text, Button, TextInput, Modal, StyleSheet, TouchableHighlight} from 'react-native'
import userService from '../services/userService'
import {Picker} from '@react-native-picker/picker';

const RegisterForm = () => {

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedGender, setSelectedGender] = useState({value: ''})
  const [dateOfBirth, setDateOfBirth] = useState('')


  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  const toggle = () => setModal(!modal);

  const genderOptions = [
    { value: 'ชาย', label: 'ชาย' },
    { value: 'หญิง', label: 'หญิง' },
    { value: 'ชายรักชาย', label: 'ชายรักชาย' },
    { value: 'หญิงรักหญิง', label: 'หญิงรักหญิง' },
    { value: 'อื่นๆ', label: 'อื่นๆ' }
  ]

  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const handleChangeUsername = (event) => {
    setUsername(event.target.value)
  }
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value)
  }
  const handleChangeDateOfBirth = (event) => {
    setDateOfBirth(event.target.value)
  }

  const variations = ['fern', 'Fern', 'admin', 'Admin', 'administrator', 'Administrator', 'nilubon', 'Nilubon', 'Fern-Admin', 'Fern-admin', 'fern-admin', 'fern-Admin', 'Fern Admin', 'fern Admin', 'Fern admin', 'fern admin', 'FernAdmin', 'fernAdmin', 'fern_admin', 'Fern_Admin']

  const submitRegister = async event => {
    event.preventDefault()
    if (variations.includes(username) || variations.map(v => v.toLowerCase).includes(username)) {
      ToastAndroid.show('ขออภัยค่ะ ชื่อนี้มีผู้ใช้งานแล้ว')
    }
    else if (!name || !username || !selectedGender || !dateOfBirth || !password) {
      ToastAndroid.show('กรุณากรอกข้อมูลให้ครบถ้วน')
    }
    else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(password)) {
      ToastAndroid.show('Password ต้องเป็นภาษาอังกฤษ ความยาวอย่างน้อย 8-20 ตัวอักษร และไม่ใช้อักขระพิเศษ')
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
        await userService.registerUser({ name, username, password, email, selectedGender, dateOfBirth })
        ToastAndroid.show('สำเร็จแล้ว คุณสามารถล็อคอินและตั้งกระทู้ถามได้เลยค่ะ')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setName('')
        setSelectedGender('')
        setEmail('')
        setDateOfBirth('')
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
                <TextInput style={styles.modalText}onChangeText={handleChangeName} placeholder='ชื่อ'value={name}></TextInput>

                <TextInput onChangeText={handleChangeUsername} autoCompleteType='username'placeholder='Username (ภาษาอังกฤษ ขั้นต่ำ 5 ตัวอักษร)'value={username}></TextInput>

                <TextInput placeholder='Password (ภาษาอังกฤษ 8-20 ตัวอักษร)'autoCompleteType="password" onChangeText={handleChangePassword} value={password}></TextInput>

                <TextInput onChangeText={handleChangeConfirmPassword} type='password' placeholder='ยืนยัน Password' value={confirmPassword}></TextInput>

                <TextInput placeholder='email' onChangeText={handleChangeEmail} value={email}></TextInput>
                <Picker style={{height: 50, width: 160}} mode='dropdown' selectedValue={selectedGender.value} onValueChange={(itemValue) => setSelectedGender({value: itemValue})}>
                {genderOptions.map(t => <Picker.Item key={t.value} label={t.label} value={t.value}></Picker.Item>)}  
                </Picker>

                <TextInput placeholder='วันเกิด'onChangeText={handleChangeDateOfBirth} value={dateOfBirth}></TextInput>

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