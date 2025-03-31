import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const LawyerDetails = ({ route, navigation }) => {
  /* 2. Get the param */
  const { address, degree, degreeFrom, contact, email, name } = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Qualification : </Text>
          <Text style={styles.sectionContent}>{degree}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Graduation At : </Text>
          <Text style={styles.sectionContent}>{degree}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email:</Text>

          <Text style={styles.sectionContent}>{email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone : </Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionItem}>{contact}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address : </Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionItem}>{address}</Text>
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

export default LawyerDetails;
