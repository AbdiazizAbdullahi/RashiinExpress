import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import useUserStore from '../../../../store/UserStore';
import { router } from 'expo-router';
import { FlashList } from '@shopify/flash-list'
import { getFirestore, doc, onSnapshot, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import app from '../../../../firebaseConfig';
import Toast from '../../../../components/Toast';
import { MaterialIcons } from '@expo/vector-icons';


const Collection = () => {
  const [loading, setLoading] = useState(true);
  const [coll, setColl] = useState([]);
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

  const collId = user.CollectionId
  const cartId = user.CartId;

  useEffect(() => {
    // Fetch item detail from Firestore
    const fetchColl = async () => {
      try {
        setLoading(true);
  
        const db = getFirestore(app);
        const collRef = doc(db, 'Collection', collId);
  
        // Add a real-time data listener
        const unsubscribe = onSnapshot(collRef, (doc) => {
          if (doc.exists()) {
            const collData = doc.data();
            const collItems = collData.Items;
            setColl(collItems);
            setLoading(false);

            if(collItems.length > 0) {
              setEmpty(true);
            } else {
              setEmpty(false);
            }
            
          } else {
            console.log('Collection not found');
            setEmpty(false);
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
  
    fetchColl();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEEEEE' }}>
        <View style={{justifyContent: 'center', alignItems: 'center', width: 80, height: 80, backgroundColor: '#FFFFFF', borderRadius: 10}}>
          <ActivityIndicator size="large" color="#1F6E3C" />
        </View>
      </View>
    );
  }

  // Function to add an item to the cart
  const addToCart = async (data) => {
    try {
      
      
      const db = getFirestore(app);
      const cartRef = doc(db, 'Cart', cartId);
      console.log(data.ProductId, data.Name, data.Brand, data.Size, data.Price, data.Photo, data.Stock)

      // Retrieve the current cart document
      const cartDoc = await getDoc(cartRef);

      
      if (cartDoc.exists() && data.Stock == 'In stock') {
        const cartData = cartDoc.data();
        // Check if the product already exists in the cart
        const existingItemIndex = cartData.Items.findIndex(Item => Item.ProductId === data.ProductId);

        if (existingItemIndex !== -1) {
          // Update the quantity of the existing item
          const updatedItems = [...cartData.Items];
          updatedItems[existingItemIndex].Quantity += 1;

          // Update the cart document with the modified items array
          await updateDoc(cartRef, { Items: updatedItems });
        } else {
          const { Name, Brand, Size, Price, Image: Photo, Stock, ProductId } = data;
          // Add a new item to the items array
          const newItem = {
            ProductId: ProductId,
            Quantity: 1,
            Name: Name,
            Brand: Brand,
            Size: Size,
            Price: Price,
            Image: Photo,
            Stock: Stock,
          };
          await updateDoc(cartRef, { Items: arrayUnion(newItem) });
        }
      } else if (data.Stock == 'Out of stock') {
        // display toast message for 4 seconds
        showToast('warning', 'This item is out of stock', '#DC143C');
      } else {
        console.log('Something went wrong, CODE: 659');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      
      const db = getFirestore(app);
      const collRef = doc(db, 'Collection', collId);
  
      // Get the current collection data
      const collSnapshot = await getDoc(collRef);
      if (collSnapshot.exists()) {
        const collData = collSnapshot.data();
        const collItems = collData.Items;
  
        // Find the index of the item with the matching productId
        const itemIndex = collItems.findIndex(item => item.ProductId === productId);
  
        if (itemIndex !== -1) {
          // Remove the item from the cart
          collItems.splice(itemIndex, 1);
  
          // Update the cart in Firestore
          await updateDoc(collRef, { Items: collItems });
        }
      }
  
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return empty ? (
    <View style={{flex: 1, height: '100%', width: '100%', backgroundColor: '#EEEEEE'}}>
      <View style={{height: 50, alignItems: 'center', backgroundColor: '#1F6E3C'}}/>
      <View style={{flex: 1, alignSelf: 'center', height: '100%', width: '98%', backgroundColor: "#EEEEEE"}}>
              <FlashList 
                data={coll}
                keyExtractor={(item) => item.ProductId}
                estimatedItemSize={50}
                renderItem={({ item }) =>
                <TouchableOpacity 
                  onPress={() => router.push(`product/${item.ProductId}`)}
                  style={{flex: 1, alignItems: 'center'}}
                  >
                  <View style={{ flexDirection: 'row', alignItems: 'center',width: '98%', height: 102, marginTop: 5, borderRadius: 10, backgroundColor: '#FFFFFF', shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 2, elevation: 5}}>
                    <View style={{marginLeft: 1}}>
                      <Image source={{
                        uri: item.Image,
                      }} 
                      style={{ width: 100, height: 100, borderRadius: 10 }} 
                      />
                    </View>
                    <View style={{flex: 1}}>
                      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                        <View style={{width: '88%'}}>
                          <Text style={{color: '#4C4C4C', fontSize: 16, fontWeight: '500'}} numberOfLines={2}>{item.Brand} {item.Name} {item.Stock} </Text>
                        </View>
                        <View style={{}}>
                          <TouchableOpacity onPress={() => removeItem(item.ProductId)}>
                            <MaterialIcons name="cancel" size={24} color="#DC143C" />
                          </TouchableOpacity>
                        </View>

                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <View style={{justifyContent: 'center'}}>
                          <Text style={{fontSize: 18, fontWeight: 700}}>Ksh {item.Price}</Text>
                        </View>
                        <View >
                          <TouchableOpacity onPress={() => addToCart(item)} style={{backgroundColor: '#FFD700', width: 100, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#4C4C4C'}}>Add to cart</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    
                  </View>
                </TouchableOpacity>
                }
              />
        </View>
        {toastMessage && (
          <Toast iconName={toastMessage.iconName} message={toastMessage} onPress={() => setToastMessage(null)} />
        )}
    </View>
  ) : (
    <View style={{flex: 1, height: '100%', width: '100%', backgroundColor: '#EEEEEE'}}>
      <View style={{height: 80, alignItems: 'center', backgroundColor: '#1F6E3C'}}/>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', height: 80, backgroundColor: '#EEEEEE', borderRadius: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#4C4C4C'}}>Your collection is empty</Text>
      </View>
    </View>
  );
}

export default Collection