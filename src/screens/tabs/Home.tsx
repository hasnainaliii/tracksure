import Button from "@/src/components/Button";
import HomeCard from "@/src/components/HomeCard";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import TransactionList from "@/src/components/TransactionList";
import Typo from "@/src/components/Typo";
import { auth } from "@/src/config/firebase";
import { colors, spacingX, spacingY } from "@/src/constants/theme";
import { useAuth } from "@/src/context/authContext";
import { verticalScale } from "@/src/utils/styling";
import { signOut } from "firebase/auth";
import { MagnifyingGlassIcon, PlusIcon } from "phosphor-react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Home() {
  const { user } = useAuth();

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
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            loading={false}
            title="Recent Transcation"
            emptyListMessage="No Transcations added yet!"
          />
        </ScrollView>
        <Button style={styles.floatingButton}>
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
    bottom: verticalScale(30),
    right: verticalScale(30),
  },

  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
  },
});
