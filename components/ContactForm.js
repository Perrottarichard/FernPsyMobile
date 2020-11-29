import React, { useState } from 'react';
import { Formik } from 'formik';
// import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
// import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import contactService from '../services/contactService'
import LoaderButton from './LoaderButton'
import { View, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Kanit',
  fontVariant: 'small-caps'
}
const formDivStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '50px',
  fontFamily: 'Kanit',
}
const formStyle = {
  width: '90%',
  display: 'inline-block'
}
const labelStyle = {
  float: 'left',
  marginBottom: '0px',
  padding: '0px',
  fontFamily: 'Kanit',
  fontVariant: 'small-caps'
}
const contactButtonStyle = {
  float: 'center',
  width: '150px',
  borderColor: '#343a40',
  borderWidth: '3px',
  borderStyle: 'solid',
  marginBottom: '20px',
  fontFamily: 'Kanit',
  backgroundColor: '#288046'
}

const ContactForm = ({navigation}) => {
  // eslint-disable-next-line no-unused-vars
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isLoading])

  return (
    <View>
      <Formik
        initialValues={{ name: '', email: '', LINE: '', message: '' }}
        onSubmit={
          async (values, { setSubmitting, resetForm }) => {
            if (!values.name) {
              ToastAndroid.show('ชื่อของคุณ')
            }
            else if (!values.email) {
              ToastAndroid.show('ต้องระบุอีเมล')
            }
            else if (!values.message) {
              ToastAndroid.show('เขียนข้อความ')
            }
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              ToastAndroid.show('อีเมลไม่ถูกต้อง')
            }
            else if (!isVerified) {
              ToastAndroid.show('Confirm reCaptcha')
            }
            else {
              setIsLoading(true)
              await contactService.sendContact(values)
              ToastAndroid.show('ส่งข้อความ')
              setSubmitting(false)
              resetForm({})
             navigation.navigate('Home')
            }
          }
        }
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
            <View style={formDivStyle}>
              <Text style={{
                fontFamily: 'Kanit'
              }}> ไม่อยากให้คนอื่นเห็นคำถามของคุณใช่ไหม? ส่งข้อความส่วนตัวถามได้เหมือนกันค่ะ</Text>
              <View id='NavBarText'>
                {/* <a href="mailto:furbynilu@gmail.com"> <FontAwesomeIcon id='fa-contact-form' icon={faEnvelopeSquare} />
                </a>
                <a href="https://www.facebook.com/NiluAcounselor"> <FontAwesomeIcon id='fa-contact-form' icon={faFacebookSquare} /></a> */}
              </View>
              <View style={textStyle}>กรอกแบบฟอร์มเพื่อส่งคำถาม</View>
              <TextInput style={formStyle} onSubmit={handleSubmit} className='form-ui'>
                  <Input
                  placeholder='ชื่อของคุณ'
                    type="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <Label style={labelStyle} for='email'>อีเมล</Label>
                  <Input
                    placeholder='You@example.com'
                    type="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Input
                    placeholder='Line ID'
                    type="Line"
                    name="LINE"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.LINE}
                  />
                  <Input
                    placeholder='ฉันมีคำถามเกี่ยวกับ ...'
                    type="Message"
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
               />
                <LoaderButton style={contactButtonStyle} onPress={handleSubmit} >ส่งข้อความ</LoaderButton>
              </TextInput>
            </View>
          )}
      </Formik>
    </View>
  );
}

export default ContactForm;