import React from 'react';
import { View, Image, StyleSheet, ScrollView, Button } from 'react-native';
import CustomHeader from '@components/CustomHeader';
import { playAudio, setPlaylist } from '@nativeModules';

const ExploreScreen: React.FC = () => {
  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleBellPress = () => {
    console.log('Bell pressed');
  };

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        title="Music"
        onMenuPress={handleMenuPress}
        onBellPress={handleBellPress}
        backgroundColor="#1E40AF"
        textColor="#FFFFFF"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Button
          title="Explore Music"
          onPress={async () => {
            const sound1 = require('../assets/sound/sample1.mp3');
            const sound2 = require('../assets/sound/sample1.mp3');
            const uri1 = Image.resolveAssetSource(sound1).uri;
            const uri2 = Image.resolveAssetSource(sound2).uri;
            console.log('Sound URIs:', uri1, uri2);
            await setPlaylist([sound1, sound2]);
            await playAudio();
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
});

export default ExploreScreen;
