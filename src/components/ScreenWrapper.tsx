import { View, Text, Platform, Dimensions, StatusBar } from "react-native";
import { ScreenWrapperProps } from "../utils/types";
import { colors } from "../constants/theme";

const { height } = Dimensions.get("window");

function ScreenWrapper({ style, children }: ScreenWrapperProps) {
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 50;

  return (
    <View style={{ paddingTop, flex: 1, backgroundColor: colors.neutral900 }}>
      {children}
      <StatusBar barStyle={"light-content"} />
    </View>
  );
}

export default ScreenWrapper;
