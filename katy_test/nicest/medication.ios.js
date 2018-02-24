import React, {Component, AppRegistry, TabBarIOS} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

class Meds extends Component {
     render(){
         return(
             <View style = {styles.container}>
             <TouchableHighlight 
             style={styles.button}
             underlayColor= 'white'>
              <Text style={styles.text} >Check Medication</Text>
             </TouchableHighlight>
             </View>
         )
     }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#23366b',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        fontSize : 20,
        textAlign : 'center',
        color: '#23366b',

    },
    button:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 15,
    }
  });
  
  export default Meds;