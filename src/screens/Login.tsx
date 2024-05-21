import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import CustomTI from '../components/CustomTI';
import { RegularFont, primaryColor, secondaryColor, white } from '../utils/Style';
import CustomButton from '../components/CustomButton';
import CustomTO from '../components/CustomTO';
import PasswordTI from '../components/PasswordTI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { LoginButton, AccessToken, LoginResult } from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [userInfo, setUserInfo] = useState({});
  const [secureEntry, setSecureEntry] = useState(true);
  const [NewStateLogin, setNewStateLogin] = useState('true');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const toggle = () => {
    setSecureEntry(!secureEntry);
  };

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        navigation.navigate('PrayerTiming');
        AsyncStorage.setItem('@Login', NewStateLogin);
        setEmail('');
        setPassword('');
        setSecureEntry(true);
      })
      .catch(err => console.warn(err));
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const newUser = await GoogleSignin.signIn();
      setUserInfo(newUser);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Sign-in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.error('Error signing in with Google:', error);
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1027853575227-65aa04l21r4eess13vifg9fc210r8jbh.apps.googleusercontent.com',
    });
  }, []);

  const handleFacebookLogin = (error: any, result: LoginResult) => {
    if (error) {
      console.log('login has error: ' + error);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken().then(data => {
        if (data) {
          console.log('AccessToken:', data?.accessToken.toString());
          console.log('Complete AccessToken Data:', data);
        } else {
          console.log('Failed to get access token.');
        }
      }).catch(err => {
        console.error('Error fetching access token:', err);
      });
    }
  };

  return (
    <View
      style={{
        height: height,
        width: width,
      }}>
      <ImageBackground
        source={require('../assets/images/Stars.jpeg')}
        resizeMode="cover"
        style={{ height: height, width: width }}>
        <View style={styles.subView}>
          <Text style={styles.welcomeText}>Welcome</Text>
        </View>
        <View style={styles.subViewTwo}>
          <CustomTI
            title={'Enter Your Email Address'}
            onChange={(val: string) => setEmail(val)}
            val={Email}
          />
          <PasswordTI
            title={'Enter Your Password'}
            password={secureEntry}
            action={toggle}
            onChange={(val: string) => setPassword(val)}
            val={Password}
          />
          <CustomButton title={'Login'} action={handleLogin} />
          <View style={{ alignSelf: 'center', marginTop: 10 }}>
            <LoginButton
              onLoginFinished={handleFacebookLogin}
              onLogoutFinished={() => console.log('logout.')}
            />
          </View>
          <View style={styles.googleSignInButton}>
            <CustomTO title={'Login with Google'} action={signIn} wd={'95%'} />
          </View>
          <CustomTO
            details={'Dont Have an Account ? '}
            title={'SignUp'}
            action={() => navigation.navigate('SignUp')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  subView: {
    height: '35%',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: RegularFont,
    color: white,
    marginBottom: 10,
  },
  subViewTwo: {
    justifyContent: 'flex-start',
    height: '55%',
  },
  googleSignInButton: {
    backgroundColor: 'white',
    width: '50%',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 20,
  },
});
