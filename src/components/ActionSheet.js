import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { colors } from '../utils/colors';

const CustomActionSheet = React.forwardRef((props, ref) => {
  const {
    options = [],
    title = '',
    cancelText = 'Cancel',
    destructiveIndex = -1,
    onCancel,
    showCancel = true,
    containerStyle,
    titleStyle,
    optionStyle,
    cancelStyle,
  } = props;

  const handleOptionPress = (onPress) => {
    ref.current?.hide();
    if (onPress) {
      setTimeout(() => onPress(), 300);
    }
  };

  const renderIcon = (icon) => {
    if (React.isValidElement(icon)) {
      return icon;
    }
    return icon ? icon({ height: 24, width: 24 }) : null;
  };

  return (
    <ActionSheet
      ref={ref}
      containerStyle={[styles.container, containerStyle]}
      indicatorStyle={styles.indicator}
      gestureEnabled={true}
    >
      {title ? (
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
      ) : null}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <React.Fragment key={option.id || index}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                optionStyle,
                destructiveIndex === index && styles.destructiveButton,
              ]}
              onPress={() => handleOptionPress(option.onPress)}
              activeOpacity={0.7}
            >
            
              {option.icon && (
                <View style={styles.iconContainer}>
                  {renderIcon(option.icon)}
                </View>
              )}
              
              <Text
                style={[
                  styles.optionText,
                  destructiveIndex === index && styles.destructiveText,
                  option.textStyle,
                ]}
                numberOfLines={2}
              >
                {option.title}
              </Text>

 
              {option.rightAccessory && (
                <View style={styles.rightAccessory}>
                  {option.rightAccessory}
                </View>
              )}
            </TouchableOpacity>

            {index < options.length - 1 && (
              <View style={styles.separator} />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Cancel Button */}
      {showCancel && (
        <>
          <View style={styles.cancelSeparator} />
          <TouchableOpacity
            style={[styles.cancelButton, cancelStyle]}
            onPress={() => {
              ref.current?.hide();
              if (onCancel) onCancel();
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelText}>{cancelText}</Text>
          </TouchableOpacity>
        </>
      )}
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 22,
    backgroundColor: colors.backgroundDark, // dark background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 15,
  },

  indicator: {
    width: 45,
    height: 5,
    backgroundColor: '#4A4A4A', // better visible on dark BG
    borderRadius: 3,
    marginVertical: 10,
    alignSelf: 'center',
  },

  titleContainer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#3d3d3d',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.backgroundDark,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a0a0a0',
    textAlign: 'center',
    letterSpacing: 0.4,
  },

  optionsContainer: {
    paddingVertical: 4,
    backgroundColor: colors.backgroundDark,
  },

  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 22,
    minHeight: 54,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },

  iconContainer: {
    marginRight: 14,
    width: 26,
    alignItems: 'center',
    opacity: 0.95,
  },

  optionText: {
    flex: 1,
    fontSize: 17,
    color: '#fff', // main text bright
    fontWeight: '500',
  },

  destructiveText: {
    color: '#FF453A',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#4a4a4a', // visible on dark
    marginHorizontal: 20,
    opacity: 0.6,
  },

  cancelSeparator: {
    height: 14,
    backgroundColor: colors.backgroundDark,
    opacity: 0.7,
  },

  cancelButton: {
    // backgroundColor: '#1c1c1e', // dark iOS button background
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: Platform.OS === 'ios' ? 32 : 20,

    
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // elevation: 6,
  },

  cancelText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0A84FF', // iOS dark-blue CTA color
  },
});



export default CustomActionSheet;