package com.zbwascanner.Sound

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.support.v4.media.MediaBrowserCompat
import android.support.v4.media.MediaMetadataCompat
import android.support.v4.media.session.MediaSessionCompat
import android.support.v4.media.session.PlaybackStateCompat
import androidx.core.app.NotificationCompat
import androidx.media.MediaBrowserServiceCompat
import com.google.android.exoplayer2.ExoPlayer
import com.google.android.exoplayer2.MediaItem
import com.google.android.exoplayer2.Player

class MyAudioService : MediaBrowserServiceCompat() {

    private lateinit var mediaSession: MediaSessionCompat
    private lateinit var exoPlayer: ExoPlayer

    private val NOTIFICATION_ID = 1
    private val CHANNEL_ID = "audio_channel_id"

    private val playlist = mutableListOf<String>()
    private var currentIndex = 0

    private val handler = Handler(Looper.getMainLooper())
    private val updateRunnable = object : Runnable {
        override fun run() {
            if (::exoPlayer.isInitialized && exoPlayer.isPlaying) {
                updateNotificationProgress()
                sendProgressUpdate()
                handler.postDelayed(this, 1000) // Update every second for smoother progress
            }
        }
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()

        mediaSession = MediaSessionCompat(this, "MyAudioService")
        sessionToken = mediaSession.sessionToken
        mediaSession.isActive = true

        exoPlayer = ExoPlayer.Builder(this).build()
        exoPlayer.addListener(object : Player.Listener {
            override fun onPlaybackStateChanged(state: Int) {
                when (state) {
                    Player.STATE_ENDED -> skipToNext()
                    Player.STATE_READY -> {
                        updateNotification() // Full notification update when ready
                        if (exoPlayer.isPlaying) {
                            startProgressUpdates()
                        }
                    }
                    Player.STATE_BUFFERING -> updateNotification()
                }
            }

            override fun onIsPlayingChanged(isPlaying: Boolean) {
                if (isPlaying) {
                    startProgressUpdates()
                } else {
                    stopProgressUpdates()
                }
                updateNotification() // Update play/pause button
            }
        })

        mediaSession.setCallback(object : MediaSessionCompat.Callback() {
            override fun onPlay() {
                playCurrent()
                startProgressUpdates()
            }

            override fun onPause() {
                exoPlayer.pause()
                updatePlaybackState(PlaybackStateCompat.STATE_PAUSED)
                stopProgressUpdates()
            }

            override fun onStop() {
                exoPlayer.stop()
                stopForeground(true)
                stopSelf()
                updatePlaybackState(PlaybackStateCompat.STATE_STOPPED)
                stopProgressUpdates()
            }

            override fun onSeekTo(pos: Long) {
                exoPlayer.seekTo(pos)
                updateNotificationProgress() // Immediate update after seek
                updatePlaybackState(
                    mediaSession.controller.playbackState?.state
                        ?: PlaybackStateCompat.STATE_PAUSED
                )
            }

            override fun onSkipToNext() = skipToNext()
            override fun onSkipToPrevious() = skipToPrevious()
        })
    }

    private fun startProgressUpdates() {
        handler.removeCallbacks(updateRunnable)
        handler.post(updateRunnable)
    }

    private fun stopProgressUpdates() {
        handler.removeCallbacks(updateRunnable)
    }

