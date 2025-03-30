import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { collection, doc, setDoc,addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB, SEC_AUTH } from "../../firebaseConfig";

export default function AddRehab({ navigation }) {
  const [url,setUrl]=useState("")
  const [image,setImage]=useState("")
  const [title,setTitle]=useState("")



  const handleAddRehab = async () => {

    try{
      // Step 3: Add client data to Firestore using the client's UID
      await addDoc(collection(FIREBASE_DB, "rehab"), {
       URL:url,
       Image:image,
       Title:title
      });

      // await signInWithEmailAndPassword(originalUser,originalEmail,UserPassword)

      console.log("Rehab added successfully!");
      alert("Rehab added successfully!");

      // Step 4: Navigate back
      navigation.goBack();
    } catch (error) {
      console.error("Error adding Rehab: ", error);
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.textInput}
          value={title}
          placeholder="Title"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setTitle(text)}
        />
      <TextInput
        style={styles.textInput}
        value={url}
        placeholder="Url Link"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setUrl(text)}
      />
      
      <TextInput
        style={styles.textInput}
        value={image}
        placeholder="Image"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setImage(text)}
      />
      
      <TouchableOpacity
        onPress={()=> handleAddRehab()} // Call the handleAddClient function
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Add Rehab</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    paddingVertical: 20,
  },
  textInput: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});