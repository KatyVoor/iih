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

createTables = function () {
  Database.transaction(tx => {
    tx.executeSql(
             'CREATE TABLE IF NOT EXISTS event_details_tbl (event_details_id INTEGER NOT NULL PRIMARY KEY UNIQUE, fields TEXT NOT NULL);'
          )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS event_type_tbl (event_type_id INTEGER NOT NULL PRIMARY KEY UNIQUE,`event_type_name` TEXT NOT NULL UNIQUE,`event_type_icon` TEXT NOT NULL);'
          )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS event_tbl (event_id INTEGER NOT NULL PRIMARY KEY,`event_type_id` INTEGER NOT NULL, timestamp TEXT NOT NULL, event_details_id INTEGER NOT NULL UNIQUE, FOREIGN KEY(event_details_id) REFERENCES event_details_tbl`(event_details_id`), FOREIGN KEY(event_type_id) REFERENCES event_type_tbl`(event_type_id`)'
          )
          /* tx.executeSql(
           'CREATE TABLE IF NOT EXISTS view_to_component_tbl ( view_id INTEGER NOT NULL PRIMARY KEY UNIQUE, view_name TEXT NOT NULL UNIQUE, component` TEXT NOT NULL)'
          ); */
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS`field_to_view_tbl` (field_id INTEGER NOT NULL PRIMARY KEY UNIQUE,`field_name` TEXT NOT NULL UNIQUE,`view_name` TEXT NOT NULL,'
          )
  })
}
intializeDatabase = function () {
  Database.transaction(tx => {
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (1, \'headache\', \'image.png\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (2, \'Dizziness\', \'image.png\')')
    tx.executeSql('INSERT OR IGNORE INTO field_id (field_id,field_name,view_name) values (1, \'Intensity\', \'ScaleSlideInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_id (field_id,field_name,view_name) values (2, \'Duration\', \'NumericalPickerInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1,{"Intensity": "Medium","Duration": "40"} )')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (1, 1,\'1950-01-01 00:00:00\', 1')
  })
}

export default App
