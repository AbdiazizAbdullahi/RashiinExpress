import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect, useMemo, useCallback} from 'react'
import { getFirestore, doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../../../../firebaseConfig";
import { StatusBar } from 'expo-status-bar'
import { FlashList } from '@shopify/flash-list'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useUserStore from '../../../../store/UserStore';
import Toast from '../../../../components/Toast';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const user = useUserStore((state) => state.user);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (iconName, text, color = 'blue' ) => {
    setToastMessage({ text, color, iconName });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // Hide the toast after 4 seconds
  };

  useEffect(() => {
    useUserStore.getState().initializeUser();
  }, []);

  const cartId = user.CartId;
  console.log(cartId);

  useEffect(() => {
    // Fetch item detail from Firestore
    const fetchCart = async () => {
      try {
        setLoading(true);
  
        const db = getFirestore(app);
        const cartRef = doc(db, 'Cart', cartId);
  
        // Add a real-time data listener
        const unsubscribe = onSnapshot(cartRef, (doc) => {
          if (doc.exists()) {
            const cartData = doc.data();
            const cartItems = cartData.Items;
            setCart(cartItems);
            setLoading(false);

            if(cartItems.length > 0) {
              setEmpty(true);
            } else {
              setEmpty(false);
            }
            
          } else {
            console.log('Cart not found');
          }
        });
  
        return () => {
          // Unsubscribe from the data listener when the component unmounts
          unsubscribe();
        };
      } catch (error) {
        console.error('Error fetching item detail:', error);
        setLoading(false);
      }
    };
  
    fetchCart();
  }, []);

  // Increment the quantity of an item in the cart
  const addQuantity = useCallback(async (productId) => {
    try {
  
      const db = getFirestore(app);
      const cartRef = doc(db, 'Cart', cartId);
  
      // Get the current cart data
      const cartSnapshot = await getDoc(cartRef);
      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        const cartItems = cartData.Items;
  
        // Find the index of the item with the matching productId
        const itemIndex = cartItems.findIndex(item => item.ProductId === productId);

        if (itemIndex !== -1) {
          // Update the quantity of the existing item
          const updatedItems = [...cartData.Items];
          updatedItems[itemIndex].Quantity += 1;

          // Update the cart document with the modified items array
          await updateDoc(cartRef, { Items: updatedItems });
        }
      } else if (details.Stock == 'Out of stock') {
        alert('This item is out of stock');
      } else {
        console.log('Cart not found');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }, [cartId, cart]);


  const removeItem = useCallback(async (productId) => {
    try {
      
      const db = getFirestore(app);
      const cartRef = doc(db, 'Cart', cartId);
  
      // Get the current cart data
      const cartSnapshot = await getDoc(cartRef);
      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        const cartItems = cartData.Items;
  
        // Find the index of the item with the matching productId
        const itemIndex = cartItems.findIndex(item => item.ProductId === productId);
  
        if (itemIndex !== -1) {
          // Remove the item from the cart
          cartItems.splice(itemIndex, 1);
  
          // Update the cart in Firestore
          await updateDoc(cartRef, { Items: cartItems });
        }
      }
  
    } catch (error) {
      console.error('Error removing item:', error);
    }
  } , [cartId, cart]);

  const subtractQuantity = useCallback(async (productId) => {
    try {
  
      const db = getFirestore(app);
      const cartRef = doc(db, 'Cart', cartId);
  
      // Get the current cart data
      const cartSnapshot = await getDoc(cartRef);
      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        const cartItems = cartData.Items;
  
        // Find the index of the item with the matching productId
        const itemIndex = cartItems.findIndex(item => item.ProductId === productId);

        if (itemIndex !== -1) {
          // Update the quantity of the existing item
          const updatedItems = [...cartData.Items];
          //find quantity of the item
          if (updatedItems[itemIndex].Quantity > 1) {
            updatedItems[itemIndex].Quantity -= 1;
          }
          

          // Update the cart document with the modified items array
          await updateDoc(cartRef, { Items: updatedItems });
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  } , [cartId, cart]);

  const handleCheckout = async () => {
    // Confirm that the cart is not empty
    if (cart.length === 0) {
      showToast('warning', 'Please add some items first', '#DC143C');
    } else if (totalAmount < 150) {
      showToast('warning', 'Minimum order amount is Ksh 150', '#DC143C');
    }
    else {
      // Redirect to the checkout page
      router.push('checkout/Checkout');
    }
  }

  console.log(cart);

  const totalAmount = useMemo(() => {
    if (cart && cart.length > 0) {
      return cart.reduce((total, item) => total + (item.Price * item.Quantity), 0);
    } else {
      return 0;
    }
  }, [cart]);
  console.log(totalAmount);

  const formatMoney = (amount) => {
    return amount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE' }}>
        <View style={{justifyContent: 'center', alignItems: 'center', width: 80, height: 80, backgroundColor: '#FFFFFF', borderRadius: 10}}>
          <ActivityIndicator size="large" color="#1F6E3C" />
        </View>
      </View>
    );
  }
  
  return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#EEEEEE'}}>
      <StatusBar style="light" />
      <View style={{width: '100%', height: '92%'}}>
        <View style={{justifyContent: 'flex-end', height: 70, backgroundColor: '#1F6E3C', padding: 10}}>
          <Text 
            style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'}}
          >Items ({cart.length})</Text>
        </View>
        { empty ? (
        <View style={{flex: 1, alignSelf: 'center', height: '100%', width: '95%', backgroundColor: "#EEEEEE"}}>
              <FlashList 
                data={cart}
                keyExtractor={(item) => item.ProductId}
                estimatedItemSize={50}
                renderItem={({ item }) =>
                <TouchableOpacity 
                  onPress={() => router.push(`product/${item.ProductId}`)}
                  style={{flex: 1, alignItems: 'center'}}
                  >
                  <View style={{ flexDirection: 'row', alignItems: 'center',width: '98%', height: 85, marginTop: 5, borderRadius: 10, backgroundColor: '#FFFFFF', shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 2, elevation: 5}}>
                    <View style={{marginLeft: 1}}>
                      <Image source={{
                        uri: item.Image,
                      }} 
                      style={{ width: 80, height: 80, borderRadius: 10 }} 
                      />
                    </View>
                    <View style={{flex: 1}}>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 1}}>
                        <View style={{width: '85%'}}>
                          <Text style={{color: '#4C4C4C', fontWeight: '500'}} numberOfLines={2}>{item.Brand} {item.Name} </Text>
                        </View>
                        <View style={{marginRight: 2}}>
                          <TouchableOpacity onPress={() => removeItem(item.ProductId)}
                            style={{alignItems: 'flex-end', height: 32, width: 35, }}>
                            <MaterialIcons name="cancel" size={28} color="#DC143C" />
                          </TouchableOpacity>
                        </View>

                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <View style={{justifyContent: 'center'}}>
                          <Text style={{fontSize: 16, fontWeight: 700}}>Ksh {item.Price}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity onPress={() => subtractQuantity(item.ProductId)}>
                            <AntDesign name="minuscircle" size={24} color="#1F6E3C" />
                          </TouchableOpacity>
                          <View style={{justifyContent: 'center', alignItems: 'center', borderColor: '#1F6E3C', borderWidth: 1, height: 30, width: 50, borderRadius: 10, marginRight: 5, marginLeft: 5}}>
                            <Text style={{fontSize: 16, color: '#4C4C4C', fontWeight: '700', letterSpacing: 5  }}>{item.Quantity}</Text>
                          </View>
                          <TouchableOpacity onPress={() => addQuantity(item.ProductId)} >
                            <AntDesign name="pluscircle" size={24} color="#1F6E3C" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    
                  </View>
                </TouchableOpacity>
                }
              />
        </View>
        ) : (
    <View style={{flex: 1, height: '100%', width: '100%'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: 80, backgroundColor: '#EEEEEE', borderRadius: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#4C4C4C'}}>Your cart is empty</Text>
      </View>
    </View>
  )
        }
      </View>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, backgroundColor: '#FFFFFF', width: '96%', padding: 5, marginBottom: 2, borderColor: '#1F6E3C', borderWidth: 1}}>
        <View >
          <Text style={{fontSize: 16, fontWeight: '500'}}>Total amount :</Text>
          <Text style={{fontSize: 16, fontWeight: '700', color: '#4C4C4C'}}>{formatMoney(totalAmount)}</Text>
        </View>
        <View >
          <TouchableOpacity onPress={handleCheckout}
            style={{width: 150, height: 40, backgroundColor: '#FFD700', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
          >
            <Text style={{color: '#4C4C4C', fontWeight: 'bold', fontSize: 18 }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {toastMessage && (
          <Toast iconName={toastMessage.iconName} message={toastMessage} onPress={() => setToastMessage(null)} />
        )}
    </View>
  );
}

export default Cart