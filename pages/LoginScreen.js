import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";



function LoginScreen({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  handleEmail = (text) => {
    setemail(text);
  };
  handlePassword = (text) => {
    setpassword(text);
  };

  auth = FIREBASE_AUTH;

  const signIn = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Response",response);
      // navigation.navigate("Main");
    } catch (error) {
      if (error.code == "auth/invalid-login-credentials") {
        alert("Incorrect Login Credentials");
      } else if (error.code == "auth/invalid-email") {
        alert("Invalid Email");
      } else {
        console.log(error);
        alert("Please Contact Admins");
      }
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login Screen</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#000000"
          onChangeText={handleEmail}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#000000"
          onChangeText={handlePassword}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          signIn(email, password);
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate("Signup Admin")}
      >
        <Text style={styles.submitButtonText}> Signup </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.navigate("Change Password")}
      >
        <Text style={styles.submitButtonText}> Change Password </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.push("LoginLawyer")}
      >
        <Text style={styles.submitButtonText}> Login For Lawyers </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#101010",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: { height: 50, color: "black" },
  forgotAndSignUpText: { color: "black", fontSize: 11 },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default LoginScreen;
