import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/tabs/Home";
import Profile from "../screens/tabs/Profile";
import Explore from "../screens/tabs/Explore";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: "shift",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Porfile" component={Profile} />
      <Tab.Screen name="Explore" component={Explore} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
