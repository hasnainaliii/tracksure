import Button from "@/src/components/Button";
import Typo from "@/src/components/Typo";
import { auth } from "@/src/config/firebase";
import { useAuth } from "@/src/context/authContext";
import { signOut } from "firebase/auth";
import { View, Text } from "react-native";

function Home() {
  const { user } = useAuth();
  console.log(user);
  async function handleSubmit() {
    await signOut(auth);
  }
  return (
    <View>
      <Button onPress={handleSubmit}>
        <Typo>Signout</Typo>
      </Button>
      <Text>Home</Text>
    </View>
  );
}

export default Home;
