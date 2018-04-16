import Database from '../Database';
import Moment from 'moment';
import constants, {getCardData} from '../components/Resources/constants';

export function createTables(){
  console.log('creating tables')
  Database.transaction(tx => {
    tx.executeSql(
             'CREATE TABLE IF NOT EXISTS `event_details_tbl` (`event_details_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `fields` TEXT NOT NULL);'
          )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS `field_to_view_tbl` (`field_id` INTEGER NOT NULL PRIMARY KEY UNIQUE, `field_name` TEXT NOT NULL UNIQUE, `view_name` TEXT NOT NULL);'
          )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS `event_type_tbl` (`event_type_id` INTEGER NOT NULL PRIMARY KEY UNIQUE,`event_type_name` TEXT NOT NULL UNIQUE, `event_type_icon` TEXT NOT NULL, `card_field_id1` INTEGER, `card_field_id2` INTEGER,FOREIGN KEY(card_field_id1) REFERENCES `field_to_view_tbl`(`field_id`), FOREIGN KEY(`card_field_id2`) REFERENCES `field_to_view_tbl` (`field_id`));'
            )
    tx.executeSql(
            'CREATE TABLE IF NOT EXISTS `event_tbl` (`event_id` INTEGER NOT NULL PRIMARY KEY,`event_type_id` INTEGER NOT NULL, `timestamp` TEXT NOT NULL, `event_details_id` INTEGER NOT NULL UNIQUE, FOREIGN KEY(`event_details_id`) REFERENCES `event_details_tbl`(`event_details_id`), FOREIGN KEY(`event_type_id`) REFERENCES `event_type_tbl`(`event_type_id`));'
          )
    tx.executeSql(
             'CREATE TABLE IF NOT EXISTS `settings_tbl` (`setting_name` TEXT NOT NULL PRIMARY KEY UNIQUE, `setting_value` TEXT NOT NULL);'
          )
          /* tx.executeSql(
           'CREATE TABLE IF NOT EXISTS view_to_component_tbl ( view_id INTEGER NOT NULL PRIMARY KEY UNIQUE, view_name TEXT NOT NULL UNIQUE, component` TEXT NOT NULL)'
          ); */
  }, err => console.log(err), () => console.log('done!!!'))
}
export function intializeDatabase(){
  console.log('intializing database')
  date = new Date()
  Database.transaction(tx => {
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2) values (1, \'Headache\', \'image.png\', \'Intensity\',\'Duration\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (2, \'Dizziness\', \'image.png\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon,card_field_id1,card_field_id2) values (3, \'Blurred Vision\', \'image.png\', \'Intensity\',\'Duration\')')
    tx.executeSql('INSERT OR IGNORE INTO event_type_tbl (event_type_id,event_type_name,event_type_icon) values (4, \'Medication Reminder\', \'image.png\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (1, \'Intensity\', \'ScaleSlideInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (2, \'Duration\', \'NumericalPickerInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO field_to_view_tbl (field_id,field_name,view_name) values (3, \'Other\', \'TextInputType\')')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (1,\'{"Intensity": "3","Duration": "40"}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (2,\'{"Duration": "40","Intensity": "3","Other": "NONE"}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (1, 1,\'1950-01-01 00:00:00\', 1)')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (2, 2,\'1950-01-01 00:00:00\', 2)')
    /* necessary default settings */
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'height_feet\',\'5\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'height_inches\',\'8\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'weight\',\'Select\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'height\',\'Select\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'name\',\'Select Edit\')')
    tx.executeSql('INSERT OR IGNORE INTO settings_tbl (setting_name,setting_value) VALUES (\'icon\',\'0\')')

    /* medication reminder examples */
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (50,\
    \'{"pillName": "Tylenol","dosage": "20mg","startDate": "2018-04-01","endDate": "2018-04-30","time": ["09:00","18:00"],"timeCategory": ["Morning","Evening"],"daysOfWeek": [1,1,1,1,1,0,0],"taken": [true,true]}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (50, 4,\'1950-01-01 00:00:00\', 50)')
    tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (51,\
    \'{"pillName": "Aspirin","dosage": "400mg","startDate": "2018-04-01","endDate": "2018-04-20","time": ["09:00"],"timeCategory": ["Morning"],"daysOfWeek": [1,1,1,1,1,1,1],"taken": [true]}\' )')
    tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (51, 4,\'1950-01-01 00:00:00\', 51)')

  }, err => console.log(err),() => console.log('intitialization complete'))

  Database.transaction(tx => {
    tx.executeSql('Select * from event_tbl;', [], (tx, {rows}) => console.log(JSON.stringify(rows)))
  }, err => console.log(err))
  //console.log(Database)
}

