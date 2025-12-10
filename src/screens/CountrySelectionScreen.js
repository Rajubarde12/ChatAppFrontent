import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../../utils/colors';
import AppBar from '../components/common/AppBar';
import Input from '../components/common/Input';
import { SearchIcon } from '../components/icons';

const COUNTRIES = [
  { name: 'Afghanistan', code: 'AF', dial: '+93', emoji: '🇦🇫' },
  { name: 'Albania', code: 'AL', dial: '+355', emoji: '🇦🇱' },
  { name: 'Algeria', code: 'DZ', dial: '+213', emoji: '🇩🇿' },
  { name: 'India', code: 'IN', dial: '+91', emoji: '🇮🇳' },
  { name: 'United States', code: 'US', dial: '+1', emoji: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dial: '+44', emoji: '🇬🇧' },
  { name: 'Canada', code: 'CA', dial: '+1', emoji: '🇨🇦' },
];

const popularCountries = [
  { name: 'United States', code: 'US', dial: '+1', emoji: '🇺🇸' },
  { name: 'India', code: 'IN', dial: '+91', emoji: '🇮🇳' },
  { name: 'United Kingdom', code: 'GB', dial: '+44', emoji: '🇬🇧' },
];

const groupByLetter = data => {
  const groups = {};
  data.forEach(item => {
    const letter = item.name[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(item);
  });

  return Object.keys(groups)
    .sort()
    .map(letter => ({
      title: letter,
      data: groups[letter],
    }));
};

const CountrySelectionScreen = ({navigation}) => {
  const [search, setSearch] = useState('');

  const filteredCountries = COUNTRIES.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sections = groupByLetter(filteredCountries);


  return (
    <View style={styles.container}>
      <AppBar title='Select Countries' />
      <Input
        setValue={setSearch}
        value={search}
        placeholder={'Search Countries'}
        RigtIcon={() => <SearchIcon />}
      />

      {/* Popular Countries */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Countries</Text>
      </View>
      <View>
        <FlatList
          data={popularCountries}
          keyExtractor={item => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity  onPress={()=>{navigation.navigate("PhoneScreen",{item})}} style={styles.row}>
              <Text style={styles.flag}>{item.emoji}</Text>
              <Text style={styles.countryName}>{item.name}</Text>
              <Text style={styles.dial}>{item.dial}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={item => item.code}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.alphaHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{navigation.navigate("PhoneScreen",{item})}} style={styles.row}>
            <Text style={styles.flag}>{item.emoji}</Text>
            <Text style={styles.countryName}>{item.name}</Text>
            <Text style={styles.dial}>{item.dial}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CountrySelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081014',
    paddingHorizontal: 18,
    paddingTop: 15,
  },

  screenTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },

  searchInput: {
    height: 45,
    borderRadius: 25,
    backgroundColor: '#283639',
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
  },

  sectionHeader: {
    backgroundColor: '#081014',
    paddingVertical: 5,
    marginTop:15
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },

  flag: {
    fontSize: 20,
    width: 30,
  },

  countryName: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
  },

  dial: {
    color: '#999',
    fontSize: 15,
  },

  alphaHeader: {
    color: '#00BFA5',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 14,
  },
});
