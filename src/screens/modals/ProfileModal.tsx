// screens/modals/ProfileModal.tsx

import BackButton from "@/src/components/BackButton";
import Header from "@/src/components/Header";
import Input from "@/src/components/Input";
import ModalWrapper from "@/src/components/ModalWrapper";
import Typo from "@/src/components/Typo";
import { colors, spacingX, spacingY } from "@/src/constants/theme";
import { getProfileImage } from "@/src/services/ImageServices";
import { scale, verticalScale } from "@/src/utils/styling";
import { RootStackParamList, UserDataType } from "@/src/utils/types";
import { PencilIcon } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "@/src/components/Button";
import { useAuth } from "@/src/context/authContext";
import { updateUser } from "@/src/services/UserService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";

const ProfileModal = () => {
  const [userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  });
  const { user, updateUserData } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    setUserData({
      name: user?.name || "",
      image: user?.image || null,
    });
  }, [user]);
  const [loading, setLoading] = useState(false);
  async function onSubmit() {
    let { name, image } = userData;
    if (!name.trim()) {
      Alert.alert("User", "please fill all the fields");
    }

    setLoading(true);

    const res = await updateUser(user?.uid as string, userData);

    setLoading(false);
    if (res.success) {
      updateUserData(user?.uid as string);
      navigation.goBack();
    } else {
      Alert.alert("user", res.msg);
    }
  }
  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setUserData({ ...userData, image: result.assets[0] });
      console.log(result.assets[0]);
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title="Update Profile"
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(userData.image)}
              resizeMode="cover"
            />

            <TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
              <PencilIcon size={verticalScale(20)} color={colors.neutral800} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Name</Typo>
            <Input
              placeholder="Name"
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black}>Update</Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
    // paddingVertical: spacingY._30,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
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
    borderWidth: 1,
    borderColor: colors.neutral500,
    // overflow: "hidden",
    // position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