export function formatData(data){
  //console.log(data)
  dataTemp = {};
  data.forEach(function(ev){
    let d = new Date(ev.timestamp.replace(' ','T'));
    let day = d.getDate() - 1;
    //console.log(day)
    let symptom = ev.event_type_name;
    let intensity = parseInt(JSON.parse(ev.fields).Intensity) * 2 ;

    if(!dataTemp[symptom]){
      dataTemp[symptom] = {
        intensities: [],
        count: [],
      };
    }
    dataTemp[symptom].count[day] = (dataTemp[symptom].count[day] || 0) + 1;
    dataTemp[symptom].intensities[day] = ((dataTemp[symptom].intensities[day] || 0)*(dataTemp[symptom].count[day]-1) + intensity)/dataTemp[symptom].count[day];
  });
  //console.log(dataTemp)
  return dataTemp;
}


export function databaseFakeData(){
    //console.log('faking data')
    Database.transaction(tx => {
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (3,\'{"Intensity": "2","Duration": "40"}\')')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (3, 1,\'2018-03-07 06:00:00\', 3)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (4,\'{"Intensity": "4","Duration": "50"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (4, 1,\'2018-03-07 06:01:00\', 4)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (5,\'{"Intensity": "3","Duration": "30"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (5, 1,\'2018-03-06 06:01:00\', 5)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (6,\'{"Intensity": "5","Duration": "60"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (6, 1,\'2018-03-06 06:01:00\', 6)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (7,\'{"Intensity": "5","Duration": "60"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (7, 1,\'2018-03-08 06:01:00\', 7)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (8,\'{"Intensity": "1","Duration": "60"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (8, 1,\'2018-03-09 06:01:00\', 8)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (9,\'{"Intensity": "1","Duration": "60"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (9, 1,\'2018-03-09 06:01:00\', 9)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (10,\'{"Intensity": "5","Duration": "60"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (10, 1,\'2018-03-17 06:01:00\', 10)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (11,\'{"Intensity": "5","Duration": "60"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (11, 1,\'2018-04-17 06:01:00\', 11)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (14,\'{"Intensity": "5","Duration": "60"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (12, 3,\'2018-04-17 06:01:00\', 14)')
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (15,\'{"Intensity": "5","Duration": "60"}\' )')
        tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp,event_details_id) VALUES (13, 3,\'2018-04-19 06:01:00\', 15)')
        /* medication reminder fake data */
        tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (12,\
         \'{"pillName": "Tylenol","dosage": "20mg","time": ["09:00","18:00"],"timeCategory": ["Morning","Evening"],"daysOfWeek": [0,0,1,0,0,0,0],"taken": [false,false]}\' )')
         tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (12, 4,\'2018-04-17 09:00:00\', 12)')
         tx.executeSql('INSERT OR IGNORE INTO event_details_tbl (event_details_id,fields) VALUES (13,\
         \'{"pillName": "Aspirin","dosage": "400mg","time": ["09:00"],"timeCategory": ["Morning"],"daysOfWeek": [0,0,1,0,0,0,0],"taken": [false]}\' )')
         tx.executeSql('INSERT OR IGNORE INTO event_tbl (event_id, event_type_id, timestamp, event_details_id) VALUES (13, 4,\'2018-04-17 09:00:00\', 13)')

        /* medication reminder fake data */
    },err=> console.log(err));
    /*Database.transaction(tx => {
        tx.executeSql('Select * from event_tbl',[], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        )
    },err=> console.log(err));
    Database.transaction(tx => {
        tx.executeSql('Select * from event_details_tbl',[], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        )
    },err=> console.log(err));*/


}


