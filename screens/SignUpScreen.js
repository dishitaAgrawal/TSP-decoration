import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import db from '../config';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      firstName: '',
      contact: '',
      password: '',
      confirmPassword: '',
    };
  }

  signUp = (email, password, confirmPassword) => {
    try {
      if (password === confirmPassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            alert('Account created, welcome onboard!');

            this.props.navigation.replace('Drawer');
            db.collection('users').add({
              email: this.state.email.toLowerCase(),
              name: this.state.firstName,
              contact: this.state.contact,
            });
            // ...
          })
          .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);

            // ..
          });
      } else {
        alert('Passwords dont match, try again!!');
      }
    } catch (error) {
      console.log(error);
      // ..
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={require('../assets/loginBg.png')}>
          <View
            style={{
              width: '95%',
              padding: 20,
              borderRadius: 10,
              backgroundColor: '#ffffffaa',
            }}>
            <Text style={{ fontWeight: 'bold', color: '#505050' }}>
              Get started..!
            </Text>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                width: '90%',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderTopLeftRadius: 10,
              }}>
              <TextInput
                style={{ flex: 1, padding: 5, margin: 5 }}
                placeholder={'Email'}
                onChangeText={(val) => {
                  this.setState({ email: val });
                }}
                value={this.state.email}
              />
              <Entypo name={'mail'} size={20} color="#F47292" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                width: '90%',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <TextInput
                style={{ flex: 1, padding: 5, margin: 5 }}
                placeholder={'Name'}
                onChangeText={(val) => {
                  this.setState({ firstName: val });
                }}
                value={this.state.firstName}
              />
              <Entypo name={'emoji-happy'} size={20} color="#F47292" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                width: '90%',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <TextInput
                style={{ flex: 1, padding: 5, margin: 5 }}
                placeholder={'Contact'}
                keyboardType="number-pad"
                onChangeText={(val) => {
                  this.setState({ contact: val });
                }}
                value={this.state.contact}
              />
              <Entypo name={'phone'} size={20} color="#F47292" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                width: '90%',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <TextInput
                style={{ flex: 1, padding: 5, margin: 5 }}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(val) => {
                  this.setState({ password: val });
                }}
                value={this.state.password}
              />
              <Entypo name={'pin'} size={20} color="#F47292" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                width: '90%',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
              }}>
              <TextInput
                style={{ flex: 1, padding: 5, margin: 5 }}
                placeholder={'Confirm Password'}
                secureTextEntry={true}
                onChangeText={(val) => {
                  this.setState({ confirmPassword: val });
                }}
                value={this.state.confirmPassword}
              />
              <Entypo name={'pin'} size={20} color="#F47292" />
            </View>
            <TouchableOpacity
              style={{
                marginTop: 5,
                marginBottom: 5,
                width: '70%',
                alignSelf: 'center',
                padding: 10,
                borderRadius: 20,
                alignItems: 'center',
              }}
              onPress={() => {
                this.signUp(
                  this.state.email,
                  this.state.password,
                  this.state.confirmPassword
                );
              }}>
              <LinearGradient
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  width: '70%',
                  alignSelf: 'center',
                  padding: 10,
                  borderRadius: 20,
                  alignItems: 'center',
                }}
                colors={['#ea7ebb', '#FC9494']}
                start={{ x: 0.01, y: 0.01 }}
                end={{ x: 0.99, y: 0.99 }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20, alignSelf: 'center' }}
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={{ fontWeight: 'bold', color: '#505050' }}>
                Already a user? Click here..
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
