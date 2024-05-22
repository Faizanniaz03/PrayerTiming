import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Bold, RegularFont, black, primaryColor, secondaryColor } from '../utils/Style'

const PrayerBox = ({first,Prayer,Time,EndTime,color}:any) => {
  return (
    <View style={{
        width:'45%',
        backgroundColor:color,
        height:'100%',
        margin:10,
        borderRadius:20,
        padding:20
    }}>
      <Text style={{fontFamily:RegularFont,fontSize:16,color:black}}>{first}</Text>
      <Text style={{color:secondaryColor,fontSize:26,fontFamily:RegularFont}}>{Prayer}</Text>
      <Text style={{fontSize:30,color:black,fontFamily:Bold}}>{Time}</Text>
    </View>
  )
}

export default PrayerBox

const styles = StyleSheet.create({})