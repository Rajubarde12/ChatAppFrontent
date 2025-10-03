package com.zbwascanner.Sound

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableType

class SoundModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "AudioModule"

    @ReactMethod
    fun playUrls(urls: ReadableArray) {
        val playlist = mutableListOf<String>()
        for (i in 0 until urls.size()) {
            if (urls.getType(i) == ReadableType.String) {
                playlist.add(urls.getString(i)!!)
            }
        }
        val context = reactApplicationContext
        val intent = Intent(context, MyAudioService::class.java)
        intent.action = "SET_PLAYLIST"
        intent.putStringArrayListExtra("URLS", ArrayList(playlist))
        context.startService(intent)
    }

    @ReactMethod
    fun play() {
        val context = reactApplicationContext
        val intent = Intent(context, MyAudioService::class.java)
        intent.action = "PLAY_ACTION"
        context.startService(intent)
    }

    @ReactMethod
    fun pause() {
        val context = reactApplicationContext
        val intent = Intent(context, MyAudioService::class.java)
        intent.action = "PAUSE_ACTION"
        context.startService(intent)
    }

    @ReactMethod
    fun next() {
        val context = reactApplicationContext
        val intent = Intent(context, MyAudioService::class.java)
        intent.action = "NEXT_ACTION"
        context.startService(intent)
    }

    @ReactMethod
    fun previous() {
        val context = reactApplicationContext
        val intent = Intent(context, MyAudioService::class.java)
        intent.action = "PREV_ACTION"
        context.startService(intent)
    }
}
