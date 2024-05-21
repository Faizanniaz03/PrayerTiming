import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {DotIndicator} from 'react-native-indicators'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Splash from './src/screens/Splash'
import PrayerTiming from './src/screens/PrayerTiming'
const Stack = createNativeStackNavigator()
import SplashScreen from 'react-native-splash-screen'
const App = () => {
    useEffect(()=>{
        SplashScreen.hide()
    },[])
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='PrayerTiming'>
                <Stack.Screen name='PrayerTiming' component={PrayerTiming}/>
            </Stack.Navigator>
        </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
