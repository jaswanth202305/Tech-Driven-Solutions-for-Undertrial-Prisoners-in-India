import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { WebView } from 'react-native-webview';

const LEGAL = 'https://www.legalserviceindia.com/article/';

export default function ProceedingsScreen() {
   return (
            <WebView 
               style = {styles.container}
               source = {{uri: LEGAL }}
               onLoad={console.log("Loaded Proceeding")}
            />
   );
 }

 const styles = StyleSheet.create({
   container: {
      marginTop: 28,
      flex: 1,
      backgroundColor : 'white',
      alignItems: 'center',
      justifyContent: 'center'
   }
 })
