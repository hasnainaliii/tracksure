import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomButtonProps } from "../utils/types";
import { colors, radius } from "../constants/theme";
import { verticalScale } from "../utils/styling";
import Loading from "./Loading";

function Button({
  style,
  onPress,
  loading = false,
  children,
}: CustomButtonProps) {
  return loading ? (
    <View style={[styles.button, style, { backgroundColor: "transparent" }]}>
      <Loading />
    </View>
  ) : (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius._17,
    borderCurve: "continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
  },
});
