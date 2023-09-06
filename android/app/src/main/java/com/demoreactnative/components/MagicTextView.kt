package com.demoreactnative.components

import android.content.Context
import androidx.appcompat.widget.AppCompatTextView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.annotations.ReactProp

class MagicTextView(private val reactContext: ReactApplicationContext, context: Context) :
    AppCompatTextView(context) {
}