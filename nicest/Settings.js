import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,View,Text,
  StatusBar,
  Image,
  FlatList,
  List,
  Alert,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import Modal from "react-native-modal";
import moment from 'moment';




export default class Settings extends Component{
    constructor (props){
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = {
            switchValue: false,
            birthday:  new Date(),
            name: 'Select Edit',
            isModalVisible: false,
            weight : 'Select Edit',
            height: 'Select Edit',
            isModalVisible2 : false,
            isModalVisible_height : false,
        };
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
      this.setState({birthday: newDate })
    }
    
    toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
    
    toggleModal1 = () =>
    this.setState({ isModalVisible2: !this.state.isModalVisible2 });

    toggleModal_height = () =>
    this.setState({ isModalVisible_height: !this.state.isModalVisible_height});
    
    render(){
        var bgColor = '#DCE3F4';
    return (
    <View style={styles.container}>
      <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
        <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
      </View>
      <View style={styles.container}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerStyle={{marginTop:15}}/>
         
          <SettingsList.Item 
            icon={
                <Image style={styles.imageStyle} height={60} resizeMode='contain' source={require('./images/profile.png')}/>
            }
            hasNavArrow={false}
            title= {this.state.name}
            titleInfo='Edit'
            onPress = {this.toggleModal}
          />
          <Modal isVisible={this.state.isModalVisible2} style={styles.modal}>
             <View style={styles.contain}>
            
             </View>
             <View style={{flex : 1, alignItems: 'center', justifyContent: 'center' }}>
             <TouchableOpacity style={styles.button} onPress={this.toggleModal1} >
                  <Text style ={styles.text}>Submit</Text >
             </TouchableOpacity>
             </View>
          </Modal>

           <Modal isVisible={this.state.isModalVisible_height} style={styles.modal}>
             <View style={styles.contain}>
             <DatePickerIOS
             mode='date'
             date={this.state.birthday}
             onDateChange={this.setDate}
              />
             </View>
             <View style={{flex : 1, alignItems: 'center', justifyContent: 'center' }}>
             <TouchableOpacity style={styles.button} onPress={this.toggleModal_height} >
                  <Text style ={styles.text}>Submit</Text >
             </TouchableOpacity>
             </View>
          </Modal>

          <Modal isVisible={this.state.isModalVisible} style = {styles.modal}>
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('./images/health.png')}/>
              
                <TextInput
                    style={{height: 50}} 
                    placeholder="Enter Name"
                    onChangeText={(name) => this.setState({name})}
                />
                  <TextInput
                    style={{height: 50}}
                    placeholder="Enter Weight"
                    onChangeText={(weight) => this.setState({weight})}
                />
                  <TextInput
                    style={{height: 50}}
                    placeholder="Enter Height"
                    onChangeText={(height) => this.setState({height})}
                    
                /> 
                <TouchableOpacity
                    style={{height: 50}}
                    placeholder="Enter Birthday"
                    onPress = {this.toggleModal1}
                    onChangeText={(birthday) => this.setState({birthday})}
                />
                <TouchableOpacity style={styles.button} onPress={this.toggleModal} alignItems='center'>
                  <Text style ={styles.text}>Submit</Text >
                </TouchableOpacity>
              </View>
          </Modal>

          <SettingsList.Item
            title='Birthday'
            hasNavArrow = {false}
            onPress = {this.toggleModal1}
            switchState={this.state.switchValue}
            titleInfo = { moment(this.state.birthday).format("MMM D, YYYY")}
            switchOnValueChange={this.onValueChange}
            titleInfoStyle={styles.titleInfoStyle}
          />
          <SettingsList.Item
            title='Height'
            onPress = {this.toggleModal_height}
            hasNavArrow = {false}
            titleInfo = {this.state.height}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            titleInfoStyle={styles.titleInfoStyle}
          />
          <SettingsList.Item
            title='Weight'
            hasNavArrow = {false}
            titleInfo = {this.state.weight}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            titleInfoStyle={styles.titleInfoStyle}
          />
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            title='Quick Log'
            hasSwitch = {true}
            hasNavArrow = {false}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            titleInfoStyle={styles.titleInfoStyle}
          />
          <SettingsList.Item
            title='Settings A'
            onPress={() => Alert.alert('Settings A')}
          />
          <SettingsList.Item
            title='Settings B'
            titleInfo = {this.state.name}
            titleInfoStyle={styles.titleInfoStyle}
            onPress={() => Alert.alert('Settings B')}
          />
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            title='Option A'
            onPress={() => Alert.alert('Option A')}
          />
          <SettingsList.Item
            title='Option B'
            onPress={() => Alert.alert('Option B')}
          />
          <SettingsList.Item
            title='Option C'
            onPress={() => Alert.alert('Option C')}
          />
        </SettingsList>
      
    </View>
    </View>
  );
}
onValueChange(value){
  this.setState({switchValue: value});
}
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#EFEFF4',
        flex:1
    },
    imageStyle:{
      marginLeft:15,
      alignSelf:'center',
      height:30,
      width:30
    },
    titleInfoStyle:{
      fontSize:16,
      color: '#8e8e93'
    },
    modal:{
      flex:1,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
    },
    contain: {
      flex: 1,
      justifyContent: 'center'
    },
    text:{
        fontWeight : 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
    },
    button:{
        width: 200,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aedfe1'
    }
  });
  