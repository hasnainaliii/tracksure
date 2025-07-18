import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { colors, spacingX, spacingY } from "../constants/theme";
import { scale, verticalScale } from "../utils/styling";
import Typo from "./Typo";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DotsThreeCircleIcon,
  DotsThreeIcon,
  DotsThreeVerticalIcon,
  SkullIcon,
} from "phosphor-react-native";
import { useMemo } from "react";
import { WalletType } from "../utils/types";
import { useFetchData } from "../hook/useFetchData";
import { orderBy, where } from "firebase/firestore";
import { useAuth } from "../context/authContext";

function HomeCard() {
  const { user } = useAuth();
  const constraints = useMemo(() => {
    return [where("uid", "==", user?.uid), orderBy("created", "desc")];
  }, [user?.uid]);
  const {
    data: wallets,
    error,
    loading,
  } = useFetchData<WalletType>("wallets", constraints);
  const getTotals = () => {
    return wallets.reduce(
      (totals: any, item: WalletType) => {
        totals.balance = totals.balance + Number(item.amount);
        totals.income = totals.income + Number(item.totalIncome);
        totals.expenses = totals.expenses + Number(item.totalExpenses);
        return totals;
      },
      { balance: 0, income: 0, expenses: 0 }
    );
  };
  return (
    <ImageBackground
      source={require("../assets/images/card.png")}
      resizeMode="stretch"
      style={styles.bgImage}
    >
      <View style={styles.container}>
        <View>
          {/* total balance */}
          <View style={styles.totalBalanceRow}>
            <Typo color={colors.neutral800} size={17} fontWeight={"bold"}>
              Total Balance
            </Typo>
            <DotsThreeIcon
              size={verticalScale(23)}
              color={colors.black}
              weight="bold"
            />
          </View>
          <Typo color={colors.black} size={30} fontWeight={"bold"}>
            $
            {loading ? (
              <SkullIcon size={20} weight="fill" color="black" />
            ) : (
              getTotals()?.balance?.toFixed(2)
            )}
          </Typo>
        </View>
        <View style={styles.stats}>
          {/* income */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <ArrowDownIcon
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo size={16} color={colors.neutral700} fontWeight={"500"}>
                Income
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={17} color={colors.green} fontWeight={"600"}>
                ${" "}
                {loading ? (
                  <SkullIcon size={20} weight="fill" color="black" />
                ) : (
                  getTotals()?.income?.toFixed(2)
                )}
              </Typo>
            </View>
          </View>
          {/* expense */}
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.incomeExpense}>
              <View style={styles.statsIcon}>
                <ArrowUpIcon
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo size={16} color={colors.neutral700} fontWeight={"500"}>
                Expense
              </Typo>
            </View>
            <View style={{ alignSelf: "center" }}>
              <Typo size={17} color={colors.rose} fontWeight={"600"}>
                ${" "}
                {loading ? (
                  <SkullIcon size={20} weight="fill" color="black" />
                ) : (
                  getTotals()?.expenses?.toFixed(2)
                )}
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomeCard;
const styles = StyleSheet.create({
  bgImage: {
    height: scale(210),
    width: "100%",
  },
  container: {
    padding: spacingX._20,
    paddingHorizontal: scale(23),
    height: "87%",
    width: "100%",
    justifyContent: "space-between",
  },
  totalBalanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._5,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsIcon: {
    backgroundColor: colors.neutral350,
    padding: spacingY._5,
    borderRadius: 50,
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._7,
  },
});
