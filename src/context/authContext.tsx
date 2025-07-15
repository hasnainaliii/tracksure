import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, RootStackParamList, UserType } from "../utils/types";
import { View } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth/cordova";
import { auth, fireStore } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser?.uid,
          name: firebaseUser?.displayName,
          email: firebaseUser?.email,
        });
        updateUserData(firebaseUser.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  async function loginFunction(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid Email ";
      }
      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Invalid Credentials";
      }
      return { success: false, msg };
    }
  }

  async function signUpFunction(email: string, password: string, name: string) {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(
        doc(fireStore, "users", response?.user?.uid), // 🔹 Document reference
        {
          name,
          email,
          uid: response?.user?.uid,
        } // 🔹 Data to save
      );

      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      return { success: false, msg };
    }
  }

  async function updateUserData(uid: string) {
    try {
      const docRef = doc(fireStore, "users", uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data?.email,
          name: data?.name,
          image: data?.image,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      console.log("error", error);
    }
  }

  const contextValue: AuthContextType = {
    user,
    setUser,
    login: loginFunction,
    register: signUpFunction,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth is used out of scope");
  }
  return context;
};
