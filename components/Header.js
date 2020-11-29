import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Fern's Counseling</Text>
    </View>
  );
};

const styles= StyleSheet.create({
  header: {
   height: 50,
    padding: 10,
    backgroundColor: 'darkgray'
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  }
})

export default Header;