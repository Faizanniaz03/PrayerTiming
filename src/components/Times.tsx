import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Bold, RegularFont, black } from '../utils/Style'

const Times = ({time,title,Align}:any) => {
  return (
    <View style={{width:'100%',flexDirection:'row'}}>
      <View style={{width: '100%',paddingHorizontal:8,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text
            style={{textAlign:Align, fontSize: 18, fontFamily: RegularFont}}>
            {title}
          </Text>
          <Text
            style={{
              textAlign: Align,
              fontSize: 18,
              color: black,
              fontFamily: Bold,
              margin:7
            }}>
            {time}
          </Text>
        </View>
    </View>
  )
}

export default Times

const styles = StyleSheet.create({})