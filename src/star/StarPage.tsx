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

const StarDeviceDiscoveryManager = NativeModules.StarDeviceDiscoveryManagerWrapper;
const StarDeviceDiscoveryEmitter = new NativeEventEmitter(NativeModules.StarDeviceDiscoveryManagerWrapper);

async function startDiscover(identifier: String) {
    if (identifier) {
        console.log(`#startDiscover# identifier: ${identifier}, begin..`);
        var result = await StarDeviceDiscoveryManager.startDiscovery(identifier, 10000);
        console.log(`#startDiscover# launch END. Result: ${result}`);
    }
}

export default function StarPage(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    var identifier: String;

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const onPrinterFound = async (event: any) => {
        console.log(`#onPrinterFound# identifier: ${event.identifier}, interfaceType: ${event.interfaceType}, connectionIdentifier: ${event.connectionIdentifier}, model: ${event.model}, emulation: ${event.emulation}`);
    }

    async function initDiscover(): Promise<void> {
        var result = await StarDeviceDiscoveryManager.init(["Usb"]);
        identifier = result;
        console.log(`#initDiscover# commpleted! identifier:${identifier}`);
    }

    useEffect(() => {
        var discoverySubscription = StarDeviceDiscoveryEmitter.addListener('PrinterFound', async (event: any) => {
            console.log(`#PrinterFound# identifier: ${event.identifier}, interfaceType: ${event.interfaceType}, connectionIdentifier: ${event.connectionIdentifier}, model: ${event.model}, emulation: ${event.emulation}`);
        });
        var discoveryFinshedSubscription = StarDeviceDiscoveryEmitter.addListener('DiscoveryFinished', async (params: any) => {
            console.log(`#DiscoveryFinished# -----------   ${params.identifier}`);
        });

        initDiscover();

        //
        return () => {
            discoverySubscription.remove();
            discoveryFinshedSubscription.remove();
            if (identifier) {
                StarDeviceDiscoveryManager.stopDiscovery(identifier);
                StarDeviceDiscoveryManager.dispose(identifier);
            }
        };
    });

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
                    <Button title='开始搜索打印机' onPress={() => {
                        startDiscover(identifier);
                    }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}