/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {View, ScrollView, Dimensions, ToastAndroid, StyleSheet} from 'react-native'
import {Text, useTheme, Button, RadioButton, Provider, Portal} from 'react-native-paper'
import Slider from '@react-native-community/slider'
import {LineChart, PieChart} from 'react-native-chart-kit'
import {addMood, addPoints, levelUp} from '../reducers/activeUserReducer'
import { DateTime } from 'luxon'
import DataGraphic from '../assets/undraw_visual_data_b1wx.svg'
import {shouldLevelUp} from '../helperFunctions'
import LottieView from 'lottie-react-native'
import LevelUpAnimationModal from './LevelUpAnimationModal'


const moodsDaily = (moods) => {
  let tempMoods = [...moods]
  let moodNumsOnly = tempMoods.map(m => m.mood)
  if(moodNumsOnly.length <= 7){
    return moodNumsOnly
  }else{
    return moodNumsOnly.slice(moodNumsOnly.length - 7);
  }
}

const getPieData = (moods) => {
  let tempMoods = [...moods]
  let veryGoodMoodObjs = tempMoods.filter(m => m.mood === 5).length
  let goodMoodObjs = tempMoods.filter(m => m.mood === 4).length
  let normalMoodObjs = tempMoods.filter(m => m.mood === 3).length
  let notGoodMoodObjs = tempMoods.filter(m => m.mood === 2).length
  let badMoodObjs = tempMoods.filter(m => m.mood === 1).length

  const pieDataArray = [
    {
      name: "Very Good",
      count: veryGoodMoodObjs,
      color: "#f5586f",
      legendFontColor: "gray",
      legendFontSize: 12 
    },
    {
      name: "Good",
      count: goodMoodObjs,
      color: "#ff8592",
      legendFontColor: "gray",
      legendFontSize: 12 
    },
    {
      name: "Normal",
      count: normalMoodObjs,
      color: "#FFB6C1",
      legendFontColor: "gray",
      legendFontSize: 12 
    },
    {
      name: "Not Good",
      count: notGoodMoodObjs,
      color: "#c2a9ab",
      legendFontColor: "gray",
      legendFontSize: 12 
    },
    {
      name: "Bad",
      count: badMoodObjs,
      color: "#42393a",
      legendFontColor: "gray",
      legendFontSize: 12 
    }
  ];
  return pieDataArray;
};

const daysThisWeek = (moods) => {
  let tempMoods = [...moods]
  let tempDates = tempMoods.map(m => `${DateTime.fromISO(m.date).day}/${DateTime.fromISO(m.date).month}`)
  if(tempDates.length <= 7){
    return tempDates
  }else{
    return tempDates.slice(tempDates.length - 7);
  }
}

