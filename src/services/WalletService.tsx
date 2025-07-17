import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { WalletType } from "../utils/types";
import { uploadFileToCloud } from "./ImageServices";
import { fireStore } from "../config/firebase";

export const createOrUpdateWallet = async (walletData: Partial<WalletType>) => {
  try {
    let walletToSave = { ...walletData };

    if (walletData.image) {
      const imageUploadRes = await uploadFileToCloud(
        walletData.image,
        "trackSure/wallets"
      );
      if (!imageUploadRes || !imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes?.msg || "Failed to upload image",
        };
      }
      walletToSave.image = imageUploadRes.data;
    }

    if (!walletData?.id) {
      walletToSave.amount = 0;
      walletToSave.totalExpenses = 0;
      walletToSave.totalIncome = 0;
      walletToSave.created = new Date();
    }

    const walletRef = walletData?.id
      ? doc(fireStore, "wallets", walletData.id)
      : doc(collection(fireStore, "wallets"));

    await setDoc(walletRef, walletToSave, { merge: true });
    return { success: true, data: { ...walletToSave, id: walletRef.id } };
  } catch (error: any) {
    console.log("error creating or updating wallet: ", error);
    return { success: false, msg: error.message };
  }
};
export const deleteWallet = async (walletId: string) => {
  try {
    const walletRef = doc(fireStore, "wallets", walletId);
    await deleteDoc(walletRef);

    // todo: delete all transactions related to this wallet

    return { success: true, msg: "Wallet deleted successfully" };
  } catch (err: any) {
    console.log("error deleting wallet: ", err);
    return { success: false, msg: err.message };
  }
};
