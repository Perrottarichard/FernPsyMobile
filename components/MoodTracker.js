import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, ScrollView, Dimensions, ToastAndroid, StyleSheet} from 'react-native'
import {Text, useTheme, Button, RadioButton} from 'react-native-paper'
import Slider from '@react-native-community/slider'
import {LineChart} from 'react-native-chart-kit'
import {addMood} from '../reducers/activeUserReducer'
import { DateTime } from 'luxon'

const moodsDaily = (moods) => {
  let weekArr = []
  let tempMoods = [...moods]
  for(let i = tempMoods.length - 1; i > tempMoods.length - 8; i--){
    weekArr.push(tempMoods[i])
  }
  let x = weekArr.map(z => z === undefined ? {mood: 0} : z)
  return x.map(d => d?.mood).reverse()
}

const moodsWeekly = (moods) => {
  let monthArr = []
  let tempMoods = [...moods]
  for(let i = 0; i < 36; i++){
    if(tempMoods[i] === undefined){
      tempMoods[i] = {mood: 0}
    }
  }
  let sum = 0;
  for(let i = tempMoods.length - 1; i > tempMoods.length - 36; i--){
    sum += tempMoods[i].mood
    if(i === 0 || i % 5 === 0){
      let av = sum / 5
      monthArr.push(av)
      av = 0
      sum = 0
    }
  }
  monthArr.forEach(n => Number(n))
  return monthArr;
}

const moodsMonthly = (moods) => {
  let yearArr = []
  for(let i = moods.length - 1; i > moods.length - 366; i--){
    yearArr.push(moods[i])
  }
  return yearArr.filter(d => d?.mood).reverse()
}

const daysThisWeek = () => {
  let daysArr = []
  let today = DateTime.local()
  let dayNum = today.day
  let monthNum = today.month
  for(let i = 0; i < 7; i++) {
    daysArr[i] = `${dayNum - i}/${monthNum}`
  }
  return daysArr.reverse();
}

const weeksThisMonth = () => {
  let weeksArr = []
  let today = DateTime.local()
  let weekNum = today.weekNumber
  for(let i = 0; i < 7; i++) {
    weeksArr[i] = `${weekNum - i}`
  }
  return weeksArr.reverse()
}

const monthsThisYear = () => {
  let monthsArr = []
  let today = DateTime.local()
  for(let i = 0; i < 7; i++) {
    monthsArr[i] = today.minus({months: i}).monthShort
  }
  return monthsArr.reverse()
}

const MoodTracker = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(state => state.activeUser.user);
  let moodsForChart = user.moods
  const [moodValue, setMoodValue] = useState(2.5)
  const [displayInterval, setDisplayInterval] = useState('week')
  const [dataToShow, setDataToShow] = useState(moodsDaily(moodsForChart))
  const [timesToShow, setTimesToShow] = useState(daysThisWeek())

  const chosenInterval = (interval) => {
    switch(interval){
      case 'month':
        if(user.moods.length < 30){
          return ToastAndroid.show('Not enough data yet', ToastAndroid.SHORT)
        }else{
        setDisplayInterval('month');
        setDataToShow(moodsWeekly(moodsForChart))
        setTimesToShow(weeksThisMonth())
        }
        break;
      case 'year':
        if(user.moods.length < 90){
          return ToastAndroid.show('Not enough data yet', ToastAndroid.SHORT)
        }
        setDisplayInterval('year');
        setDataToShow(moodsMonthly(moodsForChart))
        setTimesToShow(monthsThisYear())
        break;
      default:
        setDisplayInterval('week')
        setDataToShow(moodsDaily(moodsForChart))
        setTimesToShow(daysThisWeek())
    }
  }

  const submitMood = () => {
    let today = DateTime.local().day;
    let mostRecentMood = user.moods[user.moods.length - 1]
    let getDayNumber = new DateTime(mostRecentMood.date).day
    if(today === getDayNumber){
      ToastAndroid.show('You already added your mood today', ToastAndroid.SHORT)
    }else{
      dispatch(addMood(moodValue))
    }
  }

  return(
    <ScrollView>
      <View>
        <LineChart
          data={{
      labels: timesToShow,
      datasets: [
        {
          data: dataToShow
        }
      ]
    }}
          width={Dimensions.get("window").width}
          height={220}
          withInnerLines={false}
          fromZero={true}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
      backgroundColor: 'lightpink',
      backgroundGradientFrom: theme.colors.background,
      backgroundGradientTo: theme.colors.surface,
      decimalPlaces: 1,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6",
        fill: 'lightpink'
      }
    }}
          bezier
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        <View>
          <RadioButton.Group
            onValueChange={newValue => chosenInterval(newValue)} 
            value={displayInterval}
           
          >
            <View
              style={styles.radioContainer}>
              <Text
                style={styles.radioText}>Daily</Text>
              <RadioButton
                value="week" />
              <Text
                style={styles.radioText}>Weekly</Text>
              <RadioButton
                value="month" />
              <Text
                style={styles.radioText}>Monthly</Text>
              <RadioButton
                value="year" />
            </View>
          </RadioButton.Group>
        </View>
      </View>
      <Text>{moodValue}</Text>
      <Slider
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: 300, height: 40, alignSelf: 'center'}}
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.accent}
        onValueChange={value => setMoodValue(value)}
        value={2.5}
      />
      <Button
        onPress={submitMood}>
        <Text>
          Save
        </Text>
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  radioText: {
    marginTop: 7,
    paddingLeft: 20,
    marginRight: 0,
    fontSize: 12
  }
})
export default MoodTracker;