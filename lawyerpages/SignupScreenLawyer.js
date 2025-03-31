import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// import { SQLite } from "react-native-sqlite-storage"

// const users = {"john doe": "john@doe"}

// const db = SQLite.openDatabase(
//     {
//         name: 'MainDB',
//         location: 'default'
//     },
//     ()=>{},
//     (error) =>{console.log(error)}
// )

function SignupScreenLawyer({ navigation }) {
  const [email, setemail] = useState([""]);
  const [password, setpassword] = useState([""]);
  const [Name, setName] = useState([""]);
  const [Number, setNumber] = useState(1000000000);
  const [Occupation, setOccupation] = useState([""]);

  handleNumber = (number) => {
    setNumber(number);
  };
  handleName = (text) => {
    setName(text);
  };
  handleEmail = (text) => {
    setemail(text);
  };
  handlePassword = (text) => {
    setpassword(text);
  };
  handleOccupation = (text) => {
    setOccupation(text);
  };
  //  login = (email, pass) => {
  //     if (users[email] != undefined){
  //        if (users[email] == pass){

  //        }
  //     }
  //  }

  auth = FIREBASE_AUTH;

  const signUp = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: Name });

      const docRef = await setDoc(
        doc(FIREBASE_DB, "/users", auth.currentUser.uid),
        {
          Name: Name,
          PhoneNumber: Number,
          Email: email,
          Password: password,
          Type: "Admin"
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Please Contact Admins");
    }
  };

  //     signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     alert("signed in!")
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     alert(errorMessage)
  //   });

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Signup Now!</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#000000"
          onChangeText={this.handleName}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#000000"
          onChangeText={this.handleEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Phone Number"
          placeholderTextColor="#000000"
          onChangeText={this.handleNumber}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Occupation"
          placeholderTextColor="#000000"
          onChangeText={this.handleOccupation}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#000"
          onChangeText={this.handlePassword}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          signUp(email, password);
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Signup </Text>
      </TouchableOpacity>
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
    color: "#000",
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

export default SignupScreenLawyer;
