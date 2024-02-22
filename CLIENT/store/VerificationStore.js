import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useVerificationStore = create(
    persist(
        (set) => ({
            verificationId: null,
            setVerificationId: (newState) => set({ verificationId: newState }),
        }),
        {
            name: 'verificationStore',
            getStorage: () => AsyncStorage,
        }
    )
);

export default useVerificationStore;