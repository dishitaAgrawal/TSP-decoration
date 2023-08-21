import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class Intro extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground
          source={require('../assets/getstartedScreen.png')}
          style={styles.backgroundImage}>
          <Image source={require('../assets/icon.png')} style={{borderRadius:100, width:200, height:200}}/>

          <TouchableOpacity
            style={{
              marginTop: 10,
              marginBottom: 5,
              width: '70%',
              alignSelf: 'center',
              padding: 40,
              borderRadius: 40,
            }}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
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
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});
