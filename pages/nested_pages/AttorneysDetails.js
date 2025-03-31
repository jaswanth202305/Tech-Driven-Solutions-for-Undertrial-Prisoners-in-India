import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const AttorneysDetails = ({ route, navigation }) => {
  /* 2. Get the param */
  const { id, color, icon, name, occ, firm, email,phone } = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.photo} source={{ uri: icon }} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{firm}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Degree</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionItem}>{occ + " From "+firm }</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionItem}>{email}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionItem}>{phone}</Text>
          </View>
        </View>
        
         
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    color: "gray",
  },
  body: {},
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  sectionContent: {
    marginTop: 8,
  },
  sectionItem: {
    marginVertical: 4,
  },
  sectionItemTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  sectionItemDesc: {
    fontSize: 14,
    color: "gray",
  },
});

export default AttorneysDetails;
