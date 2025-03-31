import * as React from "react";
import { useState } from "react";    
import ChatBot from "./LLawBot"; //adding this for the chat bot
import ChatModal from "./LLawModal";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as TaskManager from "expo-task-manager";

export default function LHomeScreen() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

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

  const stopLocation = () => {
    TaskManager.isTaskRegisteredAsync("location-tracking").then((tracking) => {
      console.log("ending location tracking");
      if (tracking) {
        TaskManager.unregisterTaskAsync("location-tracking");
        console.log("ended location tracking");
      }
    });
  };
  stopLocation();
  const events = [
    {
      id: 1,
      Title: "Civil Trial: Edward vs. Margapuri Dispute",
      Description:
        "The formal civil trial to resolve the dispute between Mark Edward and Sriharini Margapuri. Both parties will present their cases and evidence before the judge, who will make a final decision",
      Location: "Delhi District Court, Room 302",
      Date: Date.UTC(2023, 9, 7, 10, 0, 0),
      caseNumber: "Case #56789",
      judgeName: "Meowster Meowman",
      client: "Mark Edward",
      Status: "Upcoming",
      Notes: "Bring all relevant documents and ID",
    },
    {
      id: 2,
      Title: "Hearing for Case #12345",
      Description:
        "Preliminary hearing for the civil dispute between Mark Edward and Sriharini Margapuri",
      Location: "Delhi District Court, Room 302",
      Date: Date.UTC(2023, 8, 18, 10, 0, 0),
      caseNumber: "Case #12345",
      judgeName: "Saad Mujeeb",
      client: "Mark Edward",
      Status: "Completed",
      Notes: "Bring all relevant documents and ID",
    },
    {
      id: 3,
      Title: "Criminal Trial: Murder Case of Ms. Harini",
      Description:
        "Defense Case of Mr. Edward, the proposed suspect in the murder trial of Ms. Harini",
      Location: "Delhi District Court, Room 302",
      Date: Date.UTC(2023, 8, 18, 10, 0, 0),
      caseNumber: "Case #67890",
      judgeName: "Saad Mujeeb",
      client: "Mark Edward",
      Status: "Completed",
      Notes: "Bring all relevant documents and ID",
    },
  ];

  return (
    <ScrollView>
      <Text style={styles.mainTitle}>Upcoming Events:</Text>

      <View>
        {events.map((event) => {
          return (
            <View key={event.id}>
              {new Date(event.Date) > new Date() ? (
                <TouchableOpacity
                  style={[styles.card, { borderColor: "#999999" }]}
                >
                  <Text style={styles.Title}>
                    <Text style={styles.bold}>Title:</Text> {event.Title}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Description:</Text>
                    {event.Description}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>judge:</Text> {event.judgeName}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Status:</Text> {event.Status}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Case Number:</Text>{" "}
                    {event.caseNumber}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Notes:</Text> {event.Notes}
                  </Text>
                  <Text style={styles.Date}>
                    Due:{" "}
                    {new Intl.DateTimeFormat("en-IN", options1).format(
                      new Date(event.Date)
                    )}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}
      </View>
      <Text style={styles.mainTitle}>Past Events:</Text>

      <View>
        {events.map((event) => {
          return (
            <View key={event.id}>
              {new Date(event.Date) < new Date() ? (
                <TouchableOpacity
                  style={[styles.card, { borderColor: "#999999" }]}
                >
                  <Text style={styles.Title}>
                    <Text style={styles.bold}>Title:</Text> {event.Title}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Description:</Text>
                    {event.Description}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>judge:</Text> {event.judgeName}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Status:</Text> {event.Status}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Case Number:</Text>{" "}
                    {event.caseNumber}
                  </Text>
                  <Text>
                    <Text style={styles.bold}>Notes:</Text> {event.Notes}
                  </Text>
                  <Text style={styles.Date}>
                    Due:{" "}
                    {new Intl.DateTimeFormat("en-IN", options1).format(
                      new Date(event.Date)
                    )}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}
      </View>

      <View style={{ flex: 1 }}>
        {isChatOpen && <ChatBot />}
        <TouchableOpacity
          style={{ flex: 0, alignSelf: "flex-start", margin: 20 }}
          onPress={toggleChat}
        >
          {/* button kek also why comments being weird here */}
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
