import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import app from '../../firebaseConfig';
import { addDoc, collection, serverTimestamp, getFirestore, runTransaction } from 'firebase/firestore';
import useAuthStore from '../../store/AuthStore';
import useUserStore from '../../store/UserStore';
import { StatusBar } from 'expo-status-bar';

import SIcon from '../../assets/SecondaryLogo.png';

export default function UserDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [estate, setEstate] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [error, setError] = useState('');

  const { setUser, initializeUser } = useUserStore();
  const { phone, setLoggedIn, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    initializeUser();
    checkLoginStatus();
  }, []);

  const createAccount = async () => {
    try {
      const db = getFirestore(app);
      const userRef = collection(db, 'User');
      const userData = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        Role: "NormalUser",
        CreatedAt: serverTimestamp(),
        UpdatedAt: serverTimestamp(),
      };

      const newUserRef = await addDoc(userRef, userData);
      return newUserRef.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createNewUser = async () => {
    try {
      const db = getFirestore(app);
      const commonData = {
        Items: [],
        CreatedAt: serverTimestamp(),
        UpdatedAt: serverTimestamp(),
      };

      const transactionResult = await runTransaction(db, async (transaction) => {
        const cartRef = collection(db, 'Cart');
        const newCartRef = await addDoc(cartRef, commonData);

        const collectionRef = collection(db, 'Collection');
        const newCollectionRef = await addDoc(collectionRef, commonData);

        const addressRef = collection(db, 'Address');
        const addressData = {
          Country: "Kenya",
          City: "Nairobi",
          Area: area,
          Estate: estate,
          HouseNo: houseNo, // Use the newCartRef.id as UserId
          CreatedAt: serverTimestamp(),
          UpdatedAt: serverTimestamp(),
        };

        const newAddressRef = await addDoc(addressRef, addressData);

        return {
          cartId: newCartRef.id,
          collectionId: newCollectionRef.id,
          addressId: newAddressRef.id,
        };
      });

      const { cartId, collectionId, addressId } = transactionResult;

      // Create user document
      const userId = await createAccount();

      const user = {
        UserId: userId,
        FirstName: firstName,
        Phone: phone,
        CartId: cartId,
        CollectionId: collectionId,
        AddressId: addressId,
      }
      setUser(user);
      setLoggedIn(true);

      console.log(cartId, collectionId, addressId, userId)

      // Redirect to home
      router.replace('(auth)/Welcome');

      return "User added successfully!";
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
      throw error;
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#EEEEEE', paddingBottom: 20}}>
      <StatusBar style="light" />
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F6E3C', width: "100%", height: 150, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
        <View style={{marginTop: 40}}>
          <Image source={SIcon} style={{width: 100, height: 100}} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={{padding: 20, marginTop: 20, width: '95%', height: 730, backgroundColor: '#FFFFFF', borderRadius: 10, margin: 10, marginBottom: 300, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 2}}>
          <View >
          <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Create Account</Text>
          <View >
            <Text style={{ marginTop: 10, marginBottom: 5, fontSize: 16, fontWeight: '600', color: '#4C4C4C', width: 300 }}>Fill the fields below with correct and legal information</Text>
          </View>
          <View >
            <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '600', marginBottom: 5 }}>First Name</Text>
          </View>
          <View style={{justifyContent: 'center', borderColor: '#1F6E3C', borderWidth: 1, height: 45, backgroundColor: '#EEEEEE', width: 300, borderRadius: 10}}>
            <TextInput onChangeText={setFirstName} value={firstName}
            style={{ fontSize: 15, fontWeight: '600', color: '#4C4C4C', marginLeft: 5 }} />
          </View>
          </View>
          <View>
            <View >
              <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '600', marginBottom: 5 }}>Last Name</Text>
            </View>
            <View style={{justifyContent: 'center', borderColor: '#1F6E3C', borderWidth: 1, height: 45, backgroundColor: '#EEEEEE', width: 300, borderRadius: 10}}>
              <TextInput onChangeText={setLastName} value={lastName}
               style={{ fontSize: 15, fontWeight: '600', color: '#4C4C4C', marginLeft: 5 }}
              />
            </View>
          </View>
          <View>
            <View >
              <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '600', marginBottom: 5 }}>Email</Text>
            </View>
            <View style={{justifyContent: 'center', borderColor: '#1F6E3C', borderWidth: 1, height: 45, backgroundColor: '#EEEEEE', width: 300, borderRadius: 10}}>
              <TextInput onChangeText={setEmail} value={email} textContentType='emailAddress' keyboardType='email-address' 
                style={{ fontSize: 15, fontWeight: '600', color: '#4C4C4C', marginLeft: 5 }}
               />
            </View>
          </View>
          <View>
            <View >
              <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '600', marginBottom: 5 }}>Area</Text>
            </View>
            <View style={{justifyContent: 'center', borderColor: '#1F6E3C', borderWidth: 1, height: 45, backgroundColor: '#EEEEEE', width: 300, borderRadius: 10}}>
              <TextInput onChangeText={setArea} value={area} 
              style={{ fontSize: 15, fontWeight: '600', color: '#4C4C4C', marginLeft: 5 }}
              />
            </View>
          </View>
          <View>
            <View >
              <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '600', marginBottom: 5 }}>Estate / Appartment</Text>
            </View>
            <View style={{justifyContent: 'center', borderColor: '#1F6E3C', borderWidth: 1, height: 45, backgroundColor: '#EEEEEE', width: 300, borderRadius: 10}}>
              <TextInput onChangeText={setEstate} value={estate} 
              style={{ fontSize: 15, fontWeight: '600', color: '#4C4C4C', marginLeft: 5 }}
              />
            </View>
          </View>
          <View>
            <View >
              <Text style={{ marginTop: 10, fontSize: 15, fontWeight: '600', marginBottom: 5 }}>House No.</Text>
            </View>
            <View style={{justifyContent: 'center', borderColor: '#1F6E3C', borderWidth: 1, height: 45, backgroundColor: '#EEEEEE', width: 300, borderRadius: 10}}>
              <TextInput onChangeText={setHouseNo} value={houseNo}  
              style={{ fontSize: 15, fontWeight: '600', color: '#4C4C4C', marginLeft: 5 }}
              />
            </View>
          </View>
          <View >
            <TouchableOpacity onPress={createNewUser} 
            disabled={!firstName || !lastName || !email || !area || !estate || !houseNo}
            // if button is disabled, change the color to grey
            style={{marginTop: 50, width: 300, height: 50, backgroundColor: (!firstName || !lastName || !email || !area || !estate || !houseNo) ? '#F1E5AC' : '#FFD700', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
            // style={{marginTop: 20, width: 300, height: 50, backgroundColor: '#FFD700', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
          >
            <Text style={{color: '#4C4C4C', fontWeight: 'bold', fontSize: 20 }}>Create Account</Text>
          </TouchableOpacity>
          </View>
      </View>
      </ScrollView>
      
    </View>
  );
}
