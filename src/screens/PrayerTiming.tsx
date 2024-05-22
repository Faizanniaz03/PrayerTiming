import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Bold,
  RegularFont,
  Styles,
  black,
  primaryColor,
  secondaryColor,
} from '../utils/Style';
import PrayerBox from '../components/PrayerBox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Times from '../components/Times';
import BellAndText from '../components/BellAndText';
import PrayerNames from '../components/PrayerNames';
import { DotIndicator } from 'react-native-indicators';
import { useFocusEffect } from '@react-navigation/native';

interface TimingItem {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  shurooq: string;
  date_for: string;
}

interface Data {
  status_code: number;
  items: any;
  country:string
}

const PrayerTiming: React.FC = () => {
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);
  const [Loader, setLoader] = useState<boolean>(true);
  const [TimingsData, setTimingsData] = useState<Data | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>('Rahim yar Khan');
  const [countryName, setCountryName] = useState<string>('Pakistan');
  const [newCity, setNewCity] = useState<string>('');

  const { height, width } = useWindowDimensions();

  const convertTo24HourFormat = (time: string): string => {
    if (typeof time !== 'string') {
      throw new Error('Expected time to be a string');
    }

    const [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (period.toLowerCase() === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');

    return hoursStr + minutesStr;
  };

  const prayerTimingUpdate = () => {
    const prayerTimes = TimingsData?.items[0];
    if (!prayerTimes) {
      Alert.alert('No prayer times available in TimingsData');
      return;
    }
    const now = new Date();
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const realTime = currentHours + currentMinutes;
    let current: string | null = null;
    let next: string | null = null;
    const prayers: (keyof TimingItem)[] = [
      'fajr',
      'dhuhr',
      'asr',
      'maghrib',
      'isha',
    ];
    for (let i = 0; i < prayers.length; i++) {
      const prayer = prayers[i];
      const currentPrayerTime = convertTo24HourFormat(prayerTimes[prayer]);

      if (realTime >= currentPrayerTime) {
        current = prayer;
        next = prayers[(i + 1) % prayers.length];
      } else {
        next = prayer;
        break;
      }
    }

    setCurrentPrayer(current);
    setNextPrayer(next);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://muslimsalat.com/${cityName}.json?key=7e664c1fb3b6eb58519e5132e40ca62b`,
      );
      const toJson: Data = await response.json();
      if (toJson.status_code === 101 || 0) {
        setCityName('Rahim yar Khan');
        Alert.alert('Invalid city name');
        setLoader(false);
        return;
      }
      console.log('🚀 ~ fetchData ~ toJson:', JSON.stringify(toJson));
      setTimingsData(toJson);
      setLoader(false);
    } catch (error: any) {
      Alert.alert('Error fetching data', error.message);
      setLoader(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [cityName])
  );
  useEffect(() => {
    if (TimingsData) {
      prayerTimingUpdate();
    }
  }, [TimingsData]);
 const search = async () => {
  if (!visible) {
    setVisible(true);
  } else {
    if (!newCity) {
      setCityName('Rahim yar Khan');
    } else {
      setCityName(newCity);
    }
    setLoader(true);
    setVisible(false);
    try {
      await fetchData();
    } catch (error: any) {
      Alert.alert('Error fetching data:', error);
    } finally {
      setLoader(false);
      setNewCity('');
    }
  }
};
  const gregorianToHijriArabic = (gregorianDate: string): string => {
    const hijriDate = new Date(gregorianDate);
    const intl = new Intl.DateTimeFormat('ar-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return intl.format(hijriDate);
  };

  return (
    <View style={{ height: height, width: width}}>
      {Loader ? (
        <View style={{ height: height, justifyContent: 'center' }}>
          <DotIndicator color={secondaryColor} size={20} />
        </View>
      ) : (
        <View style={{ height: height }}>
          <View style={styles.headerView}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.IslamicDate}>
                {TimingsData?.items[0].date_for}<Text style={{ fontSize: 12 }}>BC</Text>
                <Text style={{ fontSize: 12 }}> </Text>
              </Text>
              <TouchableOpacity style={styles.searchButton}>
                <FontAwesome
                  name="search"
                  size={30}
                  color={secondaryColor}
                  onPress={search}
                />
              </TouchableOpacity>
            </View>
            <View>
            <Text style={styles.IslamicDate}>
                {gregorianToHijriArabic(TimingsData?.items[0].date_for)}
                <Text style={{ fontSize: 12 }}> </Text>
              </Text>
              <TextInput
              returnKeyType='search'
              onSubmitEditing={search}
                style={{
                  width: 300,
                  borderWidth: 3,
                  borderColor: secondaryColor,
                  borderRadius: 20,
                  fontFamily: RegularFont,
                  marginTop: 10,
                  display: visible ? 'flex' : 'none',
                  textAlign:'center',
                  color:black
                }}
                onChangeText={val => setNewCity(val)}
                value={newCity}
                placeholder="Search City Name"
                placeholderTextColor={black}
              />
            </View>
          </View>
          <View style={styles.PrayerBoxView}>
            <PrayerBox
              first={'Now time is'}
              Prayer={
                currentPrayer
                  ? currentPrayer.charAt(0).toUpperCase() +
                    currentPrayer.slice(1)
                  : ''
              }
              Time={
                currentPrayer
                  ? TimingsData?.items[0][currentPrayer as keyof TimingItem]
                  : ''
              }
              color={primaryColor}
            />
            <PrayerBox
              first={'Next Prayer is'}
              Prayer={
                nextPrayer
                  ? nextPrayer.charAt(0).toUpperCase() + nextPrayer.slice(1)
                  : ''
              }

              Time={
                nextPrayer
                  ? TimingsData?.items[0][nextPrayer as keyof TimingItem]
                  : ''
              }
              color={'#e2ddd9'}
            />
          </View>
          <View style={Styles.PrayerTimes2}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 10}}>
                <FontAwesome name="map-marker" size={30} color={black}/>
              </View>
              <View>
                <Text style={{fontSize: 24, fontFamily: Bold, color: black}}>
                  {cityName}
                </Text>
                <Text style={{fontSize: 16,color:black}}>{TimingsData?.country}</Text>
              </View>
            </View>
            <View style={styles.PrayerTimesView}>
              <View>
                <PrayerNames name={'Fajr'} />
                <PrayerNames name={'Dhuhr'} />
                <PrayerNames name={'Asr'} />
                <PrayerNames name={'Maghrib'} />
                <PrayerNames name={'Isha'} />
              </View>
              <View style={{flexDirection: 'column'}}>
                <BellAndText time={TimingsData?.items[0]?.fajr} />
                <BellAndText time={TimingsData?.items[0]?.dhuhr} />
                <BellAndText time={TimingsData?.items[0]?.asr} />
                <BellAndText time={TimingsData?.items[0]?.maghrib} />
                <BellAndText time={TimingsData?.items[0]?.isha} />
              </View>
            </View>
          </View>
          <View style={[Styles.PrayerTimes, {height: '10%'}]}>
            <Times
              time={TimingsData?.items[0].shurooq}
              title={'SUNRISE'}
              Align={'left'}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default PrayerTiming;

const styles = StyleSheet.create({
  PrayerTimesView: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IandSTime: {
    textAlign: 'right',
    fontSize: 26,
    color: black,
    fontFamily: Bold,
  },
  headerView: {
    margin: 15,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  IslamicDate: {
    fontSize: 24,
    color: black,
    fontFamily: Bold,
    textAlign: 'center',
  },
  EnglishDate: {fontSize: 16, fontFamily: RegularFont, textAlign: 'center'},
  PrayerBoxView: {flexDirection: 'row', height: '20%', marginBottom: 20},
  BellView: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchButton: {
    textAlign: 'center',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
});
