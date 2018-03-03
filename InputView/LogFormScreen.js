import React from 'react'
import {StyleSheet, Text, View, Image, Header, ScrollView, TouchableOpacity, Picker, Button} from 'react-native'
import ScaleSlideInputType from './ScaleSlideInputType'
import TextInputType from './TextInputType'
import PickerInputType from './PickerInputType'
import NumericalPickerInputType from './NumericalPickerInputType'
import ChecklistInputType from './ChecklistInputType'
import { StackNavigator } from 'react-navigation'
import Database from './Database'

export default class ChooseLogScreen extends React.Component {
  HEADACHE = 1

  constructor (props) {
    super(props)
  //  props.navigation.setParams({log_title: props.title})
    var keysArray = []

    Database.transaction(tx => (tx.executeSql('SELECT fields FROM event_tbl \
          INNER JOIN event_details_tbl event_tbl.event_details_id = event_details_tbl.event_details_id \
          WHERE time = \'1950-01-01 00:00:00\' \
          AND event_type_id = ?;', [HEADACHE], (tx, { rows }) => keysArray = JSON.parse(rows.item(0).fields).keys())))

    var input_types = []

    for (let i = 0; i < keysArray.length; i++) {
      Database.transaction(tx => (tx.executeSql('SELECT view_name FROM field_to_view_tbl \
            WHERE field_name = ?;', [keysArray[i]], (tx, { rows }) => input_types[i] = JSON.parse(rows.item(0).view_name))))
    }

    this.state = {
      input_type_array: input_types
    }
  }

  onSubmit (value) {
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.main_container}>
        {this.state.input_keys.map((prop, key) => {
          if (prop == 'ScaleSlideInputType') {
            return (
              <ScaleSlideInputType
                input_style={styles.input_container_blue}
                title_text_style={styles.title_text}
                max_val={4}
                value={2}
                scale_labels={['None', 'A Little', 'Medium', 'A Lot', 'Horrible']}
                title_text={'Intensity'} />)
          } else {
            return (
            <NumericalPickerInputType
              input_style={styles.input_container_blue}
              title_text_style={styles.title_text}
              value={3}
              min={0}
              max={6}
              unit={'hours'}
              title_text={'Duration of Pain'} />)
          }
        })}
    {  /*    <ChecklistInputType
            list_values={['Light sensitivity', 'Sound sensitivity', 'Nausea', 'Pulsatile tinnitus', 'Scalp pain (allodynia)', 'Back pain', 'Neck pain']}
            input_style={styles.input_container_green}
            title_text_style={styles.title_text}
            title_text={'Associated Symptoms'} />
          <PickerInputType
            input_style={styles.input_container_green}
            title_text_style={styles.title_text}
            value={'Sharp'}
            picker_values={['Pressure-like', 'Sharp', 'Throbbing']}
            title_text={'Type of Headache'} />
          <ScaleSlideInputType
            input_style={styles.input_container_blue}
            title_text_style={styles.title_text}
            max_val={4}
            value={2}
            scale_labels={['None', 'A Little', 'Medium', 'A Lot', 'Horrible']}
            title_text={'Intensity'} />
          <PickerInputType
            input_style={styles.input_container_green}
            title_text_style={styles.title_text}
            value={'Top of Head'}
            picker_values={['Back of Head', 'Top of Head', 'Forehead']}
            title_text={'Location of Pain'} />
          <PickerInputType
            input_style={styles.input_container_blue}
            title_text_style={styles.title_text}
            value={'Naproxen'}
            picker_values={['Tylenol', 'Ibuprofen', 'Naproxen', 'Excedrin', 'Fioricet']}
            title_text={'Medication Needed'} />
          <TextInputType
            input_style={styles.input_container_green}
            title_text_style={styles.title_text}
            placeholder_text={'Type here...'}
            title_text={'Other Symptoms'} />
          <NumericalPickerInputType
            input_style={styles.input_container_blue}
            title_text_style={styles.title_text}
            value={3}
            min={0}
            max={6}
            unit={'hours'}
            title_text={'Duration of Pain'} />
          <TouchableOpacity style={styles.submit_button}>
            <Text style={styles.submit_text}>Submit</Text>
          </TouchableOpacity> */ }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title_text: {
    fontSize: 20,
    color: '#e5e5e5',
    paddingBottom: 10
  },
  input_container_blue: {
    width: 320,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#2D6D84',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2D6D84'
  },
  input_container_green: {
    width: 320,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#2D8464',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#2D8464'
  },
  submit_button: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'bottom',
    width: 320,
    alignItems: 'center',
    backgroundColor: '#bf5252',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#bf5252'
  },
  submit_text: {
    color: 'white',
    fontSize: 25
  }
})
