import BackButton from "@/src/components/BackButton";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import { colors, spacingX, spacingY } from "@/src/constants/theme";
import { useAuth } from "@/src/context/authContext";
import { verticalScale } from "@/src/utils/styling";
import { RootStackParamList } from "@/src/utils/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Icons from "phosphor-react-native";
import { useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const { login: loginUser } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  async function handleSubmit() {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Please Provide Login and Password");
      return;
    }

    setIsLoading(true);
    const res = await loginUser(emailRef.current, passwordRef.current);
    setIsLoading(false);
    if (!res.success) {
      console.log(res.msg);
      Alert.alert("wrong", res.msg);
    }
    // if (res.success) {
    //   navigation.replace("Main");
    // }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Hey,
          </Typo>
          <Typo size={30} fontWeight={"800"}>
            Welcome Back
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Login Now to track all your expensies
          </Typo>

          <Input
            onChangeText={(value) => (emailRef.current = value)}
            placeholder="Enter your email"
            icon={
              <Icons.AtIcon
                size={verticalScale(26)}
                color={colors.neutral300}
              />
            }
          />
          <Input
            onChangeText={(value) => (passwordRef.current = value)}
            placeholder="Enter your Password"
            secureTextEntry
            icon={
              <Icons.LockIcon
                size={verticalScale(26)}
                color={colors.neutral300}
              />
            }
          />

          <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Forgot Password
          </Typo>
          <Button onPress={handleSubmit} loading={isLoading}>
            <Typo fontWeight={"700"} color={colors.neutral800}>
              Login
            </Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15}>Dont't have an account </Typo>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Sign up
            </Typo>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});

export default Login;
