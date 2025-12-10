import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackIcon } from '../icons';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

const AppBar = ({
  showBackIcon = false,
  title = 'Title',
  onBack,
  onCancel,
  showCancle,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.container}>
        {showBackIcon ? (
          <TouchableOpacity onPress={onBack} style={styles.iconContainer}>
            <BackIcon />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconContainer} />
        )}

        <Text style={styles.title}>{title}</Text>
        {showCancle ? (
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.iconContainer} />
        )}
      </View>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },

  container: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconContainer: {
    width: 30, // keeps layout balanced even if no icon
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },

  cancel: {
    fontSize: 16,
    fontFamily: fonts['Lato-Black'],
    color: colors.primary, // choose your theme color
  },
});
