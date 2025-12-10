import { Text, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/colors';

const Button = ({ title = '', onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 30,
        backgroundColor: colors.primary,
        height: 50,
        borderRightColor: 30,
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        alignSelf:'center'
      }}
    >
      <Text
        style={{
          color:colors.neutral[900],
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight:'500',
          fontSize:16
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
