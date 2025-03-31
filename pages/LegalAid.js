import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Linking} from 'react-native';
export default function LegalAidScreen() {

    const[clinics, setCards]  = useState([
         {
            id: '1',
            image: require('../assets/amity_legal_aid.jpg'),
            type:'Amity Legal Aid, Delhi',
            link: 'https://in.linkedin.com/in/amity-legal-aid-cell-amity-law-school-noida-01a9081b5'
          },
          {
            id: '2',
            image: require('../assets/tiss_aid.jpg'),
            type:'TISS Legal Service Clinic, Bombay',
            link:'https://www.tiss.edu/view/11/projects/all-projects/tiss-legal-service-clinic/'
          },
          {
            id: '3',
            image: require('../assets/rml.jpg'),
            type:'Legal Aid Committee, RMLNLU',
            link:'https://www.rmlnlu.ac.in/legal_aid_social_awareness.html'
          }
      ]);
      const[organisations, setCard]  = useState([
        {
           id: '1',
           image: require('../assets/cfssa.jpg'),
           type:'Center for Social Justice',
           link: 'https://www.centreforsocialjustice.net/'
         },
         {
           id: '2',
           image: require('../assets/ccs.jpg'),
           type:'Center for Civil Society',
           link:'https://ccs.in/'
         },
         {
           id: '3',
           image: require('../assets/slic.png'),
           type:'Socio Legal Info Center',
           link:'https://www.slic.org.in/'
         }
     ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Legal Aid Clinics</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.carouselContainer}
        showsHorizontalScrollIndicator={false}
      >
        {clinics.map((card) => (
          <TouchableOpacity key={card.id} style={styles.cardContainer}  onPress={()=> Linking.openURL(card.link)}>
            <Image source={card.image} resizeMode= 'cover' style={styles.image} />
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardInfoItem}>
              <Text style={styles.dets}>{card.type}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.title}>Legal Aid Organisations</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.carouselContainer}
        showsHorizontalScrollIndicator={false}
      >
        {organisations.map((card) => (
          <TouchableOpacity key={card.id} style={styles.cardContainer} onPress={()=> Linking.openURL(card.link)}>
            <Image source={card.image} resizeMode= 'cover' style={styles.image} />
            <View style={styles.cardInfoContainer}>
              <View style={styles.cardInfoItem}>
              <Text style={styles.dets}>{card.type}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop:40,
    alignItems: 'left',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'justify',
    marginBottom: 2,
    color:'#00008B',
    paddingHorizontal:12
  },
  cardContainer: {
    marginHorizontal:10,
    width: 310,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 6,
    borderBottomColor: '#ccc',
  },
  dets: {
    fontSize: 18,
    marginBottom: 10,
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfoItem: {
    flex: 1,
  },
  carouselContainer: {
    marginVertical: 40,
    alignItems: 'center',
  },
  image: {
    height: '75%',
    width :'100%',
    marginBottom: 10,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
});


