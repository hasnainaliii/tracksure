import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CardholderIcon,
  ChartLineUpIcon,
  HouseIcon,
  UserIcon,
} from "phosphor-react-native";
import Home from "../screens/tabs/Home";
import Profile from "../screens/tabs/Profile";
import Statistics from "../screens/tabs/Statistics";
import Wallet from "../screens/tabs/Wallet";
import { colors } from "../constants/theme";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.black,
          height: 70,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: "absolute",
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: "white",
        },
        tabBarIcon: ({ focused }) => {
          const iconProps = {
            size: 28,
            color: focused ? colors.primary : "#888",

            weight: focused ? ("fill" as const) : ("regular" as const),
          };

          switch (route.name) {
            case "Home":
              return <HouseIcon {...iconProps} />;
            case "Stats":
              return <ChartLineUpIcon {...iconProps} />;
            case "Wallet":
              return <CardholderIcon {...iconProps} />;
            case "Profile":
              return <UserIcon {...iconProps} />;
          }
        },
        tabBarItemStyle: {
          marginVertical: 6,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Stats" component={Statistics} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
