import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RegularFont, primaryColor } from '../utils/Style'

const DetailsText = (props:any) => {
  return (
    <View>
      <View style={styles.contentSubView}>
        <Text style={styles.nameText}>{props.title}</Text>
        <Text style={[styles.nameText1,{width:props.width}]}>{props.details}</Text>
      </View>
    </View>
  )
}

export default DetailsText

const styles = StyleSheet.create({
    nameText: {
        color: primaryColor,
        fontFamily: RegularFont,
        fontSize: 20,
        textAlign:'left' 
      },
      nameText1: {
        color: primaryColor,
        fontFamily: RegularFont,
        fontSize: 20,
        textAlign:'right',
      },
      contentMainView:{
        borderWidth:2,
        padding:5,
        margin:10
      },
      contentSubView:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10,
       
      }
})