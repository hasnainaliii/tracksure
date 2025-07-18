import ScreenWrapper from "@/src/components/ScreenWrapper";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
// adjust path as needed
import { TransactionType } from "@/src/utils/types"; // make sure types are correct
import { useMemo } from "react";
import { where, orderBy, limit } from "firebase/firestore";
import { useAuth } from "@/src/context/authContext";
import { useFetchData } from "@/src/hook/useFetchData";

const screenWidth = Dimensions.get("window").width;

function Statistics() {
  const { user } = useAuth();

  const constraints = useMemo(() => {
    return [where("uid", "==", user?.uid), orderBy("date", "desc"), limit(30)];
  }, [user?.uid]);

  const {
    data: transactions = [],
    loading,
    error,
  } = useFetchData<TransactionType>("transactions", constraints);

  const { incomeTotal, expenseTotal } = useMemo(() => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((t) => {
      const amount = Number(t.amount);
      if (t.type === "income") incomeTotal += amount;
      if (t.type === "expense") expenseTotal += amount;
    });

    return { incomeTotal, expenseTotal };
  }, [transactions]);

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [{ data: [incomeTotal, expenseTotal] }],
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#00ffcc" />
        </View>
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <View style={styles.center}>
          <Text style={styles.errorText}>Something went wrong 😓</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📊 Your Financial Stats</Text>

        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={260}
          yAxisLabel="$"
          yAxisSuffix=""
          fromZero
          chartConfig={{
            backgroundGradientFrom: "#1e1e1e",
            backgroundGradientTo: "#1e1e1e",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 255, 160, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            barPercentage: 0.6,
            propsForBackgroundLines: {
              strokeDasharray: "", // solid lines
              stroke: "#333",
            },
          }}
          style={styles.chart}
        />

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>💰 Totals Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.incomeText}>Income:</Text>
            <Text style={styles.amountText}>${incomeTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.expenseText}>Expenses:</Text>
            <Text style={styles.amountText}>${expenseTotal.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 40,
//     backgroundColor: "#121212",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#ffffff",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   chart: {
//     borderRadius: 16,
//     marginVertical: 8,
//   },
//   summaryBox: {
//     marginTop: 24,
//     padding: 16,
//     borderRadius: 12,
//     backgroundColor: "#1e1e1e",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//     color: "#ffffff",
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 6,
//   },
//   incomeText: {
//     color: "lightgreen",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   expenseText: {
//     color: "#ff6961",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   amountText: {
//     color: "#ffffff",
//     fontSize: 16,
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 100,
//   },
//   errorText: {
//     color: "#ff6b6b",
//     fontSize: 16,
//     textAlign: "center",
//   },
// });

const styles = StyleSheet.create({
  container: {
    paddingTop: 40, // ⬅️ pushes content below header/status bar
    paddingBottom: 40,
    paddingHorizontal: 16, // ⬅️ horizontal spacing for all elements
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  chart: {
    borderRadius: 16,
    marginTop: 16, // ⬅️ spacing between title and chart
    marginBottom: 8,
  },
  summaryBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#ffffff",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  incomeText: {
    color: "lightgreen",
    fontWeight: "600",
    fontSize: 16,
  },
  expenseText: {
    color: "#ff6961",
    fontWeight: "600",
    fontSize: 16,
  },
  amountText: {
    color: "#ffffff",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Statistics;
