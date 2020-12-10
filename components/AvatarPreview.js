import React, {useState} from 'react'
import {View, TouchableHighlight, StyleSheet, ScrollView} from 'react-native'
import {RadioButton, Text, Divider} from 'react-native-paper'
import {BigHead} from 'react-native-bigheads'

const AvatarPreview = () => {
  const [accessory, setAccessory] = useState('none')
  const [bgColor, setBgColor] = useState('blue')
  const [body, setBody] = useState('breasts')
  const [clothing, setClothing] = useState('shirt')
  const [clothingColor, setClothingColor] = useState('white')
  const [eyebrows, setEyebrows] = useState('leftLowered')
  const [eyes, setEyes] = useState('normal')
  const [facialHair, setFacialHair] = useState('none')

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
    {name: "hearts", value: "hearts"}, 
    {name: "crazy", value: "crazy"},
    {name: "cute", value: "cute"},
    {name: "pirate", value: "piratePatch"},
    {name: "cyborg", value:"cyborg"},
  ]

  const facialHairButtons = [
    {name: "none", value: "none"}, 
    {name: "stubble", value: "stubble"},
    {name: "beard", value: "mediumBeard"},
    {name: "goatee", value: "goatee"},
  ]
  return(
    <View style={styles.container}>
      <View styles={styles.preview}>
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
graphic="none"
hair="long"
hairColor="black"
hat="party"
hatColor="green"
lashes={true}
lipColor="pink"
mouth="lips"
showBackground={true}
size={200}
skinTone="brown"
/>
</View>


<ScrollView>

<Text style={styles.groupCategoryText}>
  Choose an accessory:
</Text>

<RadioButton.Group
onValueChange={newValue => setAccessory(newValue)}
value={accessory}
>
{accessoryButtons.map(b => <ScrollView key={b.value}>
  <RadioButton.Item label={b.name}value={b.value}/>
</ScrollView>)}
</RadioButton.Group>

<Divider style={styles.divider}/>

<Text style={styles.groupCategoryText}>
  Choose a background color:
</Text>
<RadioButton.Group
onValueChange={newValue => setBgColor(newValue)}
value={bgColor}
>
{bgColorButtons.map(b => <ScrollView key={b.value}>
  <RadioButton.Item label={b.name}value={b.value}/>
</ScrollView>)}
</RadioButton.Group>

<Text style={styles.groupCategoryText}>
  Choose body type:
</Text>

<RadioButton.Group
onValueChange={newValue => setBody(newValue)}
value={body}
>
{bodyButtons.map(b => <ScrollView key={b.value}>
  <RadioButton.Item label={b.name}value={b.value}/>
</ScrollView>)}
</RadioButton.Group>

<Divider style={styles.divider}/>

<Text style={styles.groupCategoryText}>
  Choose clothing type:
</Text>

<RadioButton.Group
onValueChange={newValue => setClothing(newValue)}
value={clothing}
>
{clothingButtons.map(b => <ScrollView key={b.value}>
  <RadioButton.Item label={b.name}value={b.value}/>
</ScrollView>)}
</RadioButton.Group>

<Divider style={styles.divider}/>

<Text style={styles.groupCategoryText}>
  Choose clothing color:
</Text>

<RadioButton.Group
onValueChange={newValue => setClothingColor(newValue)}
value={clothingColor}
>
{clothingColorButtons.map(b => <ScrollView key={b.value}>
  <RadioButton.Item label={b.name}value={b.value}/>
</ScrollView>)}
</RadioButton.Group>

<Divider style={styles.divider}/>

<Text style={styles.groupCategoryText}>
  Choose eyebrows:
</Text>

<RadioButton.Group
onValueChange={newValue => setEyebrows(newValue)}
value={eyebrows}
>
{eyebrowsButtons.map(b => <ScrollView key={b.value}>
  <RadioButton.Item label={b.name}value={b.value}/>
</ScrollView>)}
</RadioButton.Group>

<Divider style={styles.divider}/>

<Text style={styles.groupCategoryText}>
  Choose eyes:
</Text>

<RadioButton.Group
onValueChange={newValue => setEyes(newValue)}
value={eyes}
>
{eyesButtons.map(b => <ScrollView key={b.value}>
  <RadioButton.Item label={b.name}value={b.value}/>
</ScrollView>)}
</RadioButton.Group>

<Divider style={styles.divider}/>

<Text style={styles.groupCategoryText}>
  Choose facial hair:
</Text>

<RadioButton.Group
onValueChange={newValue => setFacialHair(newValue)}
value={facialHair}
>
{facialHairButtons.map(b => <ScrollView key={b.value}>
  <RadioButton.Item label={b.name}value={b.value}/>
</ScrollView>)}
</RadioButton.Group>

<Divider style={styles.divider}/>


</ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview : {
    flex: 1
  },
  groupCategoryText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  }
})
export default AvatarPreview;