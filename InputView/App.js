import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import ScaleSlide from './ScaleSlide'

export default class App extends React.Component {
  render () {
    return (
      <View style={styles.main_container}>
        <ScaleSlide
          input_style={styles.input_container}
          max_val={6}
          value={3}
          scale_labels={['zero', 'one', 'two', 'three', 'four', 'five', 'six']} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input_container: {
    width: 300
  }
})
