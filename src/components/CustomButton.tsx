import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RegularFont, primaryColor, secondaryColor, white } from '../utils/Style'

const CustomButton = (props:any) => {
  return (
    <View>
        <TouchableOpacity style={{
            width:props.width ? props.width :'30%',
            alignSelf:'center',
            backgroundColor:props.color ? props.color :secondaryColor,
            paddingHorizontal:20,
            alignContent:'center',
            paddingVertical:8,
            borderRadius:10,
        }} onPress={props.action} disabled={props.disable ? props.disable : false} >
            <Text style={{
                fontFamily:RegularFont,
                color:white,
                fontSize:20,
                textAlign:'center'
            }}>{props.title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({})