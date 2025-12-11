import { Image, View } from 'react-native';
import UserIcon from '../.././assets/svgIcon/user.svg';
import { mainUrl } from '../../constants';
const UserAvtar = ({ uri, size = 50 }) => {
  return uri ? (
    <Image
      style={{
        height: size,
        width: size,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      resizeMode="contain"
      source={{ uri: `${mainUrl}/${uri}` }}
    />
  ) : (
    <View
      style={{
        height: size,
        width: size,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UserIcon height={size / 1.5} width={size / 1.5} />
    </View>
  );
};

export default UserAvtar;
