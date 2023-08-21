import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.props.navigation.replace('Drawer');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
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
              alignSelf: 'center',
              backgroundColor: '#ffffffaa',
            }}>
            <Text style={{ fontWeight: 'bold', color: '#505050' }}>
              Welcome Back..
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
              <Entypo name={'mail'} size={24} color="#F47292" />
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
                placeholder={'password'}
                secureTextEntry={true}
                onChangeText={(val) => {
                  this.setState({ password: val });
                }}
                value={this.state.password}
              />
              <Entypo name={'pin'} size={24} color="#F47292" />
            </View>
            <TouchableOpacity
              style={{ marginVertical: 20, alignSelf: 'flex-end' }}
              onPress={() =>
                this.props.navigation.navigate('ForgotPasswordScreen')
              }>
              <Text style={{ fontWeight: 'bold', color: '#505050' }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

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
              onPress={() => this.login(this.state.email, this.state.password)}>
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
                  Login
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 20, alignSelf: 'center' }}
              onPress={() => this.props.navigation.navigate('SignUpScreen')}>
              <Text style={{ fontWeight: 'bold', color: '#505050' }}>
                Not a user? Click here..
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
