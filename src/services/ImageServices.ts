import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../constants";

const CLOUDINARY_CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export async function uploadFileToCloud(
  file: { uri?: string } | string,
  folderName: string
) {
  try {
    if (!file) return { success: true, data: null };
    if (typeof file === "string") {
      return { success: true, data: file };
    }

    if (file && file.uri) {
      const formData = new FormData();
      formData.append("file", {
        uri: file?.uri,
        type: "image/jpeg",
        name: file?.uri.split("/").pop() || "file.jpg",
      } as any);

      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName);
      const response = await axios.post(CLOUDINARY_CLOUD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return { success: true, data: response.data.secure_url };
    }
  } catch (error: any) {
    console.log("erro uploading file");
    return { success: false, msg: error.msg };
  }
}
export function getProfileImage(file: any) {
  if (file && typeof file === "string") return { uri: file }; // ✅ wrap in { uri: ... }
  if (file && typeof file === "object" && file.uri) return { uri: file.uri }; // ✅ object with uri

  return require("../assets/images/defaultAvatar.png");
}
export function getFilePath(file: any) {
  if (file && typeof file === "string") return { uri: file }; // ✅ wrap in { uri: ... }
  if (file && typeof file === "object" && file.uri) return { uri: file.uri }; // ✅ object with uri

  return require("../assets/images/defaultAvatar.png");
}
