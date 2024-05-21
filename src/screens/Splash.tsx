import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RegularFont, primaryColor } from '../utils/Style'

const Splash = () => {
  return (
    <View style={{
      flex:1,
      justifyContent:'center'
    }}>
      <Text style={{
            fontSize: 30,
            color: primaryColor,
            fontFamily: RegularFont,
            textAlign: 'center',
            margin: 20
        }}>
          Installment Corporation
        </Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})