import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ImageUploadProps } from "../utils/types";
import { UploadIcon, XCircleIcon } from "phosphor-react-native";
import Typo from "./Typo";
import { colors, radius } from "../constants/theme";
import { scale, verticalScale } from "../utils/styling";
import { getFilePath } from "../services/ImageServices";
import * as ImagePicker from "expo-image-picker";
function ImageUpload({
  file = null,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder = "",
}: ImageUploadProps) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      onSelect(result.assets[0]);
    }
  };
  return (
    <View>
      {!file ? (
        <TouchableOpacity style={styles.inputContainer} onPress={pickImage}>
          <UploadIcon color={colors.neutral200} />
          {placeholder && <Typo size={15}>{placeholder}</Typo>}
        </TouchableOpacity>
      ) : (
        <View style={[styles.image, imageStyle && imageStyle]}>
          <Image style={{ flex: 1 }} source={getFilePath(file)} />
          <TouchableOpacity style={styles.deleteIcon} onPress={onClear}>
            <XCircleIcon
              size={verticalScale(24)}
              weight="fill"
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default ImageUpload;
const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(54),
    backgroundColor: colors.neutral700,
    borderRadius: radius._15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderStyle: "dashed",
  },
  image: {
    height: scale(150),
    width: scale(150),
    borderRadius: radius._15,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  deleteIcon: {
    position: "absolute",
    top: scale(6),
    right: scale(6),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
