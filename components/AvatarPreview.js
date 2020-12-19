/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, StyleSheet, FlatList, ToastAndroid, ActivityIndicator, Animated, Dimensions} from 'react-native'
import {RadioButton, Text, Card, TextInput, Button,} from 'react-native-paper'
import {BigHead} from 'react-native-bigheads'
import {updateUserAvatar} from '../reducers/activeUserReducer'
import {ExpandingDot} from 'react-native-animated-pagination-dots'

const accessoryButtons = [
  {name: "ไม่มี", value: "none"},
  {name: "ตุ้มหู", value: "hoopEarrings"}, 
  {name: "แว่นตาทรงกลม", value: "roundGlasses"},
  {name: "แว่นตาจิ๋ว", value: "tinyGlasses"},
  {name: "แว่นตาดำ", value:"shades"},
  {name: "หน้ากากอนามัย", value: "faceMask"}
]

const bgColorButtons = [
  {name: "ฟ้า", value: "blue"}, 
  {name: "เขียว", value: "green"},
  {name: "แดง", value: "red"},
  {name: "ส้ม", value: "orange"},
  {name: "เหลือง", value:"yellow"},
  {name: "ชมพู", value: "pink"}
]

const bodyButtons = [
  {name: "มีหน้าอก", value: "breasts"},
  {name: "ไม่มีหน้าอก", value: "chest"}
]

const clothingButtons = [
  {name: "เสื้อเชิ้ต", value: "shirt"}, 
  {name: "ไม่ใส่เสื้อ", value: "naked"},
  {name: "เสื้อยีนส์", value: "denimJacket"},
  {name: "เสื้อมีหมวก", value: "hoodie"},
  {name: "เสื้อแขนกุด", value:"tankTop"},
  {name: "เดรส", value: "dress"}
]

const clothingColorButtons = [
  {name: "ขาว", value: "white"}, 
  {name: "ฟ้า", value: "blue"},
  {name: "เขียว", value: "green"},
  {name: "แดง", value: "red"},
  {name: "ดำ", value:"black"},
]

const eyebrowsButtons = [
  {name: "คิ้วต่ำ", value: "leftLowered"}, 
  {name: "คิ้วโก่ง", value: "raised"},
  {name: "เคร่งเครียด", value: "serious"},
  {name: "โกรธ", value: "angry"},
  {name: "ครุ่นคิด", value:"concerned"},
]

const eyesButtons = [
  {name: "ปกติ", value: "normal"}, 
  {name: "รูปดาว", value: "stars"},
  {name: "มีความสุข", value: "happy"},
  {name: "หรี่ตา", value: "squint"},
  {name: "หลับตาข้างเดียว", value:"wink"},
  {name: "น่ารัก", value: "cute"},
]

const facialHairButtons = [
  {name: "ไม่มี", value: "none"}, 
  {name: "หนวดหรอมแหรม", value: "stubble"},
  {name: "หนวดเครา", value: "mediumBeard"},
  {name: "เคราแพะ", value: "goatee"},
]

const graphicButtons = [
  {name: "ไม่มี", value: "none"}, 
  {name: "โดนัท", value: "donut"},
  {name: "สายรุ้ง", value: "rainbow"},
]

const hairButtons = [
  {name: "ไม่มี", value: "none"}, 
  {name: "ผมยาว", value: "long"},
  {name: "ผมสั้น", value: "short"},
  {name: "มวยผม", value: "bun"},
  {name: "ผมทรงกะลา", value:"pixie"},
  {name: "ผมบ๊อบ", value: "bob"},
]

const hairColorButtons = [
  {name: "น้ำตาล", value: "brown"}, 
  {name: "ดำ", value: "black"},
  {name: "ฟ้า", value: "blue"},
  {name: "ขาว", value: "white"},
  {name: "ชมพู", value: "pink"}, 
  {name: "บลอนด์", value: "blonde"},
]

const skinToneButtons = [
  {name: "น้ำตาล", value: "brown"}, 
  {name: "ดำ", value: "black"},
  {name: "เหลือง", value: "yellow"},
  {name: "แดง", value: "red"},
  {name: "สีอ่อน", value:"light"},
  {name: "สีเข้ม", value: "dark"}, 
]

const mouthButtons = [
  {name: "ทาลิป", value: "lips"}, 
  {name: "เคร่งเครียด", value: "serious"},
  {name: "ยิ้มยิงฟัน", value: "grin"},
  {name: "เศร้า", value: "sad"},
  {name: "ยิ้มกว้าง", value:"open"},
  {name: "แลบลิ้น", value: "piercedTongue"},
]

