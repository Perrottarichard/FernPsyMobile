import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, ScrollView, Dimensions, ToastAndroid, StyleSheet} from 'react-native'
import {Text, useTheme, Button, RadioButton} from 'react-native-paper'
import Slider from '@react-native-community/slider'
import {LineChart} from 'react-native-chart-kit'
import {addMood} from '../reducers/activeUserReducer'
import { DateTime } from 'luxon'
import DataGraphic from '../assets/undraw_visual_data_b1wx.svg'

const moodsDaily = (moods) => {
  let tempMoods = [...moods]
  let moodNumsOnly = tempMoods.map(m => m.mood)
  if(moodNumsOnly.length <= 7){
    return moodNumsOnly
  }else{
    return moodNumsOnly.slice(moodNumsOnly.length - 7);
  }
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

const daysThisWeek = (moods) => {
  let tempMoods = [...moods]
  let tempDates = tempMoods.map(m => `${DateTime.fromISO(m.date).day}/${DateTime.fromISO(m.date).month}`)
  if(tempDates.length <= 7){
    return tempDates
  }else{
    return tempDates.slice(tempDates.length - 7);
  }
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
  const [timesToShow, setTimesToShow] = useState(daysThisWeek(moodsForChart)) 

  const dailyM = React.useCallback(() => {
    return moodsDaily(moodsForChart)
  }, [moodsForChart])

  const weeklyM = React.useCallback(() => {
    return moodsWeekly(moodsForChart)
  }, [moodsForChart])

  const monthlyM = React.useCallback(() => {
   return moodsMonthly(moodsForChart)
  }, [moodsForChart])

  const [dataToShow, setDataToShow] = useState(dailyM())

  const chosenInterval = (interval) => {
    switch(interval){
      case 'month':
        if(user.moods.length < 30){
          return ToastAndroid.show('Not enough data yet', ToastAndroid.SHORT)
        }else{
        setDisplayInterval('month');
        setDataToShow(weeklyM())
        setTimesToShow(weeksThisMonth())
        }
        break;
      case 'year':
        if(user.moods.length < 90){
          return ToastAndroid.show('Not enough data yet', ToastAndroid.SHORT)
        }
        setDisplayInterval('year');
        setDataToShow(monthlyM())
        setTimesToShow(monthsThisYear())
        break;
      default:
        setDisplayInterval('week')
        setDataToShow(dailyM())
        setTimesToShow(daysThisWeek())
    }
  }

  const submitMood = () => {
    let today = DateTime.local();
    let getDayNumber = DateTime.fromISO(moodsForChart[moodsForChart.length - 1].date).day
    if(today.day === getDayNumber){
      ToastAndroid.show('You already added your mood today', ToastAndroid.SHORT)
    }else{
      dispatch(addMood(moodValue))
      let moodDataCopy = [...dataToShow, moodValue]
      if(moodDataCopy.length <= 7){
        setDataToShow(moodDataCopy)
      }else{
        setDataToShow(moodDataCopy.slice(moodDataCopy.length - 7))
      }
      let newDayFormatted = `${today.day}/${today.month}`
      let weekDisplayCopy = [...timesToShow, newDayFormatted]
      if(weekDisplayCopy.length <= 7){
        setTimesToShow(weekDisplayCopy)
      }else{
        setTimesToShow(weekDisplayCopy.slice(weekDisplayCopy.length - 7))
      }
    }
  }

  return(
    <ScrollView
      contentContainerStyle={styles.container}>
      <View
        style={styles.chartContainer}>
        {user.moods.length > 0 ?
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
      color: () => 'lightpink',
      labelColor: () => theme.colors.onSurface,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6",
        fill: theme.colors.accent
      }
    }}
            bezier
          // eslint-disable-next-line react-native/no-inline-styles
            style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
: <View
    style={styles.chartContainer}><Text
      style={styles.noDataYetDailyText}>Not enough data yet</Text>
  <DataGraphic
    height={180} width={180}/>
</View>}

      </View>
      <View
        style={styles.radioContainer}>
        <RadioButton.Group
          onValueChange={newValue => chosenInterval(newValue)} 
          value={displayInterval}
           
          >
          <View
            style={styles.radioButtons}>
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
      <View
        style={styles.howDoYouFeel}>
        <Text
          style={styles.howDoYouFeelText}>How do you feel today?</Text>
      </View>
      <View
        style={{...styles.moodValueContainer, borderColor: theme.colors.onSurface}}>
        <Text
          style={styles.moodValueText}>{moodValue}</Text>
      </View>
      <View
        style={styles.sliderContainer}>
        <Slider
        // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 300, height: 40, alignSelf: 'center'}}
          minimumValue={0}
          maximumValue={5}
          step={0.5}
          minimumTrackTintColor={'lightpink'}
          maximumTrackTintColor={'lightgray'}
          onValueChange={value => setMoodValue(value)}
          thumbTintColor={theme.colors.accent}
          value={2.5}
      />
        <Button
          onPress={submitMood}
          style={styles.sliderButton}>
          <Text
            style={styles.sliderButtonText}>
            Save
          </Text>
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataYetDailyText: {
    alignSelf: 'center', 
  },
  chartContainer: {
    flex: 2,
    marginTop: 20,
  },
  radioContainer: {
    flex: 0.6
  },
  radioButtons: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly',
  },
  radioText: {
    marginTop: 7,
    paddingLeft: 20,
    marginRight: 0,
    fontSize: 12,
  },
  howDoYouFeel: {
    flex: 0.20,
  },
  howDoYouFeelText: {
    fontSize: 18
  },
  moodValueContainer: {
    flex: 0.4,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
    width: 70,
    height: 90,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  moodValueText: {
    fontSize: 28,
  },
  sliderContainer: {
    flex: 1.5,
    marginTop: 20,
  },
  sliderButton: {
      alignSelf: 'center',
      borderRadius: 20,
      width: 300,
      backgroundColor: 'lightpink',
      marginBottom: 10,
      marginTop: 15
    },
  sliderButtonText: {
    color: 'black',
    alignSelf: 'center'
  }
})
export default MoodTracker;