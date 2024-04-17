/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {PermissionsAndroid, Text, View} from 'react-native';
import Config from 'react-native-config';

import codePush from 'react-native-code-push';

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

function App(): React.JSX.Element {
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ENV: {Config.ENV}</Text>
    </View>
  );
}

export default codePush(codePushOptions)(App);
