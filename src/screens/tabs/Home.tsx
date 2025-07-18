import Button from "@/src/components/Button";
import HomeCard from "@/src/components/HomeCard";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import TransactionList from "@/src/components/TransactionList";
import Typo from "@/src/components/Typo";
import { auth } from "@/src/config/firebase";
import { colors, spacingX, spacingY } from "@/src/constants/theme";
import { useAuth } from "@/src/context/authContext";
import { useFetchData } from "@/src/hook/useFetchData";
import { verticalScale } from "@/src/utils/styling";
import {
  RootStackParamList,
  TransactionType,
  WalletType,
} from "@/src/utils/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import { limit, orderBy, where } from "firebase/firestore";
import { MagnifyingGlassIcon, PlusIcon } from "phosphor-react-native";
import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Home() {
  const { user } = useAuth();

  const constraints = useMemo(() => {
    return [where("uid", "==", user?.uid), orderBy("date", "desc"), limit(30)];
  }, [user?.uid]);
  const {
    data: transactions,
    error,
    loading,
  } = useFetchData<TransactionType>("transactions", constraints);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  async function handleSubmit() {
    await signOut(auth);
  }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <Typo size={16} color={colors.neutral400}>
              Hello,
            </Typo>
            <Typo size={20} fontWeight={"500"}>
              {user?.name}
            </Typo>
          </View>
          <TouchableOpacity style={styles.searchIcon}>
            <MagnifyingGlassIcon
              size={verticalScale(22)}
              color={colors.neutral200}
              weight="bold"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <HomeCard />
          </View>

          <TransactionList
            data={transactions}
            loading={loading}
            title="Recent Transactions"
            emptyListMessage="No Transactions added yet!"
          />
        </ScrollView>
        <Button
          style={styles.floatingButton}
          onPress={() => navigation.push("TransactionModal")}
        >
          <PlusIcon
            color={colors.black}
            weight="bold"
            size={verticalScale(24)}
          />
        </Button>
      </View>
    </ScreenWrapper>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(80),
    right: verticalScale(30),
  },

  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
