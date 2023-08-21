import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import db from '../config';

import { Header, Icon } from 'react-native-elements';
export default class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subcategoryList: [],
      category: this.props.route.params.category,
    };
  }
  componentDidMount() {
    db.collection(this.state.category).onSnapshot((snapshot) => {
      var categoryList = [];
      snapshot.docs.map((doc) => {
        var sc = doc.data();
        sc['docId'] = doc.id;
        categoryList.push(sc);
      });
      this.setState({
        subcategoryList: categoryList,
      });
    });
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#565eaf66',
          borderRadius: 10,
          padding: 5,
          justifyContent: 'center',
          width: '95%',
          alignSelf: 'center',
          margin: 5,
          flexDirection: 'row',
        }}
        onPress={() => {
          this.props.navigation.navigate('CategoryDetails', {
            category: item,
          });
        }}>
        <Image
          style={{ width: 80, height: 80, borderRadius: 10 }}
          source={{ uri: item.imageurl }}
        />

        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
          <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>
            {item.subcategory.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Header
          leftComponent={
            <Icon
              name="arrow-back"
              type="Ionicons"
              color="white"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'Sub Category Screen',
            style: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor="#ea7ebb"
        />
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={this.state.subcategoryList}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
      </View>
    );
  }
}
