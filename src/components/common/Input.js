import { TextInput, View } from 'react-native';
const Input = ({ RigtIcon, placeholder, value, setValue }) => {
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      {RigtIcon ? <RigtIcon /> : null}
      <TextInput
        value={value}
        onChangeText={setValue}
        style={{ flex: 1, color: '#fff' }}
        placeholderTextColor={'#6b7280'}
        placeholder={placeholder}
      />
     
    </View>
  );
};
export default Input;
