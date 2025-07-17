import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/src/constants/theme";
import { verticalScale } from "@/src/utils/styling";
import { PlusCircleIcon } from "phosphor-react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, WalletType } from "@/src/utils/types";
import { useFetchData } from "@/src/hook/useFetchData";
import { useAuth } from "@/src/context/authContext";
import { orderBy, where } from "firebase/firestore";
import Loading from "@/src/components/Loading";
import { useMemo } from "react";
import { FlatList } from "react-native-gesture-handler";
import WalletListItem from "@/src/components/WalletListItem";
function Wallet() {
  const { user } = useAuth();
  const constraints = useMemo(() => {
    return [where("uid", "==", user?.uid), orderBy("created", "desc")];
  }, [user?.uid]);
  const {
    data: wallets,
    error,
    loading,
  } = useFetchData<WalletType>("wallets", constraints);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  function getTotalBalance() {
    return wallets.reduce((total, item) => {
      return total + (item.amount || 0);
    }, 0);
  }

  return (
    <ScreenWrapper style={{ backgroundColor: colors.black }}>
      <View style={styles.container}>
        {/* balcne vire */}
        <View style={styles.balanceView}>
          <View style={{ alignItems: "center" }}>
            <Typo size={45} fontWeight={"500"}>
              ${getTotalBalance()?.toFixed(2)}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Total Balance
            </Typo>
          </View>
        </View>

        {/* Wallet */}

        <View style={styles.wallets}>
          <View style={styles.flexRow}>
            <Typo size={20} fontWeight={"500"}>
              {" "}
              My Wallets
            </Typo>
            <TouchableOpacity onPress={() => navigation.push("WalletModal")}>
              <PlusCircleIcon
                weight="fill"
                color={colors.primary}
                size={verticalScale(33)}
              />
            </TouchableOpacity>
          </View>

          {/* Wallet list */}
          {loading ? (
            <Loading />
          ) : (
            <FlatList
              data={wallets}
              renderItem={({ item, index }) => {
                return (
                  <WalletListItem
                    item={item}
                    index={index}
                    navigation={navigation}
                  />
                );
              }}
              contentContainerStyle={styles.listStyle}
            />
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default Wallet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  balanceView: {
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,

    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15,
  },
});
