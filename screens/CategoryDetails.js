import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import db from '../config';

export default class CategoryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.route.params.category['description'],
      imageurl: this.props.route.params.category['imageurl'],
      cost: this.props.route.params.category['cost'],
      subcategory: this.props.route.params.category['subcategory'],
      customisation: '',
      dateTime: '',
      location: '',
      email: firebase.auth().currentUser.email,
      firstName: '',
      contact: '',
    };
  }

  getUserDetails = () => {
    try {
      db.collection('users')
        .where('email', '==', this.state.email)
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            this.setState({
              firstName: doc.data().name,
              contact: doc.data().contact,
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
  registerInterest = () => {
    if (this.state.dateTime && this.state.location) {
      db.collection('requests').add({
        email: this.state.email,
        subcategory: this.state.subcategory,
        customisation: this.state.customisation,
        location: this.state.location,
        dateTime: this.state.dateTime,
        contact: this.state.contact,
        name: this.state.firstName,
        status:"awaited",
        imageurl:this.state.imageurl
      });
      this.props.navigation.goBack();

      alert(
        'Thank you :) Your Interest is registered successfully, give us time to get back to you, you may also check previous requests section for more details'
      );
    } else {
      alert('Enter details properly');
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <LinearGradient
          style={{
            flex: 1,
            padding:5
          }}
          colors={['#ea7ebb', '#FC9494']}
          start={{ x: 0.01, y: 0.01 }}
          end={{ x: 0.99, y: 0.99 }}>
          <View   style={{marginTop:40,marginLeft:20, alignSelf:"flex-start"}}>
          <Icon
            name="arrow-back"
            type="Ionicons"
            color="white"
            size={20}
         
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          </View>
          <Image
            style={{
              marginTop: 10,
              width: "85%",
              height: 150,
              borderRadius: 10,
              alignSelf: 'center',
              resizeMode:"contain"
            }}
            source={{ uri: this.state.imageurl }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginTop: 50,
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <ScrollView style={{ flex: 1, width: '100%' }}>
              <View>
                <Text
                  style={{
                    marginTop: 20,
                    fontWeight: 'bold',
                    fontSize: 20,
                    alignSelf: 'center',
                  }}>
                  {this.state.subcategory}
                </Text>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 10,
                    margin: 10,
                    padding: 10,
                    backgroundColor: '#565eaf66',
                  }}>
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 18,
                      alignSelf: 'center',
                    }}>
                    {this.state.description}
                  </Text>
                </View>
                <View
                  style={{
                    width: '85%',
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    margin: 10,
                    padding: 10,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      alignSelf: 'center',
                    }}>
                    Approx Cost:
                  </Text>
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderRadius: 10,
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        alignSelf: 'center',
                      }}>
                      {this.state.cost} Rs/-
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 10,
                    margin: 10,
                    padding: 10,
                    backgroundColor: '#565eaf66',
                  }}>
                  <Text
                    style={{
                      marginTop: 20,
                      fontWeight: 'bold',
                      fontSize: 18,
                      alignSelf: 'center',
                    }}>
                    Interested? Fill out the form below:
                  </Text>
                  <TextInput
                    style={{
                      width: '85%',
                      padding: 5,
                      margin: 5,
                      height: 50,
                      borderWidth: 0.5,
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                    placeholderTextColor={"gray"}

                    placeholder={'Enter Location/Address'}
                    onChangeText={(val) => {
                      this.setState({ location: val });
                    }}
                    value={this.state.location}
                  />
                  <TextInput
                    style={{
                      width: '85%',
                      padding: 5,
                      margin: 5,
                      height: 50,
                      borderWidth: 0.5,
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                    placeholder={'Enter Date and time'}
                    placeholderTextColor={"gray"}
                    onChangeText={(val) => {
                      this.setState({ dateTime: val });
                    }}
                    value={this.state.dateTime}
                  />
                  <TextInput
                    style={{
                      width: '85%',
                      padding: 5,
                      margin: 5,
                      height: 50,
                      borderWidth: 0.5,
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                    placeholderTextColor={"gray"}

                    placeholder={'Enter Customisation, if any...'}
                    multiline={true}
                    onChangeText={(val) => {
                      this.setState({ customisation: val });
                    }}
                    value={this.state.customisation}
                  />
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
                  onPress={() => this.registerInterest()}>
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
                      Submit
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
