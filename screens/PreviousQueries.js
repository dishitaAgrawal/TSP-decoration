import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import firebase from 'firebase';
import db from '../config';
import { Header, Icon } from 'react-native-elements';

// Phone call Dependency
import call from 'react-native-phone-call';
export default class PreviousQueries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      email: firebase.auth().currentUser.email,
    };
  }
  getUserDetails = () => {
    try {
      db.collection('requests').where("email","==", this.state.email).onSnapshot((snapshot) => {
        var categoryList = [];
        console.log(this.state.email)
        snapshot.docs.map((doc) => {
          var sc = doc.data();
        console.log(sc)

          sc['docId'] = doc.id;
          categoryList.push(sc);
        });
        this.setState({
          requests: categoryList,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getUserDetails();
  }
  renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          margin: 10,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#565eaf',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 15,
          }}>
          <View style={styles.dview}>
            <Text style={styles.bnText}>{item.subcategory}</Text>

            <Text
              style={[styles.bnText1, { color: '#FC9494' }]}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {item.customisation}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.bnText1}>On {item.dateTime}</Text>
              <View style={[styles.likeButtonContainer, { width: '40%' }]}>
                <Text style={styles.iText}>{item.status}</Text>
              </View>
            </View>
          </View>
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 10,
              alignSelf: 'center',
            }}
            source={{ uri: item.imageurl }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.likeButtonContainer}
            onPress={() => {
              this.sendWhatsapp();
            }}>
            <Entypo name={'message'} size={18} color="#fff" />

            <Text style={styles.iText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.likeButtonContainer}
            onPress={() => {
              this.dialCall();
            }}>
            <Entypo name={'phone'} size={18} color="#fff" />

            <Text style={styles.iText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.likeButtonContainer}
            onPress={() => {
              this.deleteRequest(item.docId);
            }}>
            <Entypo name={'trash'} size={18} color="#fff" />
            <Text style={styles.iText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  sendWhatsapp = () => {
    var number = '8130506678';

    Linking.openURL(
      'http://api.whatsapp.com/send?phone=91' +
        number +
        '&text=Hello There how are you?'
    );
  };
  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      var num = '8130506678';
      phoneNumber = 'tel:${' + num + '}';
    } else {
      phoneNumber = 'telprompt:${' + num + '}';
    }

    Linking.openURL(phoneNumber);
  };

  deleteRequest = (docId) => {
    db.collection('requests').doc(docId).delete();
    alert("Request deleted")
  };
  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View>
        <Header
          centerComponent={{
            text: 'Previous Queries',
            style: {
              margin: 2,
              padding: 2,
              fontWeight: 'bold',
              fontSize: 20,
              color: 'white',
            },
          }}
          backgroundColor={'#ea7ebb'}
         
        />
        <View>
          <FlatList
            data={this.state.requests}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#565eaf',
  },
  bnText1: {
    fontSize: 14,
    color: '#565eaf',
  },
  iText: {
    color: 'white',
    textAlign: 'center',
    marginLeft: 5,
  },
  dview: {
    flex: 1,
    padding: 5,
    margin: 10,
  },

  likeButtonContainer: {
    alignItems: 'center',
    borderColor: '#565eaf',
    flexDirection: 'row',
    margin: 5,
    backgroundColor: '#565eaf66',
    justifyContent: 'space-evenly',
    width: '30%',
    padding: 5,
    borderRadius: 5,
  },
});