const DATA = [
  {
    type: 'accessory',
    buttons: accessoryButtons,
    title: 'เครื่องประดับ'
  },
  {
    type: 'bgColor',
    buttons: bgColorButtons,
    title: 'สีพื้นหลัง'
  },
  {
    type: 'body',
    buttons: bodyButtons,
    title: 'รูปร่าง'
  },
  {
    type: 'clothing',
    buttons: clothingButtons,
    title: 'เสื้อผ้า'
  },
  {
    type: 'graphic',
    buttons: graphicButtons,
    title: 'ลายเสื้อ'
  },
  {
    type: 'clothingColor',
    buttons: clothingColorButtons,
    title: 'สีเสื้อผ้า'
  },
  {
    type: 'mouth',
    buttons: mouthButtons,
    title: 'ปาก'
  },
  {
    type: 'skinTone',
    buttons: skinToneButtons,
    title: 'สีผิว'
  },
  {
    type: 'eyes',
    buttons: eyesButtons,
    title: 'ตา'
  },
  {
    type: 'eyebrows',
    buttons: eyebrowsButtons,
    title: 'คิ้ว'
  },
  {
    type: 'facialHair',
    buttons: facialHairButtons,
    title: 'หนวด'
  },
  {
    type: 'hair',
    buttons: hairButtons,
    title: 'ทรงผม'
  },
  {
    type: 'hairColor',
    buttons: hairColorButtons,
    title: 'สีผม'
  }
]

const Item = ({item, handleValueChange, initTypes, index}) => (
  <Card
    style={styles.surface}
  >
    <Text
      style={styles.groupCategoryText}
    >
      {item.title}
    </Text>
    <RadioButton.Group
      onValueChange={newValue => handleValueChange(item.type, newValue)}
      value={initTypes[index]}
    >
      {item.buttons.map(b => (
        <Card.Content
          key={b.value} style={styles.innerChoices}
        >
          <RadioButton.Item
            label={b.name} value={b.value} style={styles.radioButtonItems}
          />
        </Card.Content>
            ))}
    </RadioButton.Group>
  </Card>
)
const ITEM_HEIGHT = Dimensions.get('screen').width

