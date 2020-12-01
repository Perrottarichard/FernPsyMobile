import React from 'react'
import { useSelector } from 'react-redux'
import { Button, View, Text, ToastAndroid } from 'react-native'
// import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const NoPostsYet = () => {
  const activeUser = useSelector(state => state.activeUser)

  return (
    <View>
      <View>
        {/* <FontAwesomeIcon
          icon={faExclamationCircle}
          style={{ fontSize: '60px', color: '#d3dceb', float: 'center' }}
        >
        </FontAwesomeIcon> */}
        <Text>
          ยังไม่มีคำถามในหัวข้อนี้
        </Text>
        <Text>
          ตั้งกระทู้ คลิก
          </Text>
<Button title='ส่งคำถาม'/>
      </View>
    </View>
  )
}
export default NoPostsYet