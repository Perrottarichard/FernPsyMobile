import React, {useState} from "react";
import { View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements'

const ForumMain = ({navigation}) => {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <View style={styles.container}>
      <Text>Forum here</Text>
      {/* <Button
      title='Go to Forum'
      onPress={() => navigation.navigate('ForumMain')}
      /> */}
    </View>
  );
};

const styles= StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}
})

export default ForumMain;
