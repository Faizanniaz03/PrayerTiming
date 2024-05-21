import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { secondaryColor } from '../utils/Style'

const VerticalLine = () => {
  return (
    <View
          style={{
            backgroundColor: secondaryColor,
            height: 45,
            width: 2,
            alignSelf: 'center',
            justifyContent: 'center',
          }}></View>
  )
}

export default VerticalLine

const styles = StyleSheet.create({})