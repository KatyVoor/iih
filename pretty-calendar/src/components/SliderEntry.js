import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/SliderEntry.style';
import Calendar from './Calendar.js';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    };



    render () {
        const { data } = this.props;


        return (
            <View
              style={styles.slideInnerContainer}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer]}>
                    <Calendar
                      currMonth={ data }
                    />
                    <View style={[styles.radiusMask]} />
                </View>

            </View>
        );
    }
}