    private fun sendProgressUpdate() {
        val intent = Intent("AUDIO_PROGRESS")
        intent.putExtra("current", exoPlayer.currentPosition)
        intent.putExtra("duration", exoPlayer.duration)
        sendBroadcast(intent)
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Audio Playback",
                NotificationManager.IMPORTANCE_LOW
            )
            channel.setSound(null, null) // Disable notification sound
            val manager = getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(channel)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        intent?.action?.let {
            when (it) {
                "SET_PLAYLIST" -> {
                    val urls = intent.getStringArrayListExtra("URLS")
                    if (!urls.isNullOrEmpty()) {
                        playlist.clear()
                        playlist.addAll(urls)
                        currentIndex = 0
                        playCurrent()
                        updateNotificationProgress() // Add this line here
                    }
                }
                "PLAY_ACTION" -> {
                    mediaSession.controller.transportControls.play()
                    startProgressUpdates()
                    updateNotificationProgress()
                }
                "PAUSE_ACTION" -> {
                    mediaSession.controller.transportControls.pause()
                    stopProgressUpdates()
                }
                "NEXT_ACTION" -> {
                    mediaSession.controller.transportControls.skipToNext()
                    updateNotification()
                }
                "PREV_ACTION" ->{ 
                    mediaSession.controller.transportControls.skipToPrevious()
                    updateNotificationProgress()
                }
                "STOP_ACTION" -> {
                    mediaSession.controller.transportControls.stop()
                    updateNotificationProgress()
                }
                "SEEK_ACTION" -> {
                    val pos = intent.getLongExtra("POSITION", 0L)
                    mediaSession.controller.transportControls.seekTo(pos)
                }
            }
        }
        return START_STICKY
    }
    private fun playCurrent() {
        if (playlist.isEmpty()) return
    
        val url = playlist[currentIndex]
    
        // Create MediaItem with mediaId to detect same track
        val mediaItem = MediaItem.Builder()
            .setUri(url)
            .setMediaId(url)
            .build()
    
        // Only set media if new track
        if (exoPlayer.currentMediaItem == null || exoPlayer.currentMediaItem?.mediaId != url) {
            exoPlayer.setMediaItem(mediaItem)
            exoPlayer.prepare()
        }
    
        exoPlayer.play()
        updateNotificationProgress() // Add this line here
        mediaSession.setMetadata(
            MediaMetadataCompat.Builder()
                .putString(MediaMetadataCompat.METADATA_KEY_TITLE, "Song ${currentIndex + 1}")
                .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, "Artist")
                .putLong(MediaMetadataCompat.METADATA_KEY_DURATION, exoPlayer.duration)
                .build()
        )
        updatePlaybackState(PlaybackStateCompat.STATE_PLAYING)
    }

    private fun skipToNext() {
        if (currentIndex + 1 < playlist.size) {
            currentIndex++
            playCurrent()
        } else {
            mediaSession.controller.transportControls.stop()
        }
    }

    private fun skipToPrevious() {
        if (currentIndex - 1 >= 0) {
            currentIndex--
            playCurrent()
        } else {
            exoPlayer.seekTo(0)
        }
    }

    private fun updatePlaybackState(state: Int) {
        val playbackState = PlaybackStateCompat.Builder()
            .setState(state, exoPlayer.currentPosition, 1.0f)
            .setActions(
                PlaybackStateCompat.ACTION_PLAY or
                        PlaybackStateCompat.ACTION_PAUSE or
                        PlaybackStateCompat.ACTION_STOP or
                        PlaybackStateCompat.ACTION_SEEK_TO or
                        PlaybackStateCompat.ACTION_SKIP_TO_NEXT or
                        PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS
            )
            .build()
        mediaSession.setPlaybackState(playbackState)
        updateNotification()
    }

    private fun updateNotification() {
        updateNotificationProgress()
    }

    private fun updateNotificationProgress() {
        if (!::exoPlayer.isInitialized) return
    
        val metadata = mediaSession.controller.metadata
        val title = metadata?.getString(MediaMetadataCompat.METADATA_KEY_TITLE) ?: "Audio"
        val artist = metadata?.getString(MediaMetadataCompat.METADATA_KEY_ARTIST) ?: "Unknown"
        val isPlaying = exoPlayer.isPlaying
    
        val current = exoPlayer.currentPosition.coerceAtLeast(0)
        val total = exoPlayer.duration.coerceAtLeast(1)
    
        // Use different request codes for each PendingIntent to avoid conflicts
        val playIntent = PendingIntent.getService(
            this, 0,
            Intent(this, MyAudioService::class.java).setAction("PLAY_ACTION"),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )
        val pauseIntent = PendingIntent.getService(
            this, 1,
            Intent(this, MyAudioService::class.java).setAction("PAUSE_ACTION"),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )
        val nextIntent = PendingIntent.getService(
            this, 2,
            Intent(this, MyAudioService::class.java).setAction("NEXT_ACTION"),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )
        val prevIntent = PendingIntent.getService(
            this, 3,
            Intent(this, MyAudioService::class.java).setAction("PREV_ACTION"),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )
        val stopIntent = PendingIntent.getService(
            this, 4,
            Intent(this, MyAudioService::class.java).setAction("STOP_ACTION"),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )
    
        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(artist)
            .setSubText("${formatTime(current)} / ${formatTime(total)}")
            .setSmallIcon(android.R.drawable.ic_media_play)
            .setOngoing(isPlaying)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setOnlyAlertOnce(true)
            .setWhen(System.currentTimeMillis() - current)
            .setUsesChronometer(true)
            .setShowWhen(true)
            .setProgress(
                if (total > 0) total.toInt() else 0,
                if (total > 0) current.toInt() else 0,
                total <= 0
            )
            .setStyle(
                androidx.media.app.NotificationCompat.MediaStyle()
                    .setMediaSession(mediaSession.sessionToken)
                    .setShowActionsInCompactView(0, 1, 2)
                    .setShowCancelButton(true)
                    .setCancelButtonIntent(stopIntent)
            )
            .addAction(android.R.drawable.ic_media_previous, "Prev", prevIntent)
            .addAction(
                if (isPlaying) android.R.drawable.ic_media_pause else android.R.drawable.ic_media_play,
                if (isPlaying) "Pause" else "Play",
                if (isPlaying) pauseIntent else playIntent
            )
            .addAction(android.R.drawable.ic_media_next, "Next", nextIntent)
            .setContentIntent(mediaSession.controller.sessionActivity)
    
        val notificationManager = getSystemService(NotificationManager::class.java)
        if (isPlaying) {
            startForeground(NOTIFICATION_ID, builder.build())
        } else {
            // When paused or stopped, update the notification without starting foreground
            notificationManager?.notify(NOTIFICATION_ID, builder.build())
        }
    }

    private fun formatTime(ms: Long): String {
        val totalSeconds = ms / 1000
        val minutes = totalSeconds / 60
        val seconds = totalSeconds % 60
        return String.format("%d:%02d", minutes, seconds)
    }

    override fun onGetRoot(
        clientPackageName: String,
        clientUid: Int,
        rootHints: Bundle?
    ): BrowserRoot? = BrowserRoot("root_id", null)

    override fun onLoadChildren(
        parentId: String,
        result: Result<MutableList<MediaBrowserCompat.MediaItem>>
    ) {
        result.sendResult(null)
    }

    override fun onDestroy() {
        super.onDestroy()
        stopProgressUpdates()
        handler.removeCallbacksAndMessages(null)
        exoPlayer.release()
        mediaSession.release()
    }

    fun addToPlaylist(urls: List<String>) {
        playlist.addAll(urls)
    }
}