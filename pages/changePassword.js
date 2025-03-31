import { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Correct imports from Firebase

import { FIREBASE_APP } from "../firebaseConfig"; // Firebase app config from firebaseConfig

export default function ChangePassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    console.log("Resetting password");
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    const auth = getAuth(FIREBASE_APP); // Get the auth instance from your Firebase app

    try {
      console.log(`Sending password reset email to: ${email}`); // Debugging log
      await sendPasswordResetEmail(auth, email); // Send password reset email
      console.log("Password reset email sent");
      Alert.alert("Success", "Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      Alert.alert("Error", error.message); // Show detailed error message
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleResetPassword}>
          <Text style={styles.loginText}>   Send Reset Mail   </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ECF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    height: 50,
    width: 200,
    color: "black",
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
});