const MoodTracker = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(state => state.activeUser.user);
  const userPoints = useSelector(state => state.activeUser.userPoints);
  const userLevel = useSelector(state => state.activeUser.userLevel);
  let moodsForChart = user.moods
  const [moodValue, setMoodValue] = useState(3)
  const [showLevelUpAnimation, setShowLevelUpAnimation] = useState(false)

  //for line chart display 'This week'
  const [displayType, setDisplayType] = useState('All')
  const [timesToShow, setTimesToShow] = useState(daysThisWeek(moodsForChart)) 

  const dailyM = React.useCallback(() => {
    return moodsDaily(moodsForChart)
  }, [moodsForChart])

  const [dataToShow, setDataToShow] = useState(dailyM())

  //for pie chart display 'All'
  getPieData(moodsForChart)

  const chosenType = (type) => {
    switch(type){
      case 'This week':
        setDisplayType('This week')
        setDataToShow(dailyM())
        setTimesToShow(daysThisWeek(moodsForChart))
        break;
      default:
        setDisplayType('All')
    }
  }

  const submitMood = () => {
    let today = DateTime.local();
    if(moodsForChart.length === 0){
      dispatch(addMood(moodValue))
      dispatch(addPoints(user._id, 1))
      if(shouldLevelUp(userPoints, userLevel, 1)){
        dispatch(levelUp(user._id))
        setShowLevelUpAnimation(true)
        setTimeout(() => {
          setShowLevelUpAnimation(false)
        }, 2500);
        }

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
    }else{
        let getDayNumber = DateTime.fromISO(moodsForChart[moodsForChart.length - 1].date).day
        if(today.day === getDayNumber){
        ToastAndroid.show('You already added your mood today', ToastAndroid.SHORT)
        }else{
        dispatch(addMood(moodValue))
        dispatch(addPoints(user._id, 1))
        
        if(shouldLevelUp(userPoints, userLevel, 1)){
        dispatch(levelUp(user._id))
        setShowLevelUpAnimation(true)
        setTimeout(() => {
          setShowLevelUpAnimation(false)
        }, 2500);
        }

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
  }
  if(user.moods.length === 0) {
    return(
      <ScrollView
        contentContainerStyle={styles.container}>
        <View
          style={{...styles.chartContainer, opacity: showLevelUpAnimation ? 0.2 : 1}}><Text
            style={styles.noDataYetDailyText}>Not enough data yet</Text>
          <DataGraphic
            height={180} width={180}/>
        </View>
        <View
          style={styles.radioContainer}>
          <RadioButton.Group
            onValueChange={newValue => chosenType(newValue)} 
            value={displayType}
        >
            <View
              style={styles.radioButtons}>
              <View
                style={styles.eachRadioButton}>
                <Text
                  style={styles.radioText}>All</Text>
                <RadioButton
                  value="All"
                  color={theme.colors.primary} />
              </View>
              <View
                style={styles.eachRadioButton}>
                <Text
                  style={styles.radioText}>This week</Text>
                <RadioButton
                  value="This week"
                  color={theme.colors.primary} />
              </View>
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
            minimumValue={1}
            maximumValue={5}
            step={1}
            minimumTrackTintColor={'lightpink'}
            maximumTrackTintColor={'lightgray'}
            onValueChange={value => setMoodValue(value)}
            thumbTintColor={theme.colors.accent}
            value={3}
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

  return(
    <Provider>
      <ScrollView
        contentContainerStyle={styles.container}>
        {showLevelUpAnimation ?
          <Portal>
            <LevelUpAnimationModal/>
          </Portal>
      : null}
        <View
          style={{...styles.chartContainer, opacity: showLevelUpAnimation ? 0.1 : 1}}>
        
          {displayType === 'This week' ?
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
              yLabelsOffset={8}
              formatYLabel={(num) => {
              if(num === '5.0'){
                return 'Very Good'
              }else if(num === '4.0'){
                return 'Good'
              }else if (num === '3.0') {
                return 'Normal'
              }else if(num === '2.0') {
                return 'Not Good'
              }else if(num === '1.0'){
                return 'Bad'
              }else{
                return ''
              }
            }}
              yAxisInterval={1}
              chartConfig={{
      backgroundColor: 'lightpink',
      backgroundGradientFrom: theme.colors.background,
      backgroundGradientTo: theme.colors.surface,
      decimalPlaces: 1,
      propsForHorizontalLabels: {fontSize: 10},
      propsForVerticalLabels: {fontSize: 10},
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
          // eslint-disable-next-line react-native/no-inline-styles
              style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
: <PieChart
    data={getPieData(moodsForChart)}
    width={Dimensions.get("window").width}
    height={220}
    chartConfig={{
      color: () => 'lightpink',
      labelColor: () => theme.colors.onSurface,
    }}
    accessor={'count'}
    backgroundColor={"transparent"}
    paddingLeft={"15"}
    center={[10, 0]}
    absolute
/>}

        </View>
        <View
          style={{...styles.radioContainer, opacity: showLevelUpAnimation ? 0.1 : 1}}>
          <RadioButton.Group
            onValueChange={newValue => chosenType(newValue)} 
            value={displayType}
          >
            <View
              style={styles.radioButtons}>
              <View
                style={styles.eachRadioButton}>
                <Text
                  style={styles.radioText}>All</Text>
                <RadioButton
                  color={theme.colors.primary}
                  value="All" />
              </View>
              <View
                style={styles.eachRadioButton}>
                <Text
                  style={styles.radioText}>This week</Text>
                <RadioButton
                  color={theme.colors.primary}
                  value="This week" />
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View
          style={{...styles.howDoYouFeel, opacity: showLevelUpAnimation ? 0.1 : 1}}>
          <Text
            style={styles.howDoYouFeelText}>How do you feel today?</Text>
        </View>
        <View
          style={{...styles.moodValueContainer, borderColor: theme.colors.onSurface, opacity: showLevelUpAnimation ? 0.1 : 1}}>
          <Text
            style={styles.moodValueText}>{moodValue}</Text>
        </View>
        <View
          style={{...styles.sliderContainer, opacity: showLevelUpAnimation ? 0.1 : 1}}>
          <Slider
        // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 300, height: 40, alignSelf: 'center'}}
            minimumValue={1}
            maximumValue={5}
            step={1}
            minimumTrackTintColor={'lightpink'}
            maximumTrackTintColor={'lightgray'}
            onValueChange={value => setMoodValue(value)}
            thumbTintColor={theme.colors.accent}
            value={3}
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
    </Provider>
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
    flex: 0.6,
    width: '100%'
  },
  radioButtons: {
    flexDirection: 'row',
    alignItems: 'stretch', 
    justifyContent: 'center',
  },
  eachRadioButton: {
    flexDirection: 'row',
    marginRight: 30,
    marginTop: 10
  },
  radioText: {
    marginTop: 7,
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
      backgroundColor: 'lightgray',
      marginBottom: 10,
      marginTop: 15
    },
  sliderButtonText: {
    color: 'black',
    alignSelf: 'center'
  }
})
export default MoodTracker;