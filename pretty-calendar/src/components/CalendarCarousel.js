import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import styles, { colors } from '../styles/index.style';
import SliderEntry from './SliderEntry';

class CalendarCarousel extends Component {
  constructor(props){
    super(props)

    var months = [];
    for(var i=0; i<3; i++){
      months[i] = new Date((new Date()).getFullYear(), (new Date()).getMonth()+i, 0);
    }

    //months.unshift({ data: 'beginning' });
    //months.push({ data: 'end' });
    console.log(months);
    this.state = {
      index: 1,
      centerMonth: months[1],
      months: months,
      allowScroll: true,
    }

  }
  _renderItem ({item, index}) {
      return <SliderEntry data={item} />;
  }

  slide = (index) => {
    /**
    console.log(this.state.months)
    if(index < this.state.index){
      var months = this.state.months;
      var first = this.state.months[0];
      var backMonth = first;
      backMonth.setMonth(backMonth.getMonth() - 1);
      months.unshift(backMonth);

      //this.setState({ centerMonth: new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0) });
      //this.setState({ index });
      this.setState({ months });
      console.log(months)
    }
*/




/**
    console.log(index)
    switch(index){
      case 2:
        this.setState({ months: [new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-3, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-2, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0) , new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+2, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+3, 0)]});
        this.setState({ centerMonth: new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0) });
        break;
      case 4:
        this.setState({ months: [new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()-1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth(), 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+1, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+2, 0) , new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+3, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+4, 0), new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+5, 0) ]});
        this.setState({ centerMonth: new Date(this.state.centerMonth.getFullYear(), this.state.centerMonth.getMonth()+2, 0) });
        break;
      default:
    }
    this._carousel.snapToItem(3, animated = false);
    */



    if(index == 0){
      var months = this.state.months;
      var m = new Date(months[1].getFullYear(), months[1].getMonth()-1, 0);
      months.pop();
      months.unshift(m);
      this.setState({months})
      console.log(months)
      this._carousel.snapToItem(1, animated =false)
    }
    if(index == 2){
      var months = this.state.months;
      months.shift();
      months.push(months[1]);
      console.log(months)
      this.setState({months}, function(){
        this._carousel.snapToItem(1, animated =false)
        var m1 = new Date(months[1].getFullYear(), months[1].getMonth()+2, 0);
        months[2] = m1;
        console.log(months)
        this.setState({months},function(){
          
        })
      })
    }
  }

  render() {



    return (
      <View style={styles.exampleContainer}>
      <Carousel
        ref={(c) => {this._carousel = c;}}
        data={this.state.months}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        activeSlideAlignment={'center'}
        firstItem={1}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        activeAnimationType={'spring'}
        activeAnimationOptions={{
            friction: 4,
            tension: 40
        }}
        onSnapToItem={(index) => this.slide(index)}
        scrollEnabled={this.state.allowScroll}
      />
      </View>
      );

    };

}

export default CalendarCarousel;
