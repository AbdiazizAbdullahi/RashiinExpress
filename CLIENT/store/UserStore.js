import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserStore = create((set) => ({
  user: null,
  setUser: async (newUser) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      set({ user: newUser });
    } catch (error) {
      console.error('Error setting user in AsyncStorage:', error);
    }
  },
  clearUser: async () => {
    try {
      await AsyncStorage.removeItem('user');
      set({ user: null });
    } catch (error) {
      console.error('Error clearing user in AsyncStorage:', error);
    }
  },
  initializeUser: async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
      }
    } catch (error) {
      console.error('Error initializing user from AsyncStorage:', error);
    }
  },
}));

export default useUserStore;