export function pullFromDataBase(month, day, callback){
  //TODO: year is missing?
  databaseFakeData();
  console.log('pulling from database');

  formattedMonth = month.toISOString().substr(0,7)
  var arrayFormattedMonth = [formattedMonth]
  Database.transaction(tx => (tx.executeSql("SELECT event_id,event_type_name, timestamp, fields, strftime(\'%Y-%m\',timestamp) FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != \'1950-01-01 00:00:00\' AND event_type_name != \'Medication Reminder\' and \
      strftime(\'%Y-%m\',timestamp) = ? ORDER BY timestamp", arrayFormattedMonth, (tx, { rows }) => callback(formatData(rows._array)))),err=>console.log(err));

}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function formatAgenda(data){
    //console.log('reached formatAgenda')
    //console.log(data)
    agendaFlatList = []
    data.forEach(function(ele){

        formattedTime = Moment(ele.timestamp, 'YYYY-MM-DD HH:mm:ss').format('h:mm A')
        j = JSON.parse(ele.fields)
        note_value1 = ele.card_field_id1 + ": " + j[ele.card_field_id1]
        note_value2 = ele.card_field_id2 + ": " + j[ele.card_field_id2]

        //TODO: should have error checking here incase json is malformatted
        //TODO: should use event_type_name for cardData


        elementRecord = {id: ele.event_id, cardData: getCardData(ele.event_type_name), timeStamp: formattedTime, note1: note_value1, note2: note_value2}

        //console.log(elementRecord)


        let d = new Date(ele.day)
        d.setTime(d.getTime() + d.getTimezoneOffset()*60*1000 )

        let foundDate = false
        for (var i = 0; i < agendaFlatList.length; i++) {
            if(sameDay(agendaFlatList[i].date,d)){
                //console.log('adding event')
                agendaFlatList[i].data.push(elementRecord)
                foundDate = true
                break
            }
        }

        if(!foundDate){
            //console.log('adding a record to agendaFlatList')
            agendaFlatList.push({date: d,data: [elementRecord]})
        }

    });

    //console.log(agendaFlatList)



  return agendaFlatList

}
export function pullAgendaFromDatabase(callback){

    // Agenda query
    console.log('reached pullAgendaFromDatabase')
    Database.transaction(tx => (tx.executeSql('SELECT event_id,event_type_name, timestamp,card_field_id1, card_field_id2, event_type_icon, fields,strftime(\'%Y-%m-%d\',timestamp) as day FROM event_tbl \
    INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
    INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
    WHERE timestamp != \'1950-01-01 00:00:00\' and event_type_name != \'Medication Reminder\' ORDER BY timestamp', [], (tx, { rows }) => callback(formatAgenda(rows._array)))),err=>console.log(err));


}

export function asyncDeleteEvent(id){
  inputArray = [id]
  Database.transaction(tx => {
      tx.executeSql('DELETE FROM event_tbl WHERE event_details_id = ?',inputArray);
  },err=>console.log(err))
}
function formatMedicineData(data){
  console.log('medicinal',data)
  dataTemp = {};
  data.forEach(function(med){
    let earliestTime = new Date(med.timestamp.replace(' ','T'))
    let fields = JSON.parse(med.fields)

    if(!dataTemp[fields.pillName]){
      dataTemp[fields.pillName] = {
        dosage: fields.dosage,
        time: fields.time,
        timeCategory: fields.timeCategory,
        taken: fields.taken,
      };
    }

  });
  //console.log(dataTemp)
  return dataTemp;
}

export function pullMedicineFromDatabase(date, callback){
  let day = date.toISOString().substr(0,10)
  dayArray  = [day]
  Database.transaction(tx => {
      tx.executeSql('SELECT event_id,event_type_name, timestamp,fields,strftime(\'%Y-%m-%d\',timestamp) as day FROM event_tbl \
      INNER JOIN event_details_tbl on event_tbl.event_details_id = event_details_tbl.event_details_id \
      INNER JOIN event_type_tbl on event_tbl.event_type_id = event_type_tbl.event_type_id \
      WHERE timestamp != \'1950-01-01 00:00:00\' AND event_type_name = \'Medication Reminder\' AND day = ? ORDER BY timestamp',dayArray, (_, { rows }) =>
      callback(formatMedicineData(rows._array)),err=>console.log(err));
  })
}

export function asyncSettingUpdate(name, value){
  inputArray = [name,value]
  Database.transaction(tx => {
      tx.executeSql('INSERT OR REPLACE INTO settings_tbl (setting_name,setting_value) VALUES (?,?)',inputArray);
  },err=>console.log(err))

}

function parseSettings(data){
    obj = {}
    data.forEach(function(ele){
        obj[ele.setting_name] = ele.setting_value
    })
    return obj
}
export function pullSettingsFromDatabase(callback){
  Database.transaction(tx => {
      tx.executeSql('SELECT * from settings_tbl',[], (_, { rows }) => callback(parseSettings(rows._array)))
  }, err=>console.log(err))
}