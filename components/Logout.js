import React from 'react';
import { useDispatch } from 'react-redux';
import { TouchableHighlight, View, ToastAndroid, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUser } from '../reducers/activeUserReducer';

const Logout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    AsyncStorage.clear();
    ToastAndroid.show('ออกจากระบบสำเร็จแล้ว', ToastAndroid.SHORT);
    dispatch(clearUser());
  };
  return (
    <View style={styles.view}>
      <TouchableHighlight onPress={() => logout}>
        <Text>
          Sign Out
        </Text>
        </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 30,
    width: 100
  }
})
export default Logout;
