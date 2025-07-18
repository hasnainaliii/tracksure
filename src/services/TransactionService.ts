import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { fireStore } from "../config/firebase";
import { TransactionType, WalletType } from "../utils/types";
import { uploadFileToCloud } from "./ImageServices";

export type ResponseType<T = any> = {
  success: boolean;
  msg?: string;
  data?: T;
};

export const createOrUpdateTransaction = async (
  transactionData: Partial<TransactionType>
): Promise<ResponseType<{ id: string }>> => {
  try {
    const { id, type, walletId, amount, image } = transactionData;
    if (!amount || amount <= 0 || !walletId || !type) {
      return { success: false, msg: "Invalid transaction data!" };
    }

    if (id) {
      // todo: update existing transaction
    } else {
      let res = await updateWalletForNewTransaction(
        walletId!,
        Number(amount!),
        type
      );
      if (!res.success) return res;
    }

    if (image) {
      const imageUploadRes = await uploadFileToCloud(image, "trackSure/images");

      if (!imageUploadRes || !imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes?.msg || "Failed to upload image",
        };
      }

      transactionData.image = imageUploadRes.data;
    }

    const transactionRef = id
      ? doc(fireStore, "transactions", id)
      : doc(collection(fireStore, "transactions"));

    await setDoc(transactionRef, transactionData, { merge: true });

    return {
      success: true,
      data: { ...transactionData, id: transactionRef.id },
    };
  } catch (err: any) {
    console.log("error creating or updating transaction: ", err);
    return { success: false, msg: err.message };
  }
};
const updateWalletForNewTransaction = async (
  walletId: string,
  amount: number,
  type: string // better to restrict the string
) => {
  try {
    const walletRef = doc(fireStore, "wallets", walletId);
    const walletSnapshot = await getDoc(walletRef);

    if (!walletSnapshot.exists()) {
      console.log("error updating wallet for new transaction");
      return { success: false, msg: "Wallet not found" };
    }

    const walletData = walletSnapshot.data() as WalletType;

    if (type === "expense" && (walletData.amount ?? 0) - amount < 0) {
      return {
        success: false,
        msg: "Selected wallet doesn't have enough balance",
      };
    }

    const updatedType = type === "income" ? "totalIncome" : "totalExpenses";

    const updatedWalletAmount =
      type === "income"
        ? Number(walletData.amount ?? 0) + amount
        : Number(walletData.amount ?? 0) - amount;

    const updatedTotals =
      type === "income"
        ? Number(walletData.totalIncome ?? 0) + amount
        : Number(walletData.totalExpenses ?? 0) + amount;

    await updateDoc(walletRef, {
      amount: updatedWalletAmount,
      [updatedType]: updatedTotals,
    });

    return { success: true };
  } catch (err: any) {
    console.log("error updating wallet for new transaction: ", err);
    return { success: false, msg: err.message };
  }
};
