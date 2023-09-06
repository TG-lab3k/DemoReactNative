package com.demoreactnative.components

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

/**
 * https://reactnative.cn/docs/native-components-android
 */
private const val COMPONENT_NAME = "MagicTextView"
internal const val TAG = COMPONENT_NAME

class MagicTextViewManager(private val reactContext: ReactApplicationContext) :
    SimpleViewManager<MagicTextView>() {

    override fun getName(): String {
        return COMPONENT_NAME
    }

    override fun createViewInstance(context: ThemedReactContext): MagicTextView {
        Log.d(TAG, "MagicTextViewManager@createViewInstance ...")
        val textView = MagicTextView(reactContext, context)
        textView.text = "默认文本"
        return textView
    }

    @ReactProp(name = "text")
    fun setText(textView: MagicTextView, text: String) {
        Log.d(TAG, "MagicTextViewManager@createViewInstance setText ..")
        textView.text = text
    }
}