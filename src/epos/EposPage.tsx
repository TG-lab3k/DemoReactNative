import React, { useState, useEffect } from 'react';

import type { PropsWithChildren } from 'react';
import {
  NativeModules,
  NativeEventEmitter,
  EventSubscription,
  DeviceEventEmitter,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const eposPrinterDiscovery = NativeModules.EscPosPrinterDiscovery;
const eposPrintery = NativeModules.EscPosPrinter;
const eventEmitter = new NativeEventEmitter(NativeModules.EscPosPrinterDiscovery);

async function startDiscover() {
  console.log('开始搜索打印机');
  var discoverResult = await eposPrinterDiscovery.discover({ findFirstAndroid: true, usbSerialNumber: true, scanningTimeoutAndroid: 900000 });
  console.log(`搜索完成: ${discoverResult}`);
}

export default function EposPage(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const onDiscoveryDone = (event: any) => {
    console.log('打印机搜索成功！！！');
    console.log(`#onDiscoveryDone# ${event}`);
  }
  useEffect(() => {
    console.log('entry epos discovery page');
    //var discoverySubscription = DeviceEventEmitter.addListener("onDiscoveryDone", onDiscoveryDone);
    var discoverySubscription = eventEmitter.addListener('onDiscoveryDone', async (params: any) => {
      console.log('打印机搜索成功！！！');
      for (let deviceInfo of params) {
        console.log(`#onDiscoveryDone# usbSerialNumber: ${deviceInfo.usbSerialNumber}, target: ${deviceInfo.target}, usb: ${deviceInfo.usb}, DeviceName: ${deviceInfo.name}`);

        /*
        await eposPrintery.init({
          target: deviceInfo.target,
          seriesName: 'EPOS2_TM_U220',
          language: 'EPOS2_LANG_EN',
        });
        const printing = new eposPrintery.printing();
        await printing.initialize().align('center').text("测试").newline()
          .cut()
          .send();
          */
      }
    })

    return () => {
      console.log('back epos discovery page');
      discoverySubscription.remove();
    }
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
        <Header title='Eposn Discovery' />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button title='Discovery Eposn' onPress={() => {
            startDiscover();
          }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}