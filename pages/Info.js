import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const auth = FIREBASE_AUTH;

export default function Info() {
  const [info, setInfo] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(FIREBASE_DB, "users", user.uid);
          console.log("Fetching data");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setInfo(docSnap.data().Info);
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("No authenticated user!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    }
    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.card}>
        <Text style={{ color: "black" }}>{info}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
});

//Info