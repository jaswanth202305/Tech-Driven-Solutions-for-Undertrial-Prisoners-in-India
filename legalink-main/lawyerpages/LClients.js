import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig"; // Ensure this path is correct
 // Import Firebase Auth

export default function LClients({ navigation }) {
  const [optionList, setOptionList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [info, setInfo] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = collection(FIREBASE_DB, "users");
        const prisonerQuery = query(docRef, where("Type", "==", "Prisoner"));
        const querySnapshot = await getDocs(prisonerQuery);

        const prisonersData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID (user UID)
          name: `${doc.data().FirstName} ${doc.data().LastName}`, // Combine FirstName and LastName
          caseno: doc.data().CaseType, // Use CaseType as caseno
          email: doc.data().Email,
          address: doc.data().Address,
          contact: doc.data().ContactNumber, // Add a placeholder icon
        }));

        setOptionList(prisonersData);

        console.log("Prisoners data:", prisonersData);
      } catch (error) {
        console.error("Error fetching prisoners: ", error);
      }
    }

    fetchData();
  }, [refresh]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [id, setId] = useState("");

  const GenInfo = async () => {
    try {
      const upGen = await updateDoc(doc(FIREBASE_DB, "users", id), {
        Info: info,
      });

      Alert.alert("Message Sent");
      navigation.goBack();
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const handleUpdateCase = async () => {
    if (!date || !time) {
      Alert.alert("Error", "Please enter the date and time");
      return;
    }
    try {
      const docRef = await updateDoc(doc(FIREBASE_DB, "users", id), {
        CaseTime: time,
        CaseDate: date,
      });
      console.log("Case updated successfully!");
      navigation.goBack();
      setToggle(!toggle);
    } catch (error) {
      console.error("Error updating case: ", error);
      Alert.alert("Error", "Something went wrong: " + error.message);
      setToggle(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the user document from Firestore
      const userDocRef = doc(FIREBASE_DB, "users", id);
      await deleteDoc(userDocRef);
      console.log("User document deleted from Firestore");

      // Delete the user from Firebase Authentication
      
        console.log("User deleted from Firebase Authentication");
        setRefresh(!refresh)
        Alert.alert("User Deleted");
     
    } catch (err) {
      console.error("Error deleting user:", err);
      Alert.alert("Error", err.message);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredData = optionList.filter((item) => {
    return item.name?.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      {toggle ? (
        <View>
          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Search for Client..."
                underlineColorAndroid="transparent"
                onChangeText={handleSearch}
                value={searchText}
              />
            </View>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "blue",
                borderRadius: 10,
                width: 100,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => setRefresh(!refresh)}>
                <Text style={{ color: "white" }}>Refresh</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            style={styles.notificationList}
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    style={[styles.card, { borderColor: item.color }]}
                    onPress={() => {
                      navigation.push("Clients Details", item);
                    }}
                  >
                    <View style={styles.cardContent}>
                      <Image
                        style={[styles.image, styles.imageContent]}
                        source={{ uri: item.icon }}
                      />
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.case}>
                        {"\nCase Type: "}
                        {item.caseno}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <TouchableOpacity
                      onPress={() => {
                        setToggle(!toggle);
                        setId(item.id);
                      }}
                      style={styles.loginBtn}
                    >
                      <Text style={styles.loginText}>Update Case</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleDelete(item.id);
                      }}
                      style={styles.loginBtn}
                    >
                      <Text style={styles.loginText}>Delete User</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.tocontainer}>
          <TextInput
            style={styles.textInput}
            value={time}
            placeholder="Time"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setTime(text)}
          />
          <TextInput
            style={styles.textInput}
            value={date}
            placeholder="Date"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setDate(text)}
          />
          <TouchableOpacity onPress={handleUpdateCase} style={styles.loginBtn}>
            <Text style={styles.loginText}>Update Case</Text>
          </TouchableOpacity>

          <View>
            <TextInput
              style={{
                width: 200,
                height: 40,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 5,
                marginBottom: 15,
                paddingHorizontal: 10,
              }}
              placeholder="Specific Message"
              value={info}
              onChangeText={(text) => setInfo(text)}
            />
            <TouchableOpacity
              style={{
                width: 150,
                height: 50,
                backgroundColor: "blue",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
              onPress={GenInfo}
            >
              <Text style={{ color: "white" }}>Send Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 150,
                height: 50,
                backgroundColor: "blue",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
              onPress={() => setToggle(!toggle)}
            >
              <Text style={{ color: "white" }}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  formContent: {
    flexDirection: "row",
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    height: null,
    paddingTop: 3,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "column",
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    alignSelf: "auto",
  },
  case: {
    fontSize: 16,
    marginLeft: 10,
    alignSelf: "auto",
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: "#eee",
    marginTop: 5,
  },
  loginBtn: {
    width: "30%",
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
    fontSize: 12,
    fontWeight: "bold",
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
  tocontainer: {
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    paddingVertical: 20,
  },
});