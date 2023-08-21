import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: firebase.auth().currentUser.email,
      firstName: '',
    };
  }

  getUserInfo = () => {
    var email = this.state.email;
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            firstName: data.firstName,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserInfo();
  }
  goToSC = (category) => {
    this.props.navigation.navigate('SubCategory', { category: category });
  };
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          style={{
            flex: 1,
          }}
          colors={['#ea7ebb', '#FC9494']}
          start={{ x: 0.01, y: 0.01 }}
          end={{ x: 0.99, y: 0.99 }}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Text style={styles.title}>Hello {this.state.firstName} :)</Text>
          <View
            style={{
              flex: 0.9,

              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <ScrollView style={{ flex: 1, width: '100%', marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#505050',
                  marginLeft: 10,
                }}>
                Welcome to the world of celebrations!!
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#505050',
                  marginLeft: 10,
                  marginTop: 10,
                }}>
                Explore categories below...!
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#565eaf66',
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onPress={() => {
                    this.goToSC('Anniversary');
                  }}>
                  <ImageBackground
                    style={styles.backgroundImageButton}
                    source={require('../assets/anniversary.jpg')}></ImageBackground>
                  <Text style={styles.buttonText}>Anniversary</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#565eaf66',
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onPress={() => {
                    this.goToSC('BabyShower');
                  }}>
                  <ImageBackground
                    style={styles.backgroundImageButton}
                    source={require('../assets/BabyShower.jpg')}></ImageBackground>
                  <Text style={styles.buttonText}>BabyShower</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',

                  marginTop: 40,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#565eaf66',
                    borderRadius: 10,
                    padding: 20,
                  }}
                  onPress={() => {
                    this.goToSC('BirthDay');
                  }}>
                  <ImageBackground
                    style={styles.backgroundImageButton}
                    source={require('../assets/Birthday.jpg')}></ImageBackground>
                  <Text style={styles.buttonText}>Birthday</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#565eaf66',
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onPress={() => {
                    this.goToSC('Wedding');
                  }}>
                  <ImageBackground
                    style={styles.backgroundImageButton}
                    source={require('../assets/Wedding.jpg')}></ImageBackground>
                  <Text style={styles.buttonText}>Wedding</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565eaf',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    flex: 0.1,
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 20,
    color: '#fff',
    borderColor: 'white',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: '#fff',
  },
  backgroundImageButton: {
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'contain',
    justifyContent: 'center',
    height: 60,
    width: 60,
  },
});
