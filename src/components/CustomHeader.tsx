import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Menu from '@assets/icons/menu.svg';
import ArrowBack from '@assets/icons/arrow-back.svg';
import Bell from '@assets/icons/bell.svg';

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
  backgroundColor?: string;
  text: String;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = '',
  showBackButton = true,
  rightIcon,
  onRightPress,
  backgroundColor = '#56ab2f', // default green
  text,
}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <View style={styles.innerContainer}>
        <TouchableOpacity
         onPress={()=>navigation.openDrawer()}
          style={styles.left}
        >
          <Menu width={24} height={24} fill="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{title}</Text>
       
        </View>

        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} style={styles.right}>
            <Bell width={24} height={24} fill="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.right} />
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
   padding:15,
    overflow: 'hidden',
    backgroundColor: '#6e8e9cff',
    borderBottomWidth: 0.3,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 25,
    position: 'relative',
    zIndex: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
   
  },
  left: {
    width: 40,
    alignItems: 'flex-start',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
