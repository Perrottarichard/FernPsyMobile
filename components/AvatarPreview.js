import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, TouchableHighlight, StyleSheet, ScrollView, ToastAndroid} from 'react-native'
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
    {name: "none", value: "none"},
    {name: "hoop earrings", value: "hoopEarrings"}, 
    {name: "round glasses", value: "roundGlasses"},
    {name: "tiny glasses", value: "tinyGlasses"},
    {name: "shades", value:"shades"},
    {name: "face mask", value: "faceMask"}
  ]
  const bgColorButtons = [
    {name: "blue", value: "blue"}, 
    {name: "green", value: "green"},
    {name: "red", value: "red"},
    {name: "orange", value: "orange"},
    {name: "yellow", value:"yellow"},
    {name: "pink", value: "pink"}
  ]
  const bodyButtons = [
    {name: "boobs", value: "breasts"},
    {name: "chest", value: "chest"}
  ]

  const clothingButtons = [
    {name: "shirt", value: "blue"}, 
    {name: "naked", value: "naked"},
    {name: "denim jacket", value: "denimJacket"},
    {name: "hoodie", value: "hoodie"},
    {name: "tank top", value:"tankTop"},
    {name: "dress", value: "dress"}
  ]

  const clothingColorButtons = [
    {name: "white", value: "white"}, 
    {name: "blue", value: "blue"},
    {name: "green", value: "green"},
    {name: "red", value: "red"},
    {name: "black", value:"black"},
  ]

  const eyebrowsButtons = [
    {name: "left lowered", value: "leftLowered"}, 
    {name: "raised", value: "raised"},
    {name: "serious", value: "serious"},
    {name: "angry", value: "angry"},
    {name: "concerned", value:"concerned"},
  ]

  const eyesButtons = [
    {name: "normal", value: "normal"}, 
    {name: "stars", value: "stars"},
    {name: "happy", value: "happy"},
    {name: "squint", value: "squint"},
    {name: "wink", value:"wink"},
    {name: "cute", value: "cute"},
  ]

  const facialHairButtons = [
    {name: "none", value: "none"}, 
    {name: "stubble", value: "stubble"},
    {name: "beard", value: "mediumBeard"},
    {name: "goatee", value: "goatee"},
  ]

  const graphicButtons = [
    {name: "none", value: "none"}, 
    {name: "donut", value: "donut"},
    {name: "rainbow", value: "rainbow"},
  ]


  const hairButtons = [
    {name: "none", value: "none"}, 
    {name: "long", value: "long"},
    {name: "short", value: "short"},
    {name: "bun", value: "bun"},
    {name: "pixie", value:"pixie"},
    {name: "bob", value: "bob"},
  ]

  const hairColorButtons = [
    {name: "brown", value: "brown"}, 
    {name: "black", value: "black"},
    {name: "blue", value: "blue"},
    {name: "white", value: "white"},
    {name: "pink", value: "pink"}, 
    {name: "blonde", value: "blonde"},
  ]

  const skinToneButtons = [
    {name: "brown", value: "brown"}, 
    {name: "black", value: "black"},
    {name: "yellow", value: "yellow"},
    {name: "red", value: "red"},
    {name: "light", value:"light"},
    {name: "dark", value: "dark"}, 
  ]

  const mouthButtons = [
    {name: "lips", value: "lips"}, 
    {name: "serious", value: "serious"},
    {name: "grin", value: "grin"},
    {name: "sad", value: "sad"},
    {name: "open", value:"open"},
    {name: "pierced tongue", value: "piercedTongue"},
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
      label="Name"
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
  Skin tone:
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
  Mouth:
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
  Accessory:
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
  Background color:
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
  Body type:
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
  Clothing type:
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
  Clothing color:
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
  Eyebrows:
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
  Eyes:
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
  Facial hair:
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
  Shirt graphic:
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
  Hair style:
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
  Hair color:
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
    Save
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
    // paddingLeft: 50,
    // paddingRight: 50
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