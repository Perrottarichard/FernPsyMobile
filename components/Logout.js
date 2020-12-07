import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, View, ToastAndroid } from 'react-native';
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
    <View>
      <Button onPress={logout} title="ออกจากระบบ" />
    </View>
  );
};
export default Logout;
