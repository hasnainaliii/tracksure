import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Typo from "./Typo";
import { colors, radius, spacingX } from "../constants/theme";
import { verticalScale } from "../utils/styling";
import { CaretRightIcon } from "phosphor-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  item: any;
  index: number;
  navigation: any;
};

function WalletListItem({ item, index, navigation }: Props) {
  function openWallet() {
    navigation.push("WalletModal", {
      id: item?.id,
      name: item?.name,
      image: item?.image,
    });
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)
        .springify()
        .damping(13)}
    >
      <TouchableOpacity style={styles.container} onPress={openWallet}>
        <View style={styles.imageContainer}>
          <Image
            style={{ flex: 1 }}
            source={{ uri: item?.image }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.nameContainer}>
          <Typo size={16}>{item?.name}</Typo>
          <Typo size={16} color={colors.neutral200}>
            ${item?.amount}
          </Typo>
        </View>
        <CaretRightIcon
          size={verticalScale(20)}
          weight="bold"
          color={colors.white}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default WalletListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(17),
    padding: spacingX._15,
  },
  imageContainer: {
    height: verticalScale(45),
    width: verticalScale(45),
    borderWidth: 1,
    borderColor: colors.neutral600,
    borderRadius: radius._12,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  nameContainer: {
    flex: 1,
    gap: 2,
    marginLeft: spacingX._10,
  },
});
