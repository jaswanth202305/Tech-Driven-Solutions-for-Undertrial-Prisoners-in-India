import * as React from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import { useState ,useEffect} from 'react';
import { WebView } from 'react-native-webview';
import { InAppBrowserAndroidOptions } from 'react-native-inappbrowser-reborn';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';
import { collection,getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../firebaseConfig';
export default function RehabScreen() {
  const [rehabData,setRehab] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(FIREBASE_DB, "rehab");
        const querySnapshot = await getDocs(docRef);

        const prisonersData = querySnapshot.docs.map((doc) => ({
          id:doc.id,
          link: doc.data().URL,
          image: doc.data().Image,
          title: doc.data().Title,
        }));

        setRehab(prisonersData);
        console.log("Prisoners data:", prisonersData);
      } catch (error) {
        console.error("Error fetching prisoners: ", error);
      }
    };

    fetchData();
  }, []);

  const [searchText, setSearchText] = useState('');
  const handleSearch = (text) => {
    setSearchText(text);
  }
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => { Linking.openURL(item.link) }}>
      <Image
        style={styles.image}
        resizeMode='cover'
        source={{ uri: item.image }}
        onError={(error) => console.error("Image failed to load:", error.nativeEvent.error)}
      />
      <View style={styles.cardBody}>
        <Text style={styles.type}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredData = rehabData.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search programs..."
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.rehabListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
  },
  searchInputContainer:{
    paddingHorizontal:20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor:'#dcdcdc',
    backgroundColor:'#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  rehabListContainer:{
    paddingHorizontal:20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop:10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    height: 175,
    width :'100%',
    marginBottom: 10,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  cardBody: {
    marginBottom: 10,
    padding: 10,
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  }
});
