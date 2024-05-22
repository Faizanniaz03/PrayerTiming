import { StyleSheet } from "react-native";
const primaryColor = '#F7D0B4'
const secondaryColor ='#ED712D'
const RegularFont = 'Outfit-Medium'
const black = 'black'
const white = 'white'
const Bold = 'Outfit-Bold'

const Styles = StyleSheet.create({
    PrayerTimes:{
        width: '90%',
        height: '20%',
        backgroundColor: '#e2ddd9',
        alignSelf: 'center',
        margin: 20,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
      },
      PrayerTimes2:{
        width: '90%',
        marginTop:20,
        height: '45%',
        backgroundColor: '#e2ddd9',
        alignSelf: 'center',
        borderRadius: 20,
        padding: 20,
      }
})

export{primaryColor,secondaryColor,RegularFont,black,white,Bold,Styles}