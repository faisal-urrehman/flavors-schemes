/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from 'react-native';
import Config from 'react-native-config';

import codePush from 'react-native-code-push';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    requestNotfiicationPermission();
  }, []);

  const requestNotfiicationPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log({token});
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
      </ScrollView>
      <Text>Only for prod: {Config.ENV}</Text>
    </SafeAreaView>
  );
}

export default codePush(codePushOptions)(App);
