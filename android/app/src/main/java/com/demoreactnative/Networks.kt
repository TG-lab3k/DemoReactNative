package com.demoreactnative

import android.content.Context
import android.net.ConnectivityManager
import android.util.Log
import java.net.Inet4Address
import java.net.InetAddress

internal const val NETWORKS_TAG = "HPOS-NETWORKS"

internal object Networks {
    fun getDeviceIP4(context: Context): String? {
        val connectivityManager =
            context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val hostAddress = connectivityManager.run {
            getLinkProperties(activeNetwork)?.let {
                it.linkAddresses.map { linkAddress -> linkAddress.address }
                    .firstOrNull { inetAddress -> isDeviceIP4(inetAddress) }?.hostAddress
            }
        }
        Log.d(NETWORKS_TAG, "#getDeviceIP# IP4: $hostAddress")
        return hostAddress
    }

    private fun isDeviceIP4(inetAddress: InetAddress): Boolean =
        inetAddress is Inet4Address && !inetAddress.isLoopbackAddress && inetAddress.isSiteLocalAddress
}