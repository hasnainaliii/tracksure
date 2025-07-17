import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/authContext";

import SplashScreen from "../screens/splashScreen/SplashScreen";
import Welcome from "../screens/auth/Welcome";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import TabNavigator from "./TabNavigator";
import ProfileModal from "../screens/modals/ProfileModal";
import WalletModal from "../screens/modals/WalletModal";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileModal"
            component={ProfileModal}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="WalletModal"
            component={WalletModal}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
