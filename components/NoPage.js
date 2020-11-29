import React from 'react'
import { View, Text } from 'react-native'

const NoPage = () => {

  const textStyle = {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '300px'
  }
  return (
    <View style={textStyle}>
      <Text>
        ขออภัย ... ไม่มีหน้าเลย
      </Text>
    </View>
  )
}
export default NoPage