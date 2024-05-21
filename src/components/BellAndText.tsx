import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RegularFont, secondaryColor } from '../utils/Style'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const BellAndText = ({time}:any) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:22,fontFamily:RegularFont,margin:8,}}>{time}</Text>
    <FontAwesome name='bell' size={16.5} color={secondaryColor}/>
</View>
  )
}

export default BellAndText

const styles = StyleSheet.create({})