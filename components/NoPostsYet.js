import React from 'react'
import { useSelector } from 'react-redux'
import { Button, View, Text, ToastAndroid } from 'react-native'
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const postButtonViewStyle = {
  display: 'block',
  textAlign: 'center',
  marginTop: '50px',
  marginBottom: '50px',
  fontFamily: 'Kanit',
  fontSize: '20px'
}
const postButtonStyle = {
  width: '150px',
  fontFamily: 'Kanit',
}


const NoPostsYet = () => {
  const activeUser = useSelector(state => state.activeUser)
  const textStyle = {
    fontFamily: 'Kanit',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: '100px'
  }
  return (
    <View>
      <View style={textStyle}>
        {/* <FontAwesomeIcon
          icon={faExclamationCircle}
          style={{ fontSize: '60px', color: '#d3dceb', float: 'center' }}
        >
        </FontAwesomeIcon> */}
        <Text style={{ marginTop: '20px', fontFamily: 'Kanit' }}>
          ยังไม่มีคำถามในหัวข้อนี้
        </Text>
        <View style={postButtonViewStyle}>
          ตั้งกระทู้ คลิก
<Button color='primary' style={postButtonStyle}>ส่งคำถาม</Button>
        </View>
      </View>
    </View>
  )
}
export default NoPostsYet