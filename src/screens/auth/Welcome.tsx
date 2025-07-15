import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import { colors, spacingX, spacingY } from "@/src/constants/theme";
import { verticalScale } from "@/src/utils/styling";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

function Welcome({ navigation }: any) {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Login button and iamge */}
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Typo fontWeight={"500"}>Log in</Typo>
          </TouchableOpacity>

          <Animated.Image
            entering={FadeIn.duration(1500)}
            source={require("../../assets/images/welcome.png")}
            style={styles.welcomeImage}
            resizeMode="cover"
          />
        </View>
        {/* footer */}

        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(2000).springify().damping(15)}
            style={{ alignItems: "center" }}
          >
            <Typo size={30} fontWeight={"800"}>
              Always Take Control
            </Typo>
            <Typo size={30} fontWeight={"800"}>
              of your Finances
            </Typo>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(150)
              .springify()
              .damping(15)}
          >
            <Typo size={17} color={colors.textLight}>
              Finaces must be arranged to set a better
            </Typo>
            <Typo size={17} color={colors.textLight}>
              Life style in future{" "}
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000)
              .delay(200)
              .springify()
              .damping(15)}
            style={styles.buttonContainer}
          >
            <Button onPress={() => navigation.navigate("Signup")}>
              <Typo size={22} fontWeight={"600"} color={colors.neutral900}>
                Get Started
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.neutral800,
    justifyContent: "space-between",
    paddingTop: spacingY._7,
  },
  welcomeImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },

  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: spacingX._25,
  },
});
