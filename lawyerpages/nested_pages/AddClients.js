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
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB, SEC_AUTH } from "../../firebaseConfig";

export default function AddClients({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [caseType, setCase] = useState("");
  const [UserPassword,setUserPassword] = useState("");

  const auth = FIREBASE_AUTH;
  const newAuth = SEC_AUTH;

//   React.useEffect(async ()=>{
//     //fetch password from Firebase using getDoc
//     const userDocRef = doc(db, "users", auth.currentUser.uid);
// const userDocSnap = await getDoc(userDocRef);
// setUserPassword(userDocSnap.data().Password);
// return null;
//   },[])

  const handleAddClient = async (email) => {
    const password = firstName.slice(0, 4).toUpperCase() + "123"; // Generate a password
    
    try {
      // Step 1: Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        newAuth,
        email,
        password
      );

      // Step 2: Get the UID of the newly created user
      const clientUid = userCredential.user.uid;
      console.log(clientUid);

      // Step 3: Add client data to Firestore using the client's UID
      await setDoc(doc(FIREBASE_DB, "users", clientUid), {
        FirstName: firstName,
        LastName: lastName,
        DateOfBirth: dob,
        Gender: gender,
        ContactNumber: contact,
        Email: email,
        Address: address,
        CaseType: caseType,
        Password: password, // Note: Avoid storing passwords in Firestore for security reasons
        Type: "Prisoner",
      });

      // await signInWithEmailAndPassword(originalUser,originalEmail,UserPassword)

      console.log("Client added successfully!");
      alert("Client added successfully!");

      // Step 4: Navigate back
      navigation.goBack();
    } catch (error) {
      console.error("Error adding client: ", error);
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.textInput}
        value={firstName}
        placeholder="First Name"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.textInput}
        value={lastName}
        placeholder="Last Name"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.textInput}
        value={dob}
        placeholder="Date of Birth"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setDOB(text)}
      />
      <TextInput
        style={styles.textInput}
        value={gender}
        placeholder="Gender"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setGender(text)}
      />
      <TextInput
        style={styles.textInput}
        value={contact}
        placeholder="Contact Number"
        placeholderTextColor="#003f5c"
        keyboardType="phone-pad"
        onChangeText={(text) => setContact(text)}
      />
      <TextInput
        style={styles.textInput}
        value={email}
        placeholder="Email Address"
        placeholderTextColor="#003f5c"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        value={address}
        placeholder="Address (City, State, Country)"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.textInput}
        value={caseType}
        placeholder="Specify Case Type"
        placeholderTextColor="#003f5c"
        onChangeText={(text) => setCase(text)}
      />

      <TouchableOpacity
        onPress={()=> handleAddClient(email)} // Call the handleAddClient function
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Add Client</Text>
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