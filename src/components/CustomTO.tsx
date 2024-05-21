import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { black, primaryColor, white } from '../utils/Style'

const CustomTO = ({ title, action, details }:any) => {
  return (
    <View>

      <View style={styles.mainView}>
        <Text style={styles.detailsText}>
          {details}
        </Text>
        <TouchableOpacity activeOpacity={0.4} onPress={action} style={{marginLeft:5}}>
          <Text style={styles.titleText}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default CustomTO

const styles = StyleSheet.create({
  mainView:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop:10
  },
  detailsText:{
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  titleText:{
    color: black,
    fontFamily: 'Poppins-Medium',
  }


})