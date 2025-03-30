import * as React from "react";
import { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { doc, onSnapshot, getDoc } from "firebase/firestore";

import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

export default function LMap({ navigation }) {
  const [ClientUid, setClientUid] = useState([]);
  const [Location, setLocation] = useState({
    Name: "Saad",
    latitude: 21.408916,
    longitude: 27.4447082,
  });
  const updateUid = (array) => {
    setClientUid(array);
  };
  async function fetchData() {
    const docRef = doc(FIREBASE_DB, "/users", FIREBASE_AUTH.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      updateUid(docSnap.data().Clients);
      console.log("Document data:", ClientUid);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const setLocationFn = (data) => {
    setLocation({
      Name: data.Name,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };
  const fetchDataNow = async (uid) => {
    const docRef = doc(FIREBASE_DB, "/users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setLocationFn(docSnap.data());
      _mapView.animateToRegion(
        {
          latitude: docSnap.data().latitude,
          longitude: docSnap.data().longitude,
        },
        1000
      );
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  // const location = onSnapshot(
  //   doc(FIREBASE_DB, "/users", ClientUid[0]),
  //   (doc) => {
  //     console.log("Client data: ", doc.data());
  //     if (ClientUid != []) {
  //       setmarks({
  //         Name: doc.data().Name,
  //         latitude: doc.data().latitude,
  //         longitude: doc.data().longitude,
  //       });
  //     }
  //     console.log(marks);
  //   }
  // );
  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
        ref={(mapView) => {
          _mapView = mapView;
        }}
      >
        <Marker
          coordinate={{
            latitude: Location.latitude,
            longitude: Location.longitude,
          }}
          title={Location.Name}
        />
      </MapView>
      <FlatList
        data={ClientUid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => fetchDataNow(item.Uid)}
          >
            <Text style={styles.loginText}>{item.Name} </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={() => fetchData()}>
        <Text style={styles.loginText}>refresh</Text>
      </TouchableOpacity>

      {/* {ClientUid.map((uid) => {
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>{ClientUid} </Text>
        </TouchableOpacity>;
      })} */}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
    marginTop: "30vh",
  },
});
// export default function LMap({ navigation }) {
//   const [ClientUid, setClientUid] = React.useState([]);
//   const [marks, setmarks] = React.useState({});
//   const auth = FIREBASE_AUTH;
//   const db = FIREBASE_DB;
//   useEffect(() => {
//     async function fetchData() {
//       const docRef = doc(db, "/users", auth.currentUser.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists() && docSnap.data().Clients != []) {
//         console.log("Document data:", docSnap.data().Clients);
//         setClientUid(docSnap.data().Clients);
//         console.log("useState: ", ClientUid);
//       } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//       }
//     }
//     fetchData();
//     console.log(ClientUid);
//   }, []);

//   // const location = onSnapshot(
//   //   doc(FIREBASE_DB, "/users", ClientUid[0]),
//   //   (doc) => {
//   //     console.log("Client data: ", doc.data());
//   //     if (ClientUid != []) {
//   //       setmarks({
//   //         Name: doc.data().Name,
//   //         latitude: doc.data().latitude,
//   //         longitude: doc.data().longitude,
//   //       });
//   //     }
//   //     console.log(marks);
//   //   }
//   // );

//   return (
//     <View style={styles.container}>
//       {/* <Text>{ClientUid}</Text>

//       <MapView
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         style={styles.map}
//       >
//         <Marker
//           coordinate={{
//             latitude: marks.latitude ? marks.latitude : 0,
//             longitude: marks.longitude ? marks.longitude : 0,
//           }}
//           title={marks.Name}
//         />
//       </MapView> */}
//       {ClientUid.map((uid) => {
//         <TouchableOpacity style={styles.loginBtn}>
//           <Text style={styles.loginText}>Add Client </Text>
//         </TouchableOpacity>;
//       })}
//     </View>
//   );
// }
