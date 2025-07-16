import { doc, updateDoc } from "firebase/firestore";
import { fireStore } from "../config/firebase";
import { UserDataType } from "../utils/types";
import { uploadFileToCloud } from "./ImageServices";

export async function updateUser(uid: string, updatedData: UserDataType) {
  try {
    if (updatedData.image && updatedData?.image.uri) {
      const imageUploadRes = await uploadFileToCloud(
        updatedData.image,
        "trackSure/images"
      );

      if (!imageUploadRes || !imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes?.msg || "Failed to upload image",
        };
      }

      updatedData.image = imageUploadRes.data;
    }

    const userRef = doc(fireStore, "users", uid);
    await updateDoc(userRef, updatedData);

    return { success: true, msg: "updated Successfully" };
  } catch (error: any) {
    console.log("Error updating the user", error);
    return { success: false, msg: error?.msg };
  }
}
