import React, {Component, AppRegistry, TabBarIOS} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

class Welcome extends Component {
     render(){
         return(
             <View style = {styles.container}>
               <TouchableHighlight 
               style={styles.button}
               underlayColor= 'white'>
                <Text style={styles.text}>Welcome to the Landing Page</Text>
               </TouchableHighlight> 
             </View>
         )
     }

}

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: 'column',
      backgroundColor: '#22c1e1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        fontSize : 20,
        textAlign : 'center',
        color: 'white',
    },
    image:{
        width: 150,

    },
    button:{
        alignItems: 'center',
        backgroundColor: '#444444',
        padding: 10,
        borderRadius: 15,
    }
  });
  
  export default Welcome;