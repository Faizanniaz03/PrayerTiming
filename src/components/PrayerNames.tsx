import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RegularFont} from '../utils/Style';

const PrayerNames = ({name}:any) => {
  return (
      <View style={{ margin: 8}}>
        <Text style={{fontSize: 22, fontFamily: RegularFont,}}>
          {name}
        </Text>
      </View>
  );
};

export default PrayerNames;

const styles = StyleSheet.create({});
