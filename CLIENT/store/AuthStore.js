import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  phone: null,
  
  setLoggedIn: async (status) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(status));
      set({ isLoggedIn: status });
    } catch (error) {
      console.error('Error setting login status in AsyncStorage:', error);
    }
  },

  setPhone: async (phone) => {
    try {
      await AsyncStorage.setItem('phone', JSON.stringify(phone));
      set({ phone: phone });
    } catch (error) {
      console.error('Error setting phone number in AsyncStorage:', error);
    }
  },

  checkLoginStatus: async () => {
    try {
      const storedStatus = await AsyncStorage.getItem('isLoggedIn');
      const storedPhone = await AsyncStorage.getItem('phone');
      if (storedStatus) {
        set({
          isLoggedIn: JSON.parse(storedStatus),
          phone: storedPhone ? JSON.parse(storedPhone) : null,
        });
      }
    } catch (error) {
      console.error('Error checking login status from AsyncStorage:', error);
    }
  },
}));

export default useAuthStore;
