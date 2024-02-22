import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import app from '../../firebaseConfig';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import useAuthStore from '../../store/AuthStore';
import useUserStore from '../../store/UserStore';
import { router } from 'expo-router';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

import SIcon from '../../assets/SecondaryLogo.png';


// Firebase references
const auth = getAuth(app);

// Double-check that we can run the example
if (!app?.options || Platform.OS === 'web') {
  throw new Error(
    'This example only works on Android or iOS, and requires a valid Firebase config.'
  );
}

function Signup() {
  // Ref or state management hooks
  const recaptchaVerifier = React.useRef(null);
  const [countryCode, setCountryCode] = React.useState('+254');
  const [phoneNumber, setPhoneNumber] = React.useState(760333333);
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [isVerifying, setIsVerifying] = React.useState(false);
  const { setLoggedIn, setPhone } = useAuthStore();
  // const state = useAuthStore(); 

  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;

  const sendVerification = async () => {
    try {
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          `${countryCode}${phoneNumber}`,
          recaptchaVerifier.current
        );
        setVerificationId(verificationId);
        setIsVerifying(true);
        console.log(verificationId)
        showMessage({
          text: 'Verification code has been sent to your phone.',
        });
      } catch (err) {
        showMessage({ text: `Error: ${err.message}`, color: 'red' });
      }
  }


  const verifyCode = async () => {
    try {
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
        await signInWithCredential(auth, credential);
        
        setPhone(countryCode + phoneNumber);
        console.log(credential)
        // Check if user exists in the database
        const db = getFirestore(app);
        const userRef = collection(db, 'User');
        const userQuery = query(userRef, where("Phone", "==", phoneNumber));
        const querySnapshot = await getDocs(userQuery);
        // Check if any documents match the query
        if (!querySnapshot.empty) {
          // User exists, redirect to home
          // Get the user's data and id
          const userData = querySnapshot.docs[0].data();
          const userId = querySnapshot.docs[0].id;
          const user = {
            UserId: userId,
            FirstName: userData.FirstName,
            Phone: userData.Phone,
            CartId: userData.CartId,
            CollectionId: userData.CollectionId,
            AddressId: userData.AddressId,
          }
          useUserStore.getState().setUser(user);
          setLoggedIn(true);
          router.replace('/home');
        } else {
          // User does not exist, redirect to create new account page
          router.replace('(auth)/NewAccount');
        }
        showMessage({ text: 'Phone authentication successful 👍' });
      } catch (err) {
        showMessage({ text: `Error: ${err.message}`, color: 'red' });
      }
  }

  return isVerifying ? (

    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#EEEEEE' }}>
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F6E3C', width: "100%", height: 150, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
        <View style={{marginTop: 40}}>
          <Image source={SIcon} style={{width: 100, height: 100}} />
        </View>
      </View>
      <View style={{alignItems: 'center', padding: 20, marginTop: 20, width: '90%', backgroundColor: '#FFFFFF', borderRadius: 10, margin: 10, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 2}}>
        <View >
          <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Enter Verification code</Text>
        </View>
        <View >
          <Text style={{ marginTop: 20, marginBottom: 10, fontSize: 16, fontWeight: '600', color: '#4C4C4C' }}>OTP was sent to your SMS</Text>
        </View>
        <View style={{justifyContent: 'center', borderColor: '#1F6E3C', borderWidth: 2, height: 40, width: 200, borderRadius: 10}}>
          <TextInput
            style={{ fontSize: 18, fontWeight: '700', color: '#4C4C4C', marginLeft: 10}}
            editable={!!verificationId}
            keyboardType='name-phone-pad'
            letterSpacing={7}
            placeholder="_ _ _ _ _ _"
            onChangeText={setVerificationCode}
          />
        </View>
        <TouchableOpacity
          title="Confirm Verification Code"
          disabled={!verificationId || !verificationCode}
          onPress={verifyCode}
          style={{marginTop: 20, width: 200, height: 50, backgroundColor: (!verificationId) ? '#F1E5AC' : '#FFD700', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
        >
          <Text style={{color: '#4C4C4C', fontWeight: 'bold', fontSize: 20 }}>Verify Code</Text>
        </TouchableOpacity>
      </View>
      
      
      
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: 'center' },
          ]}
          onPress={() => showMessage(undefined)}>
          <Text
            style={{
              color: message.color || 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {/* {attemptInvisibleVerification && <FirebaseRecaptchaBanner />} */}
    </View>
      ) : (
    
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#EEEEEE'}}>
      <StatusBar style="light" />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        // attemptInvisibleVerification
        attemptInvisibleVerification = {true}
      />
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F6E3C', width: "100%", height: 150, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
        <View style={{marginTop: 40}}>
          <Image source={SIcon} style={{width: 100, height: 100}} />
        </View>
      </View>
      <View style={{alignItems: 'center', padding: 20, marginTop: 20, width: '90%', backgroundColor: '#FFFFFF', borderRadius: 10, margin: 10, shadowColor:'#4C4C4C', shadowOffset: {width: 0, height:0}, shadowOpacity: 0.3, shadowRadius: 2}}>
        <View >
          <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>Enter phone number</Text>
        </View>
        <View >
          <Text style={{ marginTop: 20, marginBottom: 5, fontSize: 16, fontWeight: '600', color: '#4C4C4C', width: 280 }}>* reCAPTCHA test will be done before sending the OTP</Text>
        </View>
        <View style={{flexDirection: 'row', padding: 3}}>
          <View style={{justifyContent: 'center', alignItems: 'center', borderColor: '#1F6E3C', borderWidth: 2, height: 40, width: 80, borderRadius: 10, marginRight: 5}}>
            <Text style={{fontSize: 18, color: '#4C4C4C', fontWeight: '700', letterSpacing: 5  }}>{countryCode}</Text>
          </View>
          <View style={{justifyContent: 'center', borderColor: '#1F6E3C', borderWidth: 2, height: 40, width: 195, borderRadius: 10}}>
            <TextInput
              style={{fontSize: 18, fontWeight: '700', color: '#4C4C4C', marginLeft: 5}}
              placeholder="7xx xxx xxx"
              letterSpacing={5}
              autoCompleteType="tel"
              keyboardType="name-phone-pad"
              textContentType="telephoneNumber"
              onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
          </View>
        </View>
        
        <TouchableOpacity
          disabled={!phoneNumber || phoneNumber.length < 9}
          onPress={sendVerification}
          style={{marginTop: 20, width: 280, height: 50, backgroundColor: (!phoneNumber || phoneNumber.length < 9) ? '#F1E5AC' : '#FFD700', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
        >
          <Text style={{color: '#4C4C4C', fontWeight: 'bold', fontSize: 20 }}>Send Verification Code</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}
