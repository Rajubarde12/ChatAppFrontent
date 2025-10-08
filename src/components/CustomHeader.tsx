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
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.left}
        >
          <Menu width={24} height={24} fill="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text
            style={[
              styles.title,
              { fontSize: 15, textAlign: 'center', fontWeight: '300' },
            ]}
          >
            {text}
          </Text>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 16,
    paddingBottom: 12,
    width: '100%',
    justifyContent: 'center',
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
