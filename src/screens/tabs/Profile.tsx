import Header from "@/src/components/Header";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import { auth } from "@/src/config/firebase";
import { colors, radius, spacingX, spacingY } from "@/src/constants/theme";
import { useAuth } from "@/src/context/authContext";
import { getProfileImage } from "@/src/services/ImageServices";
import { verticalScale } from "@/src/utils/styling";
import { accountOptionType, RootStackParamList } from "@/src/utils/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import {
  GearSixIcon,
  LockIcon,
  PowerIcon,
  UserIcon,
} from "phosphor-react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

function Profile() {
  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const accountOptions: accountOptionType[] = [
    {
      title: "Profile",
      icon: <UserIcon size={26} color={colors.white} weight="fill" />,
      routeName: "/modal/profile",
      bgColor: "#6366f1",
    },
    {
      title: "Settings",
      icon: <GearSixIcon size={26} color={colors.white} weight="fill" />,
      // routeName: "/modal/profile",
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: <LockIcon size={26} color={colors.white} weight="fill" />,
      // routeName: "/modal/profile",
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: <PowerIcon size={26} color={colors.white} weight="fill" />,
      // routeName: "/modal/profile",
      bgColor: "#e11d48",
    },
  ];

  async function handlePress(item: accountOptionType) {
    if (item.title === "Logout") {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            await signOut(auth);
          },
          style: "destructive",
        },
      ]);
    }

    if (item.title === "Profile") {
      navigation.push("ProfileModal");
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" style={{ marginVertical: spacingY._10 }} />

        <View style={styles.userInfo}>
          {/* Avatar */}
          <View>
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
          {/* name & email */}
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"} color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={16} fontWeight={"300"} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </View>
        {/* accountoption */}
        <View style={styles.accountOptions}>
          {accountOptions.map((item, index) => {
            return (
              <Animated.View
                key={index}
                entering={FadeIn.delay(index * 50)
                  .springify()
                  .damping(14)}
                style={styles.listItem}
              >
                <TouchableOpacity
                  style={styles.flexRow}
                  onPress={() => handlePress(item)}
                >
                  <View
                    style={[styles.listIcon, { backgroundColor: item.bgColor }]}
                  >
                    {item.icon}
                  </View>
                  <Typo size={16} style={{ flex: 1 }} fontWeight={"500"}>
                    {item.title}
                  </Typo>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    // overflow: "hidden",
    // position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5,
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});
