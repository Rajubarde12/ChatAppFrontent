import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '@components/CustomHeader';

const DetailsScreen: React.FC = () => {
  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleBellPress = () => {
    console.log('Bell pressed');
  };

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        title="Details"
        onMenuPress={handleMenuPress}
        onBellPress={handleBellPress}
        backgroundColor="#1E40AF"
        textColor="#FFFFFF"
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Details</Text>
        <Text style={styles.subtitle}>View detailed information</Text>
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

export default DetailsScreen;


