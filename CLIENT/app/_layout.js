import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Slot } from 'expo-router';
import useAuthStore from '../store/AuthStore';

const InitialLayout = () => {
  const router = useRouter();

  useEffect(() => {
    const initializeState = async () => {
      try {
        await useAuthStore.getState().checkLoginStatus();
        const isLoggedIn = useAuthStore.getState().isLoggedIn; // Get the updated value

        console.log(isLoggedIn);

        if (isLoggedIn) {
          router.push('/home');
        } else {
          router.replace('/(auth)/Signup');
        }
      } catch (error) {
        console.error('Error initializing state:', error);
      }
    };

    initializeState();
  }, [router]);

  return <Slot />;
};

const RootLayout = () => {
  return <InitialLayout />
}

// Export RootLayout
export default RootLayout;
