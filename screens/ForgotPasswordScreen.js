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

import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';
export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  fp = (email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password Resent Link Sent.');
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
              width: '80%',
              padding: 10,
              borderRadius: 10,
              alignSelf: 'center',
              margin: 20,
              backgroundColor: '#ffffffaa',
            }}>
               <Text style={{ fontWeight: 'bold', color:"#505050"}}>
               Forgot password?
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
              />
              <Entypo name={'mail'} size={24} color="#F47292" />
            </View>
            <TouchableOpacity
              style={{
                marginTop: 10,
                marginBottom: 5,
                width: '95%',
                alignSelf: 'center',
                padding: 40,
                borderRadius: 40,
              }}
              onPress={() => this.fp(this.state.email)}>
              <LinearGradient
                style={{
                  marginTop: 5,
                  marginBottom: 5,
                  width: '95%',
                  alignSelf: 'center',
                  padding: 10,
                  borderRadius: 20,
                  alignItems: 'center',
                }}
                colors={['#ea7ebb', '#FC9494']}
                start={{ x: 0.01, y: 0.01 }}
                end={{ x: 0.99, y: 0.99 }}>
                <Text style={styles.buttonText}>Send reset email</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 10, alignSelf: 'center' }}
              onPress={() => this.props.navigation.navigate('LoginScreen')}>
              <Text style={{ fontWeight: 'bold', color: '#505050' }}>
                Go Back To Login Screen>>
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});