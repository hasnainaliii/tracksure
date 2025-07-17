// screens/modals/ProfileModal.tsx

import BackButton from "@/src/components/BackButton";
import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import ImageUpload from "@/src/components/ImageUpload";
import Input from "@/src/components/Input";
import ModalWrapper from "@/src/components/ModalWrapper";
import Typo from "@/src/components/Typo";
import { colors, spacingX, spacingY } from "@/src/constants/theme";
import { useAuth } from "@/src/context/authContext";
import {
  createOrUpdateWallet,
  deleteWallet,
} from "@/src/services/WalletService";
import { scale, verticalScale } from "@/src/utils/styling";
import { RootStackParamList, WalletType } from "@/src/utils/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TrashSimpleIcon } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const WalletModal = () => {
  const [Wallet, setWallet] = useState<WalletType>({
    name: "",
    image: null,
  });
  const route = useRoute();

  const oldWallet: { name: string; image: string; id: string } =
    route.params as {
      name: string;
      image: string;
      id: string;
    };

  useEffect(() => {
    if (oldWallet?.id) {
      setWallet({
        name: oldWallet?.name,
        image: oldWallet?.image,
      });
    }
  }, []);

  const { user } = useAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(false);
  async function onSubmit() {
    let { name, image } = Wallet;
    if (!name.trim() || !image) {
      Alert.alert("Wallet", "please fill all the fields");
    }
    const data: WalletType = {
      name,
      image,
      uid: user?.uid,
    };
    if (oldWallet?.id) data.id = oldWallet.id;
    setLoading(true);
    const res = await createOrUpdateWallet(data);
    console.log(res);
    setLoading(false);
    if (res.success) {
      Alert.alert("Wallet", "Wallet Added Successfully");
      navigation.goBack();
    } else {
      Alert.alert("user", res.msg);
    }
  }

  async function onDelete() {
    if (!oldWallet?.id) return;
    setLoading(true);
    const res = await deleteWallet(oldWallet?.id);
    setLoading(false);
    if (res.success) {
      navigation.goBack();
    } else {
      Alert.alert("wallet", res.msg);
    }
  }
  function showDeleteAlert() {
    Alert.alert("confirm", "Are you Sure you want to Delete This wallet", [
      { text: "Cancel", onPress: () => console.log("cancel"), style: "cancel" },
      { text: "Delete", onPress: () => onDelete(), style: "destructive" },
    ]);
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldWallet?.id ? "update Wallet" : "New Wallet"}
          leftIcon={<BackButton />}
          style={{ marginBottom: spacingY._10 }}
        />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name</Typo>
            <Input
              placeholder="salary"
              value={Wallet.name}
              onChangeText={(text) => setWallet({ ...Wallet, name: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Icon</Typo>
            <ImageUpload
              placeholder="Upload Image"
              onClear={() => setWallet({ ...Wallet, image: null })}
              file={Wallet.image}
              onSelect={(file) => setWallet({ ...Wallet, image: file })}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {oldWallet?.id && !loading && (
          <Button
            onPress={showDeleteAlert}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <TrashSimpleIcon
              color={colors.white}
              size={verticalScale(24)}
              weight="bold"
            />
          </Button>
        )}
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black}>
            {oldWallet?.id ? "Update Wallet" : "Add Wallet"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;

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
