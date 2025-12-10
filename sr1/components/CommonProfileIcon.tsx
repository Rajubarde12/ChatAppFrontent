import React from "react";
import { Text, TouchableOpacity, View, ViewStyle, TextStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface GradientCircleLetterProps {
  letter?: string;
  size?: number;
  colors?: string[];
  onPress?: () => void;
  style?: ViewStyle;
  fontSize?: number;
  textStyle?: TextStyle;
}

const GradientCircleLetter: React.FC<GradientCircleLetterProps> = ({
  letter = "A",
  size = 72,
  colors = ["#FF7A18", "#AF002D", "#320B86"],
  onPress,
  style = {},
  fontSize,
  textStyle = {},
}) => {
  const circleStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      style={style}
    >
      <LinearGradient
      colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={circleStyle}
      >
        <Text
          style={[
            {
              fontSize: fontSize ?? Math.round(size * 0.45),
              color: "white",
              fontWeight: "700",
              textAlign: "center",
            },
            textStyle,
          ]}
        >
          {letter}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientCircleLetter;
