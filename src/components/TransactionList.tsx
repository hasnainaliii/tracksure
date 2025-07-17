import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TransactionItemProps, TransactionListType } from "../utils/types";
import { colors, radius, spacingX, spacingY } from "../constants/theme";
import { verticalScale } from "../utils/styling";
import Typo from "./Typo";
import { FlashList } from "@shopify/flash-list";
import Loading from "./Loading";
import { expenseCategories } from "../constants/data";
import Animated, { FadeInDown } from "react-native-reanimated";

function TransactionList({
  data,
  title,
  loading,
  emptyListMessage,
}: TransactionListType) {
  function handleClick() {}
  return (
    <View style={styles.container}>
      {title && (
        <Typo size={20} fontWeight={"500"}>
          {title}
        </Typo>
      )}
      <View style={styles.list}>
        <FlashList
          data={data}
          estimatedItemSize={60}
          renderItem={({ item, index }) => (
            <TransactionItem
              key={index}
              index={index}
              item={item}
              handleClick={handleClick}
            />
          )}
        />
      </View>
      {!loading && data.length === 0 && (
        <Typo
          size={15}
          color={colors.neutral400}
          style={{ textAlign: "center", marginTop: spacingY._15 }}
        >
          {emptyListMessage}
        </Typo>
      )}
      {loading && (
        <View style={{ top: verticalScale(100) }}>
          <Loading />
        </View>
      )}
    </View>
  );
}

function TransactionItem({ item, index, handleClick }: TransactionItemProps) {
  let category = expenseCategories["groceries"];
  const IconComponent = category.icon;

  return (
    <Animated.View
      style={styles.row}
      entering={FadeInDown.delay(index * 80)
        .springify()
        .damping(14)}
    >
      <TouchableOpacity style={styles.row} onPress={() => handleClick(item)}>
        <View style={[styles.icon, { backgroundColor: category.bgColor }]}>
          {IconComponent && (
            <IconComponent
              size={verticalScale(25)}
              weight="fill"
              color={colors.white}
            />
          )}
        </View>
        <View style={styles.categoryDes}>
          <Typo size={17}>{category.label}</Typo>
          <Typo
            size={12}
            color={colors.neutral400}
            textProps={{ numberOfLines: 1 }}
          >
            paid wifi bill
          </Typo>
        </View>

        <View style={styles.amountDate}>
          <Typo fontWeight={"500"} color={colors.rose}>
            - $23
          </Typo>
          <Typo size={13} color={colors.neutral400}>
            12 Jan
          </Typo>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
export default TransactionList;
const styles = StyleSheet.create({
  container: {
    gap: spacingY._17,
    // flex: 1,
    // backgroundColor: "red",
  },
  list: {
    minHeight: 3,
  },

  icon: {
    height: verticalScale(44),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius._12,
    borderCurve: "continuous",
  },
  categoryDes: {
    flex: 1,
    gap: 2.5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacingX._12,
    marginBottom: spacingY._12,

    // list with background
    backgroundColor: colors.neutral800,
    padding: spacingY._10,
    paddingHorizontal: spacingY._10,
    borderRadius: radius._17,
  },
  amountDate: {
    alignItems: "flex-end",
    gap: 3,
  },
});
