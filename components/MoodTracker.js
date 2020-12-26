import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {View, ScrollView, Dimensions} from 'react-native'
import {Text, useTheme, Button} from 'react-native-paper'
import Slider from '@react-native-community/slider'
import {LineChart} from 'react-native-chart-kit'
import {addMood} from '../reducers/activeUserReducer'

const MoodTracker = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [moodValue, setMoodValue] = useState(2.5)
  return(
    <ScrollView>
      <View>
        <Text>My Moods</Text>
        <LineChart
          data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          withInnerLines={false}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
      backgroundColor: 'lightgray',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: () => 'gray',
      labelColor: () => theme.colors.onSurface,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "lightpink"
      }
    }}
          bezier
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
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
        onPress={() => dispatch(addMood(moodValue))}>
        <Text>
          Save
        </Text>
      </Button>
    </ScrollView>
  )
}

export default MoodTracker;