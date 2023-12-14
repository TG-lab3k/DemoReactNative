package com.demoreactnative

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

const val MODULE_NAME = "HPOSNetworks"

@ReactModule(name = MODULE_NAME)
class HPOSNetworkModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = MODULE_NAME

    @ReactMethod
    fun getNetworkState(promise: Promise) {
        val context = this@HPOSNetworkModule.reactApplicationContext.applicationContext
        val ip4 = Networks.getDeviceIP4(context)
        val networkInfo = Arguments.createMap()
        networkInfo.putString("ip4", ip4)
        promise.resolve(networkInfo)
    }
}