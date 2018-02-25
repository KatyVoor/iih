import React from 'react'
import {StyleSheet, Text, AppRegistry, TextInput, View, Picker, ViewPropTypes, TouchableOpacity} from 'react-native'
import CheckBox from 'react-native-check-box'

export default class ChecklistInputType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title_text: props.title_text,
      list_values: props.list_values,
      button_styles: [],
      input_style: props.input_style,
      title_text_style: props.title_text_style
    }
    for (let i = 0; i <= props.list_values.length; i++) {
      this.state.button_styles.push('transparent')
      console.log('here')
    }
  }

  changeCheckbuttonStyle (key) {
    if (this.state.button_styles[key] == 'transparent') {
      this.state.button_styles[key] = 'white'
    } else {
      this.state.button_styles[key] = '#bf5252'
    }
    
    this.setState({
      button_styles: this.state.button_styles
    })
  }

  render () {
    return (
      <View style={this.state.input_style}>
        <Text style={this.state.title_text_style}>{this.state.title_text}</Text>
        {this.state.list_values.map((prop, key) => {
          return (
            <TouchableOpacity
              style={[styles.checkbutton, {backgroundColor: this.state.button_styles[key]}]}
              onClick={this.changeCheckbuttonStyle(key).bind(this)}
              key={key}>
              <Text style={styles.checkbox_text}>{prop}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkbutton: {
    margin: 10,
    alignItems: 'bottom',
    width: 200,
    height: 40,
    alignItems: 'center',
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#bf5252'
  },
  checkbox: {
    flex: 1,
    padding: 5
  },
  checkbox_text: {
    color: 'white',
    fontSize: 20
  }
})
