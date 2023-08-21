import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GetStartedScreen from "../screens/GetStartedScreen"
import LoginScreen from "../screens/LoginScreen"
import SignUpScreen from "../screens/SignUpScreen"
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"
import Feedback from "../screens/Feedback"
import PreviousQueries from "../screens/PreviousQueries"
import Profile from "../screens/Profile"
import Home from "../screens/Home"
import SubCategory from "../screens/SubCategory"
import CategoryDetails from "../screens/CategoryDetails"
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
const Stack = createStackNavigator()
const HStack = createStackNavigator()
const Drawer = new createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}  drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="PreviousQueries" component={PreviousQueries} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};
const HomeStack =()=>{
  return(
    <HStack.Navigator screenOptions={{ headerShown: false }}>
    <HStack.Screen name = "HomeScreen" component={Home}/>
    <HStack.Screen name = "SubCategory" component={SubCategory}/>
    <HStack.Screen name = "CategoryDetails" component={CategoryDetails}/>

    </HStack.Navigator>
  )
}
const MyStack =()=>{
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name = "GetStarted" component={GetStartedScreen}/>
    <Stack.Screen name = "LoginScreen" component={LoginScreen}/>
    <Stack.Screen name = "SignUpScreen" component={SignUpScreen}/>
    <Stack.Screen name = "ForgotPasswordScreen" component={ForgotPasswordScreen}/>
    <Stack.Screen name = "Drawer" component={DrawerNav}/>

    </Stack.Navigator>
  )
}



export default MyStack