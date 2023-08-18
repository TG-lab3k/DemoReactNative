import { Component } from 'react';
import {
    NativeModules,
    NativeEventEmitter,
    EventSubscription
} from 'react-native';

const eposPrinterDiscovery = NativeModules.EscPosPrinterDiscovery;

export class EposDiscovery {

    async start() {
        console.log('开始搜索打印机');
        var deviceInfo = await eposPrinterDiscovery.discover({ findFirstAndroid: true, usbSerialNumber: true });
        console.log(`搜索结果: ${deviceInfo}`);
    }

    async onDiscoveryDone(printerData: String[]) {
        console.log(`onDiscoveryDone: ${printerData}`);
    }
}