const AvatarPreview = ({navigation}) => {

  const user = useSelector(state => state.activeUser.user)
  const {avatarProps} = user
  const {avatarName} = user
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [accessory, setAccessory] = useState(avatarProps.accessory ? avatarProps.accessory : 'none')
  const [bgColor, setBgColor] = useState(avatarProps.bgColor ? avatarProps.bgColor : 'blue')
  const [body, setBody] = useState(avatarProps.body ? avatarProps.body :'breasts')
  const [clothing, setClothing] = useState(avatarProps.clothing ? avatarProps.clothing :'shirt')
  const [clothingColor, setClothingColor] = useState(avatarProps.clothingColor ? avatarProps.clothingColor :'white')
  const [eyebrows, setEyebrows] = useState(avatarProps.eyebrows ? avatarProps.eyebrows :'leftLowered')
  const [eyes, setEyes] = useState(avatarProps.eyes ? avatarProps.eyes :'normal')
  const [facialHair, setFacialHair] = useState(avatarProps.facialHair ? avatarProps.facialHair :'none')
  const [graphic, setGraphic] = useState(avatarProps.graphic ? avatarProps.graphic :'none')
  const [hair, setHair] = useState(avatarProps.hair ? avatarProps.hair :'none')
  const [hairColor, setHairColor] = useState(avatarProps.hairColor ? avatarProps.hairColor :'brown')
  const [skinTone, setSkinTone] = useState(avatarProps.skinTone ? avatarProps.skinTone :'brown')
  const [mouth, setMouth] = useState(avatarProps.mouth ? avatarProps.mouth : 'lips')
  const [name, setName] = useState(avatarName || 'anonymous')

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(user){
      setIsLoading(false)
    }
  }, [user])

  const submitUpdate = async () => {
    if(!name) {
      ToastAndroid.show('Your avatar must have a name', ToastAndroid.SHORT)
    }else{
      const id = user._id
      const avatarProps = {
        hat: 'none',
        hatColor: 'blue',
        lashes: true,
        lipColor: 'pink',
        showBackground: true,
        bgShape: 'squircle',
        accessory,
        bgColor,
        body,
        clothing,
        clothingColor,
        eyebrows,
        eyes,
        facialHair,
        graphic,
        hair,
        hairColor,
        skinTone,
        mouth,
      }
      const avatarName = name
      try {
        dispatch(updateUserAvatar(id, avatarProps, avatarName))
        navigation.navigate("MyQuestions")
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleValueChange = (type, newValue) => {
    switch(type) {
      case 'accessory':
        setAccessory(newValue);
        break;
      case 'bgColor':
        setBgColor(newValue);
        break;
      case 'body':
        setBody(newValue);
        break;
      case 'clothing':
        setClothing(newValue);
        break;
      case 'clothingColor':
        setClothingColor(newValue)
        break;
      case 'eyebrows':
        setEyebrows(newValue);
        break
      case 'eyes':
        setEyes(newValue);
        break;
      case 'facialHair':
        setFacialHair(newValue);
        break;
      case 'graphic':
        setGraphic(newValue);
        break;
      case 'hair':
        setHair(newValue);
        break;
      case 'hairColor':
        setHairColor(newValue);
        break;
      case 'mouth':
        setMouth(newValue);
        break;
      case 'skinTone':
        setSkinTone(newValue)
      }
  }

  const renderItem = ({ item, index }) => {
    const initTypes =  [
      accessory,
      bgColor,
      body,
      clothing,
      clothingColor,
      eyebrows,
      eyes,
      facialHair,
      graphic,
      hair,
      hairColor,
      skinTone,
      mouth,
    ]
    return (
      <View
        style={styles.eachItemContainer}
      >
        <Item
          item={item}
          index={index}
          handleValueChange={handleValueChange}
          initTypes={initTypes}
        />
      </View>
    );
  };

  if(isLoading) {
    return(
      <View
        style={styles.loadingContainer}
      >
        <ActivityIndicator
          size="large" color="pink"
        />
      </View>
    )
  }

  return(
    <View
      style={styles.container}
    >
      <View
        style={styles.previewContainer}
      >
        <TextInput
          style={styles.textInput}
          mode='outlined'
          label="ชื่อ"
          value={name}
          dense
          onChangeText={text => setName(text)}
        />
        <BigHead
          accessory={accessory}
          bgColor={bgColor}
          bgShape="squircle"
          body={body}
          clothing={clothing}
          clothingColor={clothingColor}
          eyebrows={eyebrows}
          eyes={eyes}
          facialHair={facialHair}
          graphic={graphic}
          hair={hair}
          hairColor={hairColor}
          hat="none"
          hatColor="green"
          lashes
          lipColor="pink"
          mouth={mouth}
          showBackground
          size={140}
          skinTone={skinTone}
          containerStyles={styles.avatarPreview}
        />
      </View>
      <View
        style={styles.flatListContainer}
      >
        <FlatList
          data={DATA}
          keyExtractor={item => item.type}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          getItemLayout={(data, index) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})}
          pagingEnabled={true}
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          // onEndReached={() => ToastAndroid.show('Lookin Good! Don`t forget to save', ToastAndroid.SHORT)}
          renderItem={(item, index) => renderItem(item, index)}
          onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          }
        )}
        >
        </FlatList>
      </View>
      <View
        style={styles.dotAndButtonContainer}
      >
        <ExpandingDot
          data={DATA}
          expandingDotWidth={30}
          dotSize={26}
          scrollX={scrollX}
          inActiveDotOpacity={0.3}
          dotStyle={{
        width: 10,
        height: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        marginHorizontal: 5
    }}
          containerStyle={{position: 'relative'}}
        />
        <Button
          mode='contained' style={styles.submitButton} onPress={submitUpdate}
        >
          <Text
            style={styles.submitButtonText}
          >
            บันทึก
          </Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatListContainer: {
    flex: 2,
  },
  eachItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
  },
  surface: {
    padding: 0,
    elevation: 4,
    marginTop: 0,
    height: 240,
    width: 300
  },
  previewContainer: {
    flex: 1,
    paddingBottom: 20
  },
  avatarPreview: {
    alignSelf: 'center',
    marginTop: 0,
    paddingTop: 0,
  },
  textInput: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0
  },
  groupCategoryText: {
    fontSize: 16,
    alignSelf: 'center',
    height: 30
  },
  radioButtonItems: {
    height: 34,
  },
  dotAndButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: 'pink',
    borderRadius: 20,
    width: 300,
    alignSelf: 'center',
    marginBottom: 10
  },
  submitButtonText: {
    alignSelf: 'center',
  }
})
export default AvatarPreview;