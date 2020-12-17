import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { setTagFilter } from '../reducers/forumReducer';

const tagOptions = [
  { tag: 'ทั้งหมด', backgroundColor: '#957bb3', icon: 'globe' },
  { tag: 'เรื่องเพศ', backgroundColor: '#ff5c4d', icon: 'venus-mars' },
  { tag: 'การออกเดท', backgroundColor: '#63ba90', icon: 'glass-cheers' },
  { tag: 'ความรัก', backgroundColor: '#ffa64d', icon: 'heart-broken' },
  { tag: 'lgbt', backgroundColor: '#ff4da6', icon: 'transgender' },
  { tag: 'เพื่อน', backgroundColor: '#5050ff', icon: 'users' },
  { tag: 'โรคซึมเศร้า', backgroundColor: '#343a40', icon: 'sad-tear' },
  { tag: 'ความวิตกกังวล', backgroundColor: '#5e320f', icon: 'flushed' },
  { tag: 'ไบโพลาร์', backgroundColor: '#f347ff', icon: 'theater-masks' },
  { tag: 'การทำงาน', backgroundColor: '#8e2bff', icon: 'business-time' },
  { tag: 'สุขภาพจิต', backgroundColor: '#1e45a8', icon: 'brain' },
  { tag: 'การรังแก', backgroundColor: '#5e320f', icon: 'angry' },
  { tag: 'ครอบครัว', backgroundColor: '#ffa64d', icon: 'home' },
  { tag: 'อื่นๆ', backgroundColor: '#707571', icon: 'question-circle' },
  { tag: 'การเสพติด', backgroundColor: '#40073d', icon: 'syringe' },

];
const chooseTagColor = (passed) => {
  const color = tagOptions.find((t) => t.tag === passed);
  return color.backgroundColor;
};
const chooseTagIcon = (passed) => {
  const chosen = tagOptions.find((t) => t.tag === passed);
  return chosen.icon;
};

const ForumLandingPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const clickTag = (t) => {
    dispatch(setTagFilter(t.tag));
    if (t.tag === 'ทั้งหมด') {
      navigation.navigate('ForumDisplayAll', { tag: t.tag });
    } else {
      navigation.navigate('SingleTagDisplay', { tag: t.tag });
    }
  };
  return (
    <View
      style={styles.outerView}
    >
      <ScrollView>
        {tagOptions.map((t) => (
          <View
            key={t.tag} style={styles.cardView}
          >
            <Card
              containerStyle={styles.cardCard}
            >
              <Icon.Button
                onPress={() => clickTag(t)}
                name={chooseTagIcon(t.tag)}
                size={30}
                color={chooseTagColor(t.tag)}
                style={styles.iconButton}
              >
                <Text
                  style={dynamicTagColor(t.tag)}
                >{t.tag}
                </Text>
              </Icon.Button>
            </Card>
          </View>
        ))}
      </ScrollView>
      <View>
        <Text><Icon
          name="code" type="fontawesome"
        />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#d896ac'
  },
  cardView: {
    alignItems: 'center'
  },
  cardCard: {
    borderRadius: 10
  },
  iconButton: {
    backgroundColor: 'white', 
    width: 280, 
    height: 50, 
    justifyContent: 'flex-start'
  }
})

const dynamicTagColor = (tag) => {
  return {
    fontSize: 20,
    color: chooseTagColor(tag)
  }
}
export default ForumLandingPage;
