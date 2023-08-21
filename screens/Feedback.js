import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import firebase from 'firebase';
import { Header, Icon } from 'react-native-elements';

import db from '../config';
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: firebase.auth().currentUser.email,
      name: '',
      userId: firebase.auth().currentUser.uid,
      feedback: '',
      date: new Date(),
    };
  }
  addFeedback = () => {
    db.collection('Feedback').add({
      userId: this.state.emailId,
      date: this.state.date.toDateString(),
      name: this.state.name,
      feedback: this.state.feedback,
    });
    Alert.alert('Feedback Added');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Header
          centerComponent={{
            text: 'Profile',
            style: {
              margin: 2,
              padding: 2,
              fontWeight: 'bold',
              fontSize: 21,
              color: 'white',
            },
          }}
          backgroundColor={'#ea7ebb'}
          leftComponent={
            <Icon
              name="arrow-left"
              type="feather"
              color="#ffffff"
              onPress={() => this.props.navigation.goBack()}></Icon>
          }
        />
        <View style={styles.textinputs}>
          <Entypo name={'mail'} size={20} color="#FC9494" style={styles.icon} />
          <Text style={styles.textinput}> {this.state.emailId}</Text>
        </View>
        <View style={{ marginTop: 30 }}></View>
        <View style={styles.textinputs}>
          <MaterialCommunityIcons
            name={'format-title'}
            size={25}
            color={'#FC9494'}
            style={styles.icon}
          />
          <TextInput
            style={styles.textinput}
            placeholder=" Name"
            onChangeText={(val) => {
              this.setState({ name: val });
            }}
            value={this.state.name}
          />
        </View>

        <View style={{ marginTop: 30 }}></View>
        <View style={styles.textinputs4}>
          <MaterialIcons
            name={'note-add'}
            size={20}
            color={'#FC9494'}
            style={styles.icon}
          />

          <TextInput
            style={styles.textinput}
            placeholder=" Feedback"
            onChangeText={(val) => {
              this.setState({ feedback: val });
            }}
            value={this.state.feedback}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <LinearGradient
            colors={['#ea7ebb', '#FC9494']}
            start={{ x: 0.1, y: 0.5 }}
            end={{ x: 0.9, y: 0.1 }}
            style={styles.button}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                this.addFeedback();
              }}>
              <Text style={styles.buttonText}>Submit Feedback → </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    padding: 5,
    borderRightColor: '#4a632f',
    borderRightWidth: 1,
  },
  textinput: {
    color: '#10341C',
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
  textinputs: {
    marginTop: 5,
    marginBottom: 5,
    width: '90%',
    borderColor: 'black',
    borderBottomWidth: 1.5,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    backgroundColor: 'white',
  },

  textinputs4: {
    marginTop: 5,
    marginBottom: 5,
    width: '90%',
    borderColor: 'black',
    borderBottomWidth: 1.5,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    backgroundColor: 'white',
    height: 150,
  },
  buttonText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
  },

  button1: {
    width: "60%",
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  button: {
    width: '60%',
    margin: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
