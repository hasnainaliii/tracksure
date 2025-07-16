import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Typo from "@/src/components/Typo";
import { auth } from "@/src/config/firebase";
import { useAuth } from "@/src/context/authContext";
import { signOut } from "firebase/auth";
import { View, Text } from "react-native";

function Home() {
  const { user } = useAuth();

  async function handleSubmit() {
    await signOut(auth);
  }
  return (
    <ScreenWrapper>
      <Button onPress={handleSubmit}>
        <Typo>Signout</Typo>
      </Button>
      <Text>Home</Text>
    </ScreenWrapper>
  );
}

export default Home;
