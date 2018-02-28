import React, {Component} from 'react';
import { StyleSheet, Text, View, TabBarIOS } from 'react-native';

import PropTypes from 'prop-types';
import Welcome from './welcome.ios'
import More from './more.ios'
import Symptom from './symptom.ios'
import Meds from './medication.ios'

export default class app_tabs extends Component{ 
constructor(props){
  super(props);
    this.state = {
     selectedTab : 'welcome',
   };
  
  }
  render() {
    return (
     <TabBarIOS translucent={false} selectedTab={this.state.selectedTab} unselectedItemTintColor = '#444444' >
     <TabBarIOS.Item
      systemIcon = 'search'
      selected={this.state.selectedTab == 'welcome'}
      onPress={() => {
        this.setState({
          selectedTab : 'welcome'
        })
      }}>
     <Welcome/>
     </TabBarIOS.Item>

     <TabBarIOS.Item 
      systemIcon = "favorites"
      //icon={require('./cal.png')}
      selected={this.state.selectedTab == 'meds'}
      title = "Add"
      onPress={() => {
        this.setState({
          selectedTab : 'meds',
        })
      }}>
     <Meds/>
     </TabBarIOS.Item>

     <TabBarIOS.Item
      systemIcon="contacts" 
      selected={this.state.selectedTab == 'more'}
      onPress={() => {
        this.setState({
          selectedTab : 'more',
        })
      }}>
     <More/>
     </TabBarIOS.Item>

     <TabBarIOS.Item
     systemIcon="history"
      selected={this.state.selectedTab == 'symptom'}
      onPress={() => {
        this.setState({
          selectedTab : 'symptom',
        })
      }}>
     <Symptom/>
     </TabBarIOS.Item>

     </TabBarIOS>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 10,
  }
});
