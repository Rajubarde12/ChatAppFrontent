import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import { TextInput } from 'react-native';

const PhoneNumberField = ({
  value,
  onChange,
  error,
  defaultCountry = 'IN',
  callingCode="91",
  handleCountrySelect=()=>{}
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  defaultCountry?: CountryCode;
  callingCode?:string
 handleCountrySelect:(data:Country)=>void
}) => {
 
 
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
 

 

  



 

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={styles.phoneInputContainer}>
        {/* Custom Country Picker */}
        <View style={styles.countryPickerButton}>
          <CountryPicker
            countryCode={defaultCountry}
            withFilter
            withFlag
            withCallingCode
            withCallingCodeButton
            withAlphaFilter
            withEmoji
            visible={countryPickerVisible}
            onSelect={handleCountrySelect}
            onClose={() => setCountryPickerVisible(false)}
            containerButtonStyle={styles.countryPickerButtonInner}
          />
        </View>
        <TextInput
          placeholderTextColor="#aaa"
          placeholder="Enter Phone NUmber"
          style={{
            flex: 1,
            color: '#fff',
            fontSize: 15,
            paddingVertical: 14,
            marginLeft: 4,
          }}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

// Helper function to get flag emoji from country code
const getFlagEmoji = (countryCode: CountryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return codePoints;
};

export default PhoneNumberField;

const styles = StyleSheet.create({
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    height: 60,
    width: '100%',
    overflow: 'hidden',
  },
  countryPickerButton: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  countryPickerButtonInner: {
    padding: 0,
    margin: 0,
  },
  countryDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flagText: {
    fontSize: 20,
  },
  callingCodeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
  },
  textContainer: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
    paddingRight: 12,
  },
  textInput: {
    color: '#fff',
    fontSize: 16,
    height: '100%',
  },
  codeText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    marginTop: 4,
    fontSize: 12,
  },
});
