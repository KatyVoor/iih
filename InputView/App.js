import React from 'react'
import ChooseLogScreen from './ChooseLogScreen'
import LogFormScreen from './LogFormScreen'
import { StackNavigator } from 'react-navigation'

const App = StackNavigator({
  Choose: { screen: ChooseLogScreen,
    navigationOptions: {
      title: 'Choose Log Type'
    }
  },
  Form: { screen: LogFormScreen,
    navigationOptions: {
      title: 'Log'
    }
  }
})

export default App
