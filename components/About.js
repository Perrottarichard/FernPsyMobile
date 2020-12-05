import React, { useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import {Switch} from 'react-native-switch'
import {Image} from 'react-native-elements'

const About = () => {
  const [isEng, setIsEng] = useState(false)

  const toggleLanguage = () => setIsEng(prev => !prev)



  return (
    <View>
      
      <View style={styles.titleTextContainer}>
        <Text>Nilubon Sukawanich</Text>
        <Text id='title'>Counselor</Text>
      </View>
      <View style={styles.imageContainer}>
      <Image source={{uri: 'http://fern-counseling.herokuapp.com/static/media/fernanimal.80cfbc49.jpg'}} style={styles.image} PlaceholderContent={<ActivityIndicator />} resizeMode='cover'/>
      </View>
      <View style={{alignItems: 'flex-end', marginRight: 20}}>
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
      {!isEng ?
      <View style={{ textAlign: 'left' }}>
        <Text>
          สวัสดีค่ะ
          ก่อนอื่นต้องขอขอบคุณทุกคนที่เข้าใช้งานและแวะเข้ามาเยี่ยมชมนะคะ
        </Text>

        <Text>
          ดิฉัน นางสาวนิลุบล สุขวณิช มีชื่อเล่นว่า เฟิร์น
          ปัจจุบันทำงานเป็น 'นักจิตวิทยาการปรึกษา' อยู่ที่มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
        </Text>

        <Text>
          เหตุผลที่ทำเว็บนี้ขึ้นมา เพราะอยากให้มีพื้นที่ปลอดภัยในการพูดคุยกับนักจิตวิทยาการปรึกษาเพิ่มมากขึ้น โดยที่ผู้ใช้งานยังคงสามารถรักษาความเป็นส่วนตัวได้ ลดความเสี่ยงต่อการถูกคุกคามทางไซเบอร์จากคอมเม้นท์ที่มีความรุนแรงหยาบคาย หรือถูกสืบประวัติส่วนตัวจากผู้ใช้งานคนอื่น ๆ รวมถึงได้รับข้อมูลเกี่ยวกับสุขภาพจิตที่ถูกต้องเชื่อถือได้จากนักจิตวิทยาการปรึกษา
        </Text>

        <Text>
          ดิฉัน มีความมุ่งมั่นตั้งใจที่จะร่วมเป็นส่วนหนึ่งในการทำให้สังคมไทยเป็นสังคมน่ารักน่าอยู่มากขึ้น ด้วยการนำความรู้ความสามารถของตัวเองมาใช้ให้เกิดประโยชน์มากที่สุดเท่าที่จะทำได้ นั่นก็คือการขอเป็นใครสักคนที่รับฟังปัญหาเรื่องราวความทุกข์ใจของท่านอย่างไม่ตัดสิน โดยเฉพาะให้กับคนที่ไม่รู้จะว่าคุยกับใครดี ไม่กล้าที่จะถามบุคคลใกล้ชิด ไม่อยากเปิดเผยเรื่องราวให้กับคนที่รู้จัก
        </Text>
        <Text>
          โดยท่านสามารถตั้งกระทู้และส่งคำถามส่วนตัวบนเว็บนี้ได้ฟรีไม่มีค่าใช้จ่าย
        </Text>

        <Text>
          และหากใครที่สนใจอยากกดไลค์ กดติดตาม  เพื่ออ่านบทความข่าวสาร หรืออยากสนับสนุนให้กำลังใจดิฉัน ก็สามารถเข้าไปกดไลค์กดแชร์กันได้ที่ Facebook: คุยกับพี่นิลุ นักจิตวิทยา : Nilu A Counselor นะคะ
        </Text>
        <Text>
          ทั้งนี้ หากใครที่ต้องการนัดหมายปรึกษาแบบพบตัว จะมีค่าใช้จ่ายนะคะ
        </Text>
        <Text>
          หวังว่าทุกคนจะ 'Feel free to talk' เพื่อจะได้มีสุขภาพจิตที่ดี มีความสุขกับการใช้พื้นที่ตรงนี้ไปด้วยกัน
        </Text>
        <Text>
          และ..มีเมตตาต่อกันและกันนะคะ
        </Text>
        <Text>Education:
        </Text>
        <Text>มหาวิทยาลัยเชียงใหม่
        วิทยาศาสตร์มหาบัณฑิต สาขาจิตวิทยาการปรึกษา (2557 - 2559)
        Chiangmai University
          Master of Science in Counseling Psychology (2014 - 2016)</Text>
        <Text>
          มหาวิทยาลัยเชียงใหม่
          วิทยาศาสตร์บัณฑิต สาขาจิตวิทยา (2544 - 2547)
          Chiangmai University
          Bachelor of Science in Psychology (2001 - 2004)
          </Text>
      </View>
      : 
      <View>
        <Text>
          English Version
        </Text>
      </View>
      }
    </View>

  );
}

const styles = StyleSheet.create({
  titleTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center', alignItems: 'center'
  },
  image: {
    height: 200, width: 200, borderRadius: 50
  }
})

export default About;