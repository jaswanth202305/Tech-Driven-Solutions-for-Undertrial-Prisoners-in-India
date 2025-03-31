import * as React from "react";
import ChatBot from "./LawBot"; // Adding this for the chat bot
import ChatModal from "./LawModal";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Add getDoc
import { FIREBASE_DB,FIREBASE_AUTH } from "../firebaseConfig"; // Ensure auth is exported from firebaseConfig
import * as TaskManager from "expo-task-manager";

export const LOCATION_TRACKING = "location-tracking";

const auth=FIREBASE_AUTH;
export default function HomeScreen() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [events, setEvents] = useState(null);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const [location, setLocation] = useState(null);

  const fetchEvents = async () => {
    try {
      const docRef = doc(FIREBASE_DB, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvents(docSnap.data());
        console.log("Events:", docSnap.data());
        Alert.alert(
          `Hearing on ${docSnap.data().CaseDate} at ${docSnap.data().CaseTime}`
        );
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching events: ", error);
      Alert.alert("Error", "Failed to fetch events: " + error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      let latitude = (await location).coords.latitude;
      let longitude = (await location).coords.longitude;

      const docRef = await updateDoc(
        doc(FIREBASE_DB, "/users", auth.currentUser.uid),
        {
          latitude: latitude,
          longitude: longitude,
        }
      );
      console.log("location:", latitude, longitude);
    })();
  }, []);

  const [locationStarted, setLocationStarted] = React.useState(false);

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 360000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    setLocationStarted(hasStarted);
    console.log("tracking started?", locationStarted);
  };

  startLocationTracking();

  const options1 = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const date = new Date(Date.UTC(2023, 8, 18, 10, 0, 0));
  const dateTimeFormat3 = new Intl.DateTimeFormat("en-IN", options1).format(
    date
  );

  return (
    <ScrollView>
      <Text style={styles.mainTitle}>Upcoming Hearing:</Text>

      <View>
        <TouchableOpacity style={[styles.card, { borderColor: "#999999" }]}>
          <Text style={styles.Title}>
            <Text style={styles.bold}>Hearing :</Text>
          </Text>
          <Text>
            <Text style={styles.bold}>Date:</Text> {events?.CaseDate}
          </Text>
          <Text>
            <Text style={styles.bold}>Time:</Text> {events?.CaseTime}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {isChatOpen && <ChatBot />}
        <TouchableOpacity
          style={{ flex: 0, alignSelf: "flex-start", margin: 20 }}
          onPress={toggleChat}
        >
          <View
            style={{ padding: 10, backgroundColor: "blue", borderRadius: 10 }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Law Bot</Text>
          </View>
        </TouchableOpacity>
        <ChatModal isVisible={isChatOpen} onClose={toggleChat} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    padding: 20,
    fontSize: 20,
  },
  Date: {
    fontSize: 10,
    textAlign: "right",
    paddingTop: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  Title: {
    fontSize: 20,
  },
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

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    const docRef = await updateDoc(
      doc(FIREBASE_DB, "/users", auth.currentUser.uid),
      {
        latitude: lat,
        longitude: long,
      }
    );
    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  }
});