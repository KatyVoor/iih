import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, FlatList} from 'react-native';

class List extends Component {
  constructor(props){
    super(props)

    var dat = [];
    for(var i =0; i<100;i++){
      dat.push({key: i});
    }
    this.state = {
      data: dat,
    }

  }


  render() {

    return (
      <FlatList
        data={this.state.data}
        renderItem={({item}) => <Text>{item.key}</Text>}
      />
      );

    };

}

export default List;
