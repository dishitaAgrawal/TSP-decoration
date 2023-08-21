import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TextInput,
  Button,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import db from '../config';
import { Header, Icon } from 'react-native-elements';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      firstName: '',
      contact: '',
      docID: '',
    };
    this.boy =
      'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000';
  }
  getUserDetails = () => {
    try {
      db.collection('users')
        .where('email', '==', this.state.userId)
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            this.setState({
              firstName: doc.data().name,
              contact: doc.data().contact,
              docID: doc.id,
            });
          });
        });
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getUserDetails();
  }
  updateDetails = async () => {
    try {
      db.collection('users').doc(this.state.docID).update({
        firstName: this.state.firstName,
        contact: this.state.contact,
      });
      Alert.alert('Profile Updated');
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
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
        <ScrollView>
          <Image
            source={{ uri: this.boy }}
            style={{
              width: 150,
              height: 150,
              marginTop: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 100,
            }}
          />

          <Text
            style={{
              marginTop: 15,
              color: '#FC9494',
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            {this.state.userId}
          </Text>

          <Text style={styles.gText}>Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'First Name'}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
            value={this.state.firstName}
          />

          <Text style={styles.gText}>Contact</Text>
          <TextInput
            style={styles.textInput}
            placeholder={'Contact'}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
            value={this.state.contact}
          />

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
                  this.updateDetails();
                }}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
  },
  gText: {
    marginLeft: 16,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#565eaf',
  },
  button1: {
    width: 120,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textInput: {
    marginLeft: 15,
    outline: 'none',
    borderBottomWidth: 1,
    width: '90%',
    height: 40,
    fontSize: 15,
  },
  button: {
    width: '35%',
    margin: 20,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
