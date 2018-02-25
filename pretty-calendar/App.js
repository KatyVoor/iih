import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Header, Calendar, Agenda, CalendarCarousel, List } from './src/components';


export default class App extends React.Component {
  render() {
    console.log("HI");
    return (
      <View>
        <Header />
        <CalendarCarousel />
      </View>
    );
  }
}
