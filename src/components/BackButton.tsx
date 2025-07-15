import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BackButtonProps } from "../utils/types";
import { useNavigation } from "@react-navigation/native";
import { CaretLeftIcon } from "phosphor-react-native";
import { verticalScale } from "../utils/styling";
import { colors, radius } from "../constants/theme";

function BackButton({ style, iconSize = 26 }: BackButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.button, style]}
    >
      <CaretLeftIcon
        size={verticalScale(iconSize)}
        color={colors.white}
        weight="bold"
      ></CaretLeftIcon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    alignSelf: "flex-start",
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: 5,
  },
});
export default BackButton;
