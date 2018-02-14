import React from 'react'
import {StyleSheet, Text, AppRegistry, TextInput, View, Picker} from 'react-native'
import CheckBox from 'react-native-check-box'

export default class ChecklistInputType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title_text: props.title_text,
      list_values: props.list_values,
      input_style: props.input_style,
      title_text_style: props.title_text_style
    }
  }

  render () {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        {this.state.list_values.map((prop, key) => {
          return (
            <CheckBox
              key={key}
              style={styles.checkbox}
              onClick={() => console.log('hi')}
              rightText={prop}
              rightTextStyle={styles.right_text} />
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkbox: {
    flex: 1,
    padding: 5
  },
  right_text: {
    color: 'white',
    fontSize: 20
  }
})
