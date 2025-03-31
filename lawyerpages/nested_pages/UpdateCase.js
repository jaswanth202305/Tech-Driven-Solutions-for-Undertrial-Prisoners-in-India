import { useFocusEffect } from "@react-navigation/native";
import { useCallback ,useState} from "react";
import {Text,TextInput,View,TouchableOpacity ,StyleSheet} from "react-native"

export default function UpdateCase({ route, navigation }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { id } = route.params;

  const handleUpdateCase = async () => {
    if (!date || !time) {
      Alert.alert("Error", "Please enter the date and time");
      return;
    }
    try {
      const docRef = await updateDoc(doc(FIREBASE_DB, "/users", id), {
        CaseTime: time,
        CaseDate: date,
      });
      console.log("Case updated successfully!");
      Alert.alert("Success", "Case updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating case: ", error);
      Alert.alert("Error", "Something went wrong: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        onPress={handleUpdateCase}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Update Case</Text>
      </TouchableOpacity>
      {<View>
        
        </View>}
    </View>
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