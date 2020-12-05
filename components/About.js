import React, { useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ScrollView, Linking, Pressable} from 'react-native';
import {Switch} from 'react-native-switch'
import {Image, Card} from 'react-native-elements'
import CatFernGraphic from '../undraw_friends_r511.svg'
import  Icon  from 'react-native-vector-icons/Fontisto'

const About = () => {
  const [isEng, setIsEng] = useState(false)

  const toggleLanguage = () => setIsEng(prev => !prev)

//   เกี่ยวกับ Fern

// ชื่อจริง นิลุบล สุขวณิช ชื่อเล่น เฟิร์น ปัจจุบันทำงานเป็นนักจิตวิทยาการปรึกษาของมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ประสบการณ์ทำงานในฐานะนักจิตวิทยาการปรึกษาเริ่มต้น พ.ศ. 2555
// การศึกษา จบจากมหาวิทยาลัยเชียงใหม่ สาขาจิตวิทยาการปรึกษา ระดับปริญญาโท พ.ศ. 2559 และ สาขาจิตวิทยา(คลินิก) ระดับปริญญาตรี พ.ศ. 2548


// เกี่ยวกับ App

// Fern-counseling เป็นแอปพลิเคชัน ที่ให้บริการปรึกษาผ่านการตั้งกระทู้ถามตอบ โดยผู้ใช้งานสามารถเข้ามาอ่านกระทู้ทั้งหมดได้ แต่ในการจะตั้งกระทู้ถามผู้ใช้งานจะต้องทำการ log in ก่อนตั้งกระทู้ เพื่อป้องกันผู้ก่อกวนหรือสร้างความไม่สงบให้แก่ผู้ใช้งานคนอื่นๆ โดยที่ username ในการ log in จะไม่ถูกเปิดเผยต่อสาธารณะ ซึ่งเป็นวัตถุประสงค์ของการสร้างแอปพลิเคชันนี้ขึ้นมาก็คือการทำให้ผู้ใช้งานรู้สึกสบายใจที่จะถาม เพราะไม่มีการเปิดเผยตัวตนให้ผู้ใช้งานคนอื่นๆ ทราบ

// ติดต่อ Fern

// Facebook: "คุยกับพี่นิลุ นักจิตวิทยา : Nilu A Counselor"
// Line: listenbyheart
// หรือทาง:



  return (
    <ScrollView>
      <View style={{alignItems: 'flex-end', marginRight: 20, marginTop: 10}}>
      <Switch 
       onValueChange={toggleLanguage}
       value={isEng}
       activeText={'En'}
       inActiveText={'Th'}
       barHeight={20}
       circleSize={20}
       switchLeftPx={5}
       switchRightPx={5}
      />
      </View>
      <View style={styles.imageContainer}>
      <CatFernGraphic width={140} height={140}/>
      
      </View>
      {!isEng ?
      <View style={{ textAlign: 'left' }}>
        <Card containerStyle={{borderRadius: 20}}>
        <Text style={styles.titleText}>
        เกี่ยวกับ Fern
        </Text>
        <Text style={styles.bodyText}>
        ชื่อจริง นิลุบล สุขวณิช ชื่อเล่น เฟิร์น ปัจจุบันทำงานเป็นนักจิตวิทยาการปรึกษาของมหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ประสบการณ์ทำงานในฐานะนักจิตวิทยาการปรึกษาเริ่มต้น พ.ศ. 2555
        การศึกษา จบจากมหาวิทยาลัยเชียงใหม่ สาขาจิตวิทยาการปรึกษา ระดับปริญญาโท พ.ศ. 2559 และ สาขาจิตวิทยา(คลินิก) ระดับปริญญาตรี พ.ศ. 2548
        </Text>
        
        </Card>
       
       <Card containerStyle={{borderRadius: 20}}>
        <Text style={styles.titleText}>
        เกี่ยวกับ App
        </Text>

        <Text style={styles.bodyText}>
        Fern-counseling เป็นแอปพลิเคชัน ที่ให้บริการปรึกษาผ่านการตั้งกระทู้ถามตอบ โดยผู้ใช้งานสามารถเข้ามาอ่านกระทู้ทั้งหมดได้ แต่ในการจะตั้งกระทู้ถามผู้ใช้งานจะต้องทำการ log in ก่อนตั้งกระทู้ เพื่อป้องกันผู้ก่อกวนหรือสร้างความไม่สงบให้แก่ผู้ใช้งานคนอื่นๆ โดยที่ username ในการ log in จะไม่ถูกเปิดเผยต่อสาธารณะ ซึ่งเป็นวัตถุประสงค์ของการสร้างแอปพลิเคชันนี้ขึ้นมาก็คือการทำให้ผู้ใช้งานรู้สึกสบายใจที่จะถาม เพราะไม่มีการเปิดเผยตัวตนให้ผู้ใช้งานคนอื่นๆ ทราบ
        </Text>
        </Card>
        <View style={styles.contactContainer}>
        <View style={{height: 20}}></View>
<Image source={{uri: 'http://fern-counseling.herokuapp.com/static/media/fernhippie500.8ec92f3a.jpg'}} style={styles.image} PlaceholderContent={<ActivityIndicator />} resizeMode='cover'/>
        <Text style={styles.contactText}>
        ติดต่อ Fern
        </Text>

<Icon.Button
onPress={() => Linking.openURL('https://line.me/R/ti/p/@791pxbkv')}
name={'line'}
size={16}
style={{ backgroundColor: '#00B900', alignSelf: 'center', width: 150}}>
<Text style={{color: 'white', fontSize: 12}}>Add Official Line</Text>
</Icon.Button>
<View style={{height: 5}}>
</View>
<Icon.Button
onPress={() => Linking.openURL('https://www.facebook.com/NiluAcounselor/')}
name={'facebook'}
size={16}
style={{ backgroundColor: '#3b5998', alignSelf: 'center', width: 150}}>
<Text style={{color: 'white', fontSize: 12, paddingLeft: 8}}>Add Facebook</Text>
</Icon.Button>

      </View>
      </View>
      : 
      <View>
        <Text>
          English Version
        </Text>
      </View>
      }
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  titleTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center', alignItems: 'center', marginTop: 40
  },
  image: {
    height: 100, width: 100, borderRadius: 90
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 10
  },
  bodyText: {
    fontSize: 16,
    margin: 10,
    marginLeft: 20
  },
  contactText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5
  },
  linkText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactContainer: {
    alignItems: 'center',
    marginBottom: 20
  }
})

export default About;