// SoundService.ts
import { NativeModules } from 'react-native';

interface ISoundModule {
  playUrls(urls: string[]): Promise<string>;
  play(): Promise<string>;
  pause(): Promise<string>;
  stop(): Promise<string>;
  next(): Promise<string>;
  previous(): Promise<string>;
  seekTo(position: number): Promise<string>;
}

// Type-safe access
const { AudioModule } = NativeModules; 
export const soundModule = AudioModule as ISoundModule;

// Playlist wrapper
export const setPlaylist = async (urls: string[]): Promise<void> => {
  try {
    await soundModule.playUrls(urls);
    console.log('Playlist set:', urls);
  } catch (error) {
    console.error('Error setting playlist:', error);
  }
};

// Playback controls
export const playAudio = async (): Promise<void> => {
  try {
    await soundModule.play();
  } catch (error) {
    console.error('Error playing audio:', error);
  }
};

export const pauseAudio = async (): Promise<void> => {
  try {
    await soundModule.pause();
  } catch (error) {
    console.error('Error pausing audio:', error);
  }
};

export const stopAudio = async (): Promise<void> => {
  try {
    await soundModule.stop();
  } catch (error) {
    console.error('Error stopping audio:', error);
  }
};

export const nextAudio = async (): Promise<void> => {
  try {
    await soundModule.next();
  } catch (error) {
    console.error('Error skipping to next track:', error);
  }
};

export const previousAudio = async (): Promise<void> => {
  try {
    await soundModule.previous();
  } catch (error) {
    console.error('Error skipping to previous track:', error);
  }
};

export const seekAudio = async (position: number): Promise<void> => {
  try {
    await soundModule.seekTo(position);
  } catch (error) {
    console.error('Error seeking audio:', error);
  }
};
