import React, {Component, AppRegistry, TabBarIOS} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

class Symptom extends Component {
     render(){
         return(
             <View style = {styles.container}>
             <Image resizeMode= 'contain' source={require('./add.png')}  style ={styles.image}/>
             <TouchableHighlight 
             style={styles.button}
             underlayColor= 'white'>
                 <Text style={styles.text} >Add Symptom</Text>
             </TouchableHighlight>
             </View>
         )
     }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#92a7ae',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        fontSize : 20,
        textAlign : 'center',
        color: 'black',

    },
    image:{
        width: 100,
        height : 100,
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 15,
    }
  });
  
  export default Symptom;