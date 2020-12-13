import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, StyleSheet, ScrollView, ToastAndroid} from 'react-native'
import {RadioButton, Text, Surface, TextInput, Button} from 'react-native-paper'
import {BigHead} from 'react-native-bigheads'
import {updateUserAvatar} from '../reducers/activeUserReducer'


const AvatarPreview = ({navigation}) => {

  const user = useSelector(state => state.activeUser)
  const avatarProps = user.avatarProps
  const avatarName = user.avatarName
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
  const [name, setName] = useState(avatarName ? avatarName : 'anonymous')

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
    {name: "เสื้อเชิ้ต", value: "blue"}, 
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

  const submitUpdate = async () => {
    if(!name) {
      ToastAndroid.show('Your avatar must have a name', ToastAndroid.SHORT)
    }else{
    let id = user._id
    let avatarProps = {
      hat: 'none',
      hatColor: 'blue',
      lashes: true,
      lipColor: 'pink',
      showBackground: true,
      bgShape: 'squircle',
      accessory: accessory,
      bgColor: bgColor,
      body: body,
      clothing: clothing,
      clothingColor: clothingColor,
      eyebrows: eyebrows,
      eyes: eyes,
      facialHair: facialHair,
      graphic: graphic,
      hair: hair,
      hairColor: hairColor,
      skinTone: skinTone,
      mouth: mouth,
    }
    let avatarName = name
    try {
      dispatch(updateUserAvatar(id, avatarProps, avatarName))
      navigation.navigate("MyQuestions")
    } catch (error) {
      console.log(error)
    }
  }
}
  return(
    <View style={styles.container}>
      <TextInput
      style={styles.textInput}
      mode='outlined'
      label="ชื่อ"
      value={name}
      dense={true}
      onChangeText={text => setName(text)}
    />
      <View styles={styles.previewContainer}>
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
lashes={true}
lipColor="pink"
mouth={mouth}
showBackground={true}
size={140}
skinTone={skinTone}
containerStyles={styles.avatarPreview}
/>
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  สีผิว:
</Text>
<RadioButton.Group
onValueChange={newValue => setSkinTone(newValue)}
value={skinTone}
>
{skinToneButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
 
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
  
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  ปาก:
</Text>
<RadioButton.Group
onValueChange={newValue => setMouth(newValue)}
value={mouth}
>
{mouthButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  เครื่องประดับ:
</Text>
<RadioButton.Group
onValueChange={newValue => setAccessory(newValue)}
value={accessory}
>
{accessoryButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  สีพื้นหลัง:
</Text>
<RadioButton.Group
onValueChange={newValue => setBgColor(newValue)}
value={bgColor}
>
{bgColorButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  รูปร่าง:
</Text>
<RadioButton.Group
onValueChange={newValue => setBody(newValue)}
value={body}
>
{bodyButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  เสื้อผ้า:
</Text>
<RadioButton.Group
onValueChange={newValue => setClothing(newValue)}
value={clothing}
>
{clothingButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  สีเสื้อผ้า:
</Text>
<RadioButton.Group
onValueChange={newValue => setClothingColor(newValue)}
value={clothingColor}
>
{clothingColorButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  คิ้ว:
</Text>
<RadioButton.Group
onValueChange={newValue => setEyebrows(newValue)}
value={eyebrows}
>
{eyebrowsButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  ตา:
</Text>
<RadioButton.Group
onValueChange={newValue => setEyes(newValue)}
value={eyes}
>
{eyesButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  หนวด:
</Text>
<RadioButton.Group
onValueChange={newValue => setFacialHair(newValue)}
value={facialHair}
>
{facialHairButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  ลายเสื้อ:
</Text>
<RadioButton.Group
onValueChange={newValue => setGraphic(newValue)}
value={graphic}
>
{graphicButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  ทรงผม:
</Text>
<RadioButton.Group
onValueChange={newValue => setHair(newValue)}
value={hair}
>
{hairButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

<Surface style={styles.surface}>
<Text style={styles.groupCategoryText}>
  สีผม:
</Text>
<RadioButton.Group
onValueChange={newValue => setHairColor(newValue)}
value={hairColor}
>
{hairColorButtons.map(b => <ScrollView key={b.value} style={styles.innerChoices}>
  <RadioButton.Item label={b.name}value={b.value} style={styles.radioButtonItems}/>
</ScrollView>)}
</RadioButton.Group>
</Surface>

</ScrollView>
<Button mode='contained'style={styles.submitButton}onPress={submitUpdate}>
  <Text style={styles.submitButtonText}>
    บันทึก
  </Text>
</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  surface: {
    padding: 0,
    elevation: 4,
    marginTop: 0,
    marginLeft: 10,
    marginRight:10,
    borderRadius: 10,
    height: 220,
    width: 200
  },
  previewContainer : {
    flex: 1,
  },
  avatarPreview: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 0,
    paddingTop: 0
  },
  textInput: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0
  },
  groupCategoryText: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#474747',
    color: 'white',
    paddingLeft: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontVariant: ['small-caps'],
    height: 30
  },
  innerChoices: {
    // color: 'gray'
  },
  radioButtonItems: {
    height: 30
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
    fontWeight: 'bold'
  }
})
export default AvatarPreview;