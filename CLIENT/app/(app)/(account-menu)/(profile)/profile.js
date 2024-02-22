import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { doc, getFirestore, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../../../../firebaseConfig';
import useUserStore from '../../../../store/UserStore';
import useAuthStore from '../../../../store/AuthStore';
import { router } from 'expo-router';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  console.log(isLoggedIn)

  useEffect(() => {
    useUserStore.getState().initializeUser();
    useAuthStore.getState().checkLoginStatus();
  }, []);

  const userId = user.UserId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const db = getFirestore(app);
        const profileRef = doc(db, 'User', userId); 

        const profileInfo = await getDoc(profileRef);
        if (profileInfo.exists()) {
          const profileData = profileInfo.data();
          setProfile(profileData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching profile Data.', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE' }}>
        <ActivityIndicator size="large" color="#1F6E3C" />
      </View>
    );
  }

  const handleLogout = () => {
    useUserStore.getState().clearUser();
    useAuthStore.getState().setLoggedIn(false);

    router.replace('/(auth)/Signup');
  }

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#EEEEEE'}}>
      <View style={{backgroundColor: '#FFFFFF', marginTop: 100, width: '85%', padding: 10, borderRadius: 10}}>
        <View >
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 14, fontWeight: '700', color: '#4C4C4C'}}>First Name:</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', height: 40, justifyContent: 'center', borderRadius: 10, borderColor: '#1F6E3C', borderWidth: 2, marginTop: 5}}>
            <Text style={{color: '#4C4C4C', fontWeight: '500', marginLeft: 10}}>{profile.FirstName}</Text>
          </View>
        </View>
        <View >
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 14, fontWeight: '700', color: '#4C4C4C'}}>Last Name:</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', height: 40, justifyContent: 'center', borderRadius: 10, borderColor: '#1F6E3C', borderWidth: 2, marginTop: 5}}>
            <Text style={{color: '#4C4C4C', fontWeight: '500', marginLeft: 10}}>{profile.LastName}</Text>
          </View>
        </View>
        <View >
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 14, fontWeight: '700', color: '#4C4C4C'}}>Email:</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', height: 40, justifyContent: 'center', borderRadius: 10, borderColor: '#1F6E3C', borderWidth: 2, marginTop: 5}}>
            <Text style={{color: '#4C4C4C', fontWeight: '500', marginLeft: 10}}>{profile.Email}</Text>
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <View >
            <Text style={{fontSize: 14, fontWeight: '700', color: '#4C4C4C'}}>Phone Number:</Text>
          </View>
          <View style={{backgroundColor: '#EEEEEE', height: 40, justifyContent: 'center', borderRadius: 10, borderColor: '#1F6E3C', borderWidth: 2, marginTop: 5, marginBottom: 10}}>
            <Text style={{color: '#4C4C4C', fontWeight: '500', marginLeft: 10}}>{profile.Phone}</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <TouchableOpacity style={{backgroundColor: '#FFD700', width: 120, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 20}} onPress={handleLogout}>
          <Text style={{color: '#4C4C4C', fontWeight: '700', fontSize: 16}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}