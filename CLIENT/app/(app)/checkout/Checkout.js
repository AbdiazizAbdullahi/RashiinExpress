import { ActivityIndicator, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { doc, getFirestore, getDoc, collection, query, where, getDocs, addDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import app from '../../../firebaseConfig';
import useUserStore from '../../../store/UserStore';

export default function Checkout() {
  const [address, setAddress] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponId, setCouponId] = useState(null);
  const [couponData, setCouponData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderSuccessfull, setOrderSuccessfull] = useState(false);
  const user = useUserStore((state) => state.user);

  const handleCouponCodeChange = (value) => {
    setCouponCode(value);
  };
  console.log(couponCode)
  console.log(total)

  useEffect(() => {
    useUserStore.getState().initializeUser();
  }, []);

  const addressId = user.AddressId;
  const cartId = user.CartId;

  const formatMoney = (amount) => {
    return amount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
  };

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const db = getFirestore(app);
      const addressRef = doc(db, 'Address', addressId);
      const addressInfo = await getDoc(addressRef);

      if (addressInfo.exists()) {
        const addressData = addressInfo.data();
        setAddress(addressData);
      } else {
        console.log('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const db = getFirestore(app);
      const cartRef = doc(db, 'Cart', cartId);
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        const cartItems = cartData.Items;
        setOrderItems(cartItems);
        const ItemsSum = cartItems.reduce((total, item) => total + item.Quantity, 0);
        setTotalItems(ItemsSum);
        const totalAmount = cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);

        setOriginalTotal(totalAmount);
        setTotal(totalAmount);
        console.log(totalAmount);
      } else {
        console.log('Cart not found');
      }
    } catch (error) {
      console.error('Error fetching item detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCouponCode = async () => {
    try {
      const db = getFirestore(app);
      const couponsRef = collection(db, 'Coupons');
      const q = query(couponsRef, where('Code', '==', couponCode));
      const querySnapshot = await getDocs(q);
      const Remaining = querySnapshot.docs[0].data().Remaining;
      console.log(Remaining);

      if (Remaining > 0) {
        const couponId = querySnapshot.docs[0].id;
        setCouponId(couponId);
        const couponData = querySnapshot.docs[0].data();
        setCouponData(couponData);
        console.log(couponData);
        return couponData;
      }else if (Remaining == 0) {
        console.log('Coupon code has been used up');
        return null;
      }else {
        console.log('Coupon code does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error checking coupon code:', error);
      return null;
    }
  };

  const handleApplyCoupon = async () => {
    if (couponApplied) {
      setTotal(originalTotal);
      setCouponApplied(false);
    }

    const couponData = await fetchCouponCode(couponCode);

    if (couponData) {
      // if (!originalTotal) {
      //   setOriginalTotal(total);
      // }

      let newTotal = originalTotal;
      if (couponData.Amount > 0) {
        const couponAmount = couponData.Amount;
        newTotal -= couponAmount;
        setCouponAmount(couponAmount);
      }
      if (couponData.Pc > 0) {
        const couponAmount = (newTotal * couponData.Pc) / 100;
        newTotal -= couponAmount;
        setCouponAmount(couponAmount);
      }
      setTotal(newTotal);
      setCouponApplied(true);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [addressId]);

  useEffect(() => {
    fetchCart();
  }, [cartId]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE' }}>
        <ActivityIndicator size="large" color="#1F6E3C" />
      </View>
    );
  }

  // Count the total amount of the order
  const totalAmount = orderItems.reduce((total, item) => total + item.Price * item.Quantity, 0);

  const addOrder = async () => {
    try {
      setLoading(true)

      const db = getFirestore(app);
      const ordersRef = collection(db, 'Orders');
  
      const orderData = {
        Items: orderItems,
        UserId: 'BVzTmx0FFszEMx69NZHi',
        Status: 'Pending',
        PaymentStatus: 'Unpaid',
        TotalItems: totalItems,
        TotalAmount: total,
      };
  
      const newOrderRef = await addDoc(ordersRef, orderData);
      console.log('New order added with ID: ', newOrderRef.id);

      if (couponApplied) {
        // Deduct 1 from the "Remaining" field in the "Coupons" collection
        const db = getFirestore(app);
        const couponRef = doc(db, 'Coupons', couponId);
        updateDoc(couponRef, { Remaining: (couponData.Remaining - 1) });
      }

      if (newOrderRef) {
        // Empty the cart
        const db = getFirestore(app);
        const cartRef = doc(db, 'Cart', cartId);
        updateDoc(cartRef, { Items: [] }).then(() => {
          // Navigate to the order confirmation screen
          router.push('checkout/OrderConfirmation');
          setLoading(false)
        });
      }
    } catch (error) {
      console.error('Error adding order: ', error);
      setLoading(false)
      setOrderSuccessfull(false);
    }
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center',}}>
      <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <View style={{justifyContent: 'center', width: '90%', marginTop: 30}}>
          <View >
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Deliver to:</Text>
          </View>
          <View style={{padding: 10, backgroundColor: '#FFFFFF', borderRadius: 10, marginTop: 5, shadowColor:'#1F6E3C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: '#4C4C4C'}}>{address.City} - {address.Area}, {address.Estate} Court, {address.HouseNo} </Text>
          </View>
        </View>
        <View style={{marginTop: 30, justifyContent: 'center', width: '90%'}}>
          <View >
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Payment method</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#FFFFFF', marginTop: 5, borderRadius: 10, shadowColor:'#1F6E3C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3}}>
            <MaterialIcons name="payment" size={24} color="#FFD700" /> 
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#4C4C4C'}}>Cash / Mpesa on delivery</Text>
            </View>
          </View>
        </View>
        <View style={{width: '90%', marginTop: 30 }}>
          <View >
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Coupons</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', height: 60, marginTop: 5, borderRadius: 10, padding: 5, shadowColor:'#1F6E3C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3}}>
            <View style={{justifyContent: 'center', borderColor: '#1F6E3C', borderWidth: 1, height: 40, backgroundColor: '#EEEEEE', width: 200, borderRadius: 10, marginRight: 10}}>
              <TextInput placeholder="Enter coupon code" value={couponCode}
                onChangeText={handleCouponCodeChange} 
            style={{fontSize: 16, fontWeight: '500', color: '#4C4C4C', marginLeft: 5}}/>
            </View>
            <TouchableOpacity onPress={handleApplyCoupon} 
             style={{width: 110, height: 40, backgroundColor: '#FFD700', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#4C4C4C', fontWeight: 'bold', fontSize: 18 }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{width: '90%', height: '42%', backgroundColor: '#FFFFFF', marginTop: 30, borderRadius: 10, padding: 10, shadowColor:'#1F6E3C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 3}}>
        <View style={{marginBottom: 10,}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Order Summary</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
          <View >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#4C4C4C' }}>Subtotal</Text>
          </View>
          <View >
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#4C4C4C' }}>Ksh {totalAmount}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
          <View >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#4C4C4C' }}>Coupon</Text>
          </View>
          <View >
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#4C4C4C' }}>Ksh {couponAmount}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
          <View >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#4C4C4C' }}>Total Items:</Text>
          </View>
          <View >
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#4C4C4C' }}>{totalItems}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
          <View >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#4C4C4C' }}>Delivery</Text>
          </View>
          <View >
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#4C4C4C' }}>Free</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20}}>
          <View >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4C4C4C' }}>Total</Text>
          </View>
          <View >
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4C4C4C' }}>{formatMoney(total)}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
          <TouchableOpacity onPress={addOrder} style={{width: 200, height: 45, backgroundColor: '#FFD700', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#4C4C4C', fontWeight: 'bold', fontSize: 18 }}>Place order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}