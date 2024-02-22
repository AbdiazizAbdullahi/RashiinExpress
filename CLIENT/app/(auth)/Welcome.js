import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import app from '../../firebaseConfig';
import useUserStore from '../../store/UserStore';
import { router } from 'expo-router';
import { getFirestore, runTransaction, doc } from "firebase/firestore";
import { StatusBar } from 'expo-status-bar';

import SIcon from '../../assets/SecondaryLogo.png';

export default function Welcome() {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Assuming initializeUser is a function that initializes the user state
    useUserStore.getState().initializeUser();
  }, []);

  useEffect(() => {
    const updateUserInFirestore = async () => {
      try {
        if (!user) {
          return;
        }
        setLoading(true);

        const db = getFirestore(app);
        const userId = user.UserId;
        await runTransaction(db, async (transaction) => {
          const userRef = doc(db, 'User', userId);
          transaction.update(userRef, { CartId: user.CartId, CollectionId: user.CollectionId, AddressId: user.AddressId });

          const cartId = user.CartId;
          const cartRef = doc(db, 'Cart', cartId);
          transaction.update(cartRef, { userId });

          const collectionId = user.CollectionId;
          const collectionRef = doc(db, 'Collection', collectionId);
          transaction.update(collectionRef, { userId });

          const addressId = user.AddressId;
          const addressRef = doc(db, 'Address', addressId);
          transaction.update(addressRef, { userId });
        });

        setLoading(false);
        console.log('Transaction successfully committed!');
      } catch (error) {
        setLoading(false);
        console.error('Transaction failed:', error);
      }
    };

    updateUserInFirestore();
  }, [2000, user]);

  const handleContinue = () => {
    // Assuming router is properly defined and handles navigation
    router.push('/home');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE' }}>
        <View >
          <ActivityIndicator size="large" color="#1F6E3C" />
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F6E3C'}}>
      <StatusBar style="light" />
      <View style={{marginTop: 40}}>
        <Image source={SIcon} style={{width: 300, height: 300}} />
      </View>
      <View style={{alignItems: 'center',width: '80%', height: 200}}>
        <Text style={{fontSize: 32, fontWeight: 600, color: '#EEEEEE', marginTop: 5}}>Welcome {user.FirstName}</Text>
        <Text style={{fontSize: 18, fontWeight: 600, color: '#EEEEEE', marginTop: 5}}>Your account has been successfully created!</Text>
        <Text style={{fontSize: 24, fontWeight: 600, color: '#EEEEEE', marginTop: 5}}>Thank you for choosing us!</Text>
      </View>
      
      <TouchableOpacity onPress={handleContinue}
        style={{marginTop: 20, width: 200, height: 50, backgroundColor: (loading) ? '#F1E5AC' : '#FFD700', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
      >
        <Text style={{color: '#4C4C4C', fontWeight: 'bold', fontSize: 20 }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
