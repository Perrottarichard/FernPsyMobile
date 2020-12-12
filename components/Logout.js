import React from 'react';
import { useDispatch } from 'react-redux';
import { TouchableHighlight, View, ToastAndroid, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUser } from '../reducers/activeUserReducer';
import {Button} from 'react-native-paper'

const Logout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    AsyncStorage.clear();
    ToastAndroid.show('ออกจากระบบสำเร็จแล้ว', ToastAndroid.SHORT);
    dispatch(clearUser());
  };
  return (
    <View style={styles.view}>
      <Button color='black' mode='text' onPress={logout} style={styles.button}>
        <Text>
          ออกจากระบบ
        </Text>
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 30,
    width: 100,
    marginBottom: 20
  },
  button: {
    width: 300,
    alignSelf: 'center',
  }
})
export default Logout;
