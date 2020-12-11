import React from 'react'
import {ScrollView, View, Text} from 'react-native'
import {Card, Badge} from 'react-native-elements'

const tagColorOptions = [

  { tag: 'ปัญหาเรื่องเพศ', backgroundColor: '#ff5c4d' },
  { tag: 'การออกเดท', backgroundColor: '#288046' },
  { tag: 'relationships', backgroundColor: '#ffa64d' },
  { tag: 'lgbt', backgroundColor: '#ff4da6' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8' },
  { tag: 'bullying', backgroundColor: '#5e320f' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d' },
  { tag: 'อื่นๆ', backgroundColor: '#707571' },
  { tag: 'การเสพติด', backgroundColor: '#40073d' },

];

const chooseTagColor = (passed) => {
  const color = tagColorOptions.find((t) => t.tag === passed);
  if (color) {
    return color.backgroundColor;
  }
  return 'magenta';
};

const MyPending = ({navigation, route}) => {
  const myPendingPosts = route.params
  return(
    <ScrollView>
    {myPendingPosts.myPendingPosts.map((f) => (
      <View key={f._id}>
        <Card>
          <Card.Title>
            {f.title}
            <Text>{f.likes}</Text>
            <Text>{f.date ? f.date.slice(0, 10) : 'unknown'}</Text>
          </Card.Title>
          <Text>
            {f.question}
          </Text>
          <Text>
            คำถามของคุณอยู่ระหว่างดำเนินการ
          </Text>
          <View>
            {f.tags.map((t) => <Badge key={t} badgeStyle={{ backgroundColor: chooseTagColor(t) }} value={t} />)}
          </View>
        </Card>
      </View>
    ))}
    </ScrollView>
  )
}

export default MyPending;