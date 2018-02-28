import React from 'react'
import {StyleSheet, Text, View, Image, Header, ScrollView, TouchableOpacity, Picker, Button} from 'react-native'
import ScaleSlideInputType from './ScaleSlideInputType'
import TextInputType from './TextInputType'
import PickerInputType from './PickerInputType'
import NumericalPickerInputType from './NumericalPickerInputType'
import ChecklistInputType from './ChecklistInputType'
import LogFormScreen from './LogFormScreen'
import { StackNavigator } from 'react-navigation'

export default class ChooseLogScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      navigate: this.props.navigation
    }
  }

  onSubmit (value) {
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <ScrollView>
        <View style={styles.log_container}>
          <TouchableOpacity
            style={styles.log_button}
            onPress={() => navigate('Form', { title: 'Jane' })}>
            <Text style={styles.log_button_text}>Headache</Text>
            <Image
              style={styles.log_button_img}
              source={require('./images/headpain.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.log_button}
            onPress={() => navigate('Form')}>
            <Text style={styles.log_button_text}>Knee Pain</Text>
            <Image
              style={styles.log_button_img}
              source={require('./images/kneepain.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.log_button}
            onPress={() => navigate('Form')}>
            <Text style={styles.log_button_text}>Shoulder Pain</Text>
            <Image
              style={styles.log_button_img}
              source={require('./images/shoulderpain.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.log_button}
            onPress={() => navigate('Form')}>
            <Text style={styles.log_button_text}>Leg Pain</Text>
            <Image
              style={styles.log_button_img}
              source={require('./images/legpain.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.log_button}
            onPress={() => navigate('Form')}>
            <Text style={styles.log_button_text}>Back Pain</Text>
            <Image
              style={styles.log_button_img}
              source={require('./images/backpain.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  log_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 50
  },
  log_button: {
    margin: 10,
    alignItems: 'bottom',
    width: 150,
    height: 150,
    alignItems: 'center',
    backgroundColor: '#bf5252',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#bf5252'
  },
  log_button_text: {
    color: 'white',
    fontSize: 15
  },
  log_button_img: {
    marginTop: 15,
    height: 75,
    width: 75,
    tintColor: 'white'
  }
})
