import React, { useState } from 'react'
import { ToastAndroid, View, Text, Button, TextInput, Input } from 'react-native'
import userService from '../services/userService'

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Kanit'
}
const registerButtonStyle = {
  display: 'inline-block',
  fontFamily: 'Kanit',
  float: 'center',
  width: '100px',

}
const formViewStyle = {
  display: 'block',
  textAlign: 'center',
  fontFamily: 'Kanit'
}
const labelStyle = {
  float: 'left',
  marginBottom: '0px',
  padding: '0px',
  fontFamily: 'Kanit'
}
const genderSelectStyle = {
  marginRight: '20px',
  float: 'left',
  fontFamily: 'Kanit'
}

const RegisterForm = () => {

  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isVerified, setIsVerified] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
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
  const handleChangeGender = (selectedGender) => {
    setSelectedGender(selectedGender)
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
    else if (!isVerified) {
      ToastAndroid.show('Confirm reCaptcha')
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
    <View className='container' id='register-form'>
      <View style={formViewStyle}>
        <Button style={registerButtonStyle} onPress={toggle} title='สมัครเลย'/>
        {/* <Modal autoFocus={true} isOpen={modal} toggle={toggle} modalTransition={{ timeout: 300 }} >
          <ModalBody>
            <Text style={textStyle}>สมัครเข้าใช้งาน</Text>
            <TextInput>
                <Label style={labelStyle}>ชื่อ:</Label>
                <Input onChange={handleChangeName} value={name}></Input><br />
                <Label style={labelStyle}>Username (ภาษาอังกฤษ ขั้นต่ำ 5 ตัวอักษร)</Label>
                <Input onChange={handleChangeUsername} value={username}></Input><br />
                <Label style={labelStyle}>Password (ภาษาอังกฤษ 8-20 ตัวอักษร)</Label> <Input id='password' type="password" onChange={handleChangePassword} value={password}></Input><br />
                <Label style={labelStyle}>ยืนยัน Password:</Label>
                <Input onChange={handleChangeConfirmPassword} type='password' value={confirmPassword}></Input><br />
                <Label style={labelStyle}>Email:</Label> <Input id='email' type="text" onChange={handleChangeEmail} value={email}></Input><br />
                <Label style={genderSelectStyle}>เพศ:</Label><Select options={genderOptions} value={selectedGender} onChange={handleChangeGender}></Select><br />
                <Label style={labelStyle}>วันเกิด:</Label> <Input id='dateOfBirth' type="date" onChange={handleChangeDateOfBirth} value={dateOfBirth}></Input><br />
            </TextInput>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' style={{ fontFamily: 'Kanit' }} type='submit' onClick={submitRegister}>สมัครเลย</Button>
            <Button style={{ fontFamily: 'Kanit' }} onClick={toggle}>ยกเลิก</Button>
          </ModalFooter>
        </Modal> */}
        </View>
    </View >
  )
}

export default RegisterForm