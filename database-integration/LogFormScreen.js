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

  createTables = function () {
    console.log("hereee")
    Database.transaction(tx => {
      tx.executeSql(
               'CREATE TABLE IF NOT EXISTS `event_details_tbl` (`event_details_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `fields` TEXT NOT NULL);'
            )
      tx.executeSql(
              'CREATE TABLE IF NOT EXISTS `event_type_tbl` (`event_type_id` INTEGER NOT NULL PRIMARY KEY UNIQUE,`event_type_name` TEXT NOT NULL UNIQUE,`event_type_icon` TEXT NOT NULL);'
            )
      tx.executeSql(
              'CREATE TABLE IF NOT EXISTS `event_tbl` (`event_id` INTEGER NOT NULL PRIMARY KEY,`event_type_id` INTEGER NOT NULL, `timestamp` TEXT NOT NULL, `event_details_id` INTEGER NOT NULL UNIQUE, FOREIGN KEY(`event_details_id`) REFERENCES `event_details_tbl`(`event_details_id`), FOREIGN KEY(`event_type_id`) REFERENCES `event_type_tbl`(`event_type_id`));'
            )
            /* tx.executeSql(
             'CREATE TABLE IF NOT EXISTS view_to_component_tbl ( view_id INTEGER NOT NULL PRIMARY KEY UNIQUE, view_name TEXT NOT NULL UNIQUE, component` TEXT NOT NULL)'
            ); */
      tx.executeSql(
              'CREATE TABLE IF NOT EXISTS `field_to_view_tbl` (`field_id` INTEGER NOT NULL PRIMARY KEY UNIQUE,`field_name` TEXT NOT NULL UNIQUE,`view_name` TEXT NOT NULL);'
            )
    }, err => console.log(err))
  }
  intializeDatabase = function () {
    Database.transaction(tx => {
      tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (1, \'headache\', \'image.png\')')
      tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (2, \'Dizziness\', \'image.png\')')
      tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (1, \'Intensity\', \'ScaleSlideInputType\')')
      tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (2, \'Duration\', \'NumericalPickerInputType\')')
      tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1,\'{"Intensity": "Medium","Duration": "40"}\' )')
      tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (1, 1,\'1950-01-01 00:00:00\', 1)')
    //  tx.executeSql('select * from event_type_tbl', [], (_, { rows }) =>
      //      console.log(JSON.stringify(rows))
        //  )
    }, err => console.log(err))
  }

  constructor (props) {
    super(props)
    this.createTables()
    this.intializeDatabase()
    console.log('test')
    let HEADACHE = 1
  //  props.navigation.setParams({log_title: props.title})
    var keysArray = []

    Database.transaction(tx => (tx.executeSql('SELECT fields FROM event_tbl \
          INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
          WHERE timestamp = \'1950-01-01 00:00:00\' \
          AND event_type_id = ?;', [HEADACHE], (tx, { rows }) => {
          console.log(Object.keys(JSON.parse(rows._array[0].fields)))
          keysArray = Object.keys(JSON.parse(rows._array[0].fields))

          for (let i = 0; i < keysArray.length; i++) {
            console.log("key loop")
            console.log(keysArray[i])
            Database.transaction(tx => (tx.executeSql('SELECT view_name FROM field_to_view_tbl \
                  WHERE field_name = ?;', [keysArray[i]], (tx, { rows }) => {
                    input_types[i] = rows._array[0].view_name
                    console.log(input_types[i])
                    this.setState({
                      input_type_array: input_types
                    })
                  })), err => console.log(err))
          }
        })), err => console.log(err))

    var input_types = []
    
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
          {this.state.input_type_array.map((prop, key) => {
            if (prop == 'ScaleSlideInputType') {
              return (
                <ScaleSlideInputType
                  key={key}
                  input_style={styles.input_container_blue}
                  title_text_style={styles.title_text}
                  max_val={4}
                  value={2}
                  scale_labels={['None', 'A Little', 'Medium', 'A Lot', 'Horrible']}
                  title_text={'Intensity'} />)
            } else {
              return (
                <NumericalPickerInputType
                  key={key}
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
