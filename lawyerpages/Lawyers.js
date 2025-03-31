import { collection, getDocs, query, where } from "firebase/firestore";
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
} from "react-native";
import { FIREBASE_DB } from "../firebaseConfig"; // Ensure this path is correct

export default function Lawyers({ navigation }) {
  const [optionList, setOptionList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [refresh,setRefresh]=useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = collection(FIREBASE_DB, "users");
        const prisonerQuery = query(docRef, where("Type", "==", "Lawyer"));
        const querySnapshot = await getDocs(prisonerQuery);

        const prisonersData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Document ID (user UID)
          name: doc.data().FUllName, // Combine FirstName and LastName
          degree: doc.data().Degree, // Use CaseType as caseno
          degreeFrom: doc.data().DegreeFrom, // Use CaseType as caseno
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

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredData = optionList.filter((item) => {
    return item.name?.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
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
      <View style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
      <View style={{backgroundColor:"blue",borderRadius:10,width:100,height:50,display:"flex",alignItems:'center',justifyContent:'center'}}>

        <TouchableOpacity onPress={()=>setRefresh(!refresh)}>
          <Text style={{color:"white"}}>Refresh</Text>
        </TouchableOpacity>
      </View>
      </View>

      <FlatList
        style={styles.notificationList}
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.card, { borderColor: item.color }]}
              onPress={() => {
                navigation.push("LawyerDetails", item);
              }}
            >
              <View style={styles.cardContent}>
                <Image
                  style={[styles.image, styles.imageContent]}
                  source={{ uri: item.icon }}
                />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.case}>
                  {"\nDegree : "}
                  {item.degree +" " + item.degreeFrom}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
});