package com.demoreactnative

import com.demoreactnative.components.MagicTextViewManager
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager

class MagicReactPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        return mutableListOf(HPOSNetworkModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): MutableList<SimpleViewManager<*>> {
        return mutableListOf(MagicTextViewManager(reactContext))
    }
}