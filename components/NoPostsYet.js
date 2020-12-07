import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button, View, Text
} from 'react-native';

const NoPostsYet = () => {
  const activeUser = useSelector((state) => state.activeUser);

  return (
    <View>
      <View>
        <Text>
          ยังไม่มีคำถามในหัวข้อนี้
        </Text>
        <Text>
          ตั้งกระทู้ คลิก
        </Text>
        <Button title="ส่งคำถาม" />
      </View>
    </View>
  );
};
export default NoPostsYet;
