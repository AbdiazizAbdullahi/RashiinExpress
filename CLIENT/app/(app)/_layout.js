import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack >
        <Stack.Screen name="(tabs)" options={{
            headerShown: false,
            title: 'TABS',
        }} />
        <Stack.Screen name="(account-menu)/(orders)/orders" options={{
          headerShown: true,
          title: 'ORDERS',
          headerTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerTintColor: '#EEEEEE',
          headerStyle: {backgroundColor: '#1F6E3C'}
        }}/>
        <Stack.Screen name="(account-menu)/(coupons)/coupons" options={{
          headerShown: true,
          title: 'ORDERS',
          headerTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerTintColor: '#EEEEEE',
          headerStyle: {backgroundColor: '#1F6E3C'}
        }}/>
        <Stack.Screen name="(account-menu)/(coins)/coins" options={{
          headerShown: true,
          title: 'ADEEGO COINS',
          headerTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerTintColor: '#EEEEEE',
          headerStyle: {backgroundColor: '#1F6E3C'}
        }}/>
        <Stack.Screen name="(account-menu)/(profile)/profile" options={{
          headerShown: true,
          title: 'PROFILE',
          headerTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerTintColor: '#EEEEEE',
          headerStyle: {backgroundColor: '#1F6E3C'}
        }}/>
        <Stack.Screen name="(account-menu)/(address)/address" options={{
          headerShown: true,
          title: 'ADDRESS',
          headerTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerTintColor: '#EEEEEE',
          headerStyle: {backgroundColor: '#1F6E3C'}
        }}/>
        <Stack.Screen name="(account-menu)/(contactus)/contactus" options={{
          headerShown: true,
          title: 'CONTACT US',
          headerTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
          headerTintColor: '#EEEEEE',
          headerStyle: {backgroundColor: '#1F6E3C'}
        }}/>
        <Stack.Screen name="(categories)/Dry-foods" options={{
            headerShown: true,
            title: 'DRY FOODS',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(categories)/Beverages" options={{
            headerShown: true,
            title: 'BEVERAGES',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(categories)/Dairy" options={{
            headerShown: true,
            title: 'DAIRY',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(categories)/Snacks" options={{
            headerShown: true,
            title: 'SNACKS',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(categories)/Oil&Butter" options={{
            headerShown: true,
            title: 'OIL & BUTTER',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(categories)/OtherFoods" options={{
            headerShown: true,
            title: 'OTHER FOODS',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="checkout/Checkout" options={{
            headerShown: true,
            title: 'CHECKOUT',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="product/[id]" options={{
            headerShown: true,
            title: '',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="checkout/OrderConfirmation" options={{
            headerShown: false,
            title: 'ORDER CONFIRMATION',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(search)/search" options={{
            headerShown: true,
            title: 'SEARCH',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(Non-food-essentials)/BabyCare" options={{
            headerShown: true,
            title: 'BABY CARE',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(Non-food-essentials)/Cleaning" options={{
            headerShown: true,
            title: 'CLEANING ESSENTIALS',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(Non-food-essentials)/Gas" options={{
            headerShown: true,
            title: 'GAS',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(Non-food-essentials)/HomeMaintenance" options={{
            headerShown: true,
            title: 'HOME MAINTENANCE',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(Non-food-essentials)/PersonalCare" options={{
            headerShown: true,
            title: 'PERSONAL CARE',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(Non-food-essentials)/OtherEssentials" options={{
            headerShown: true,
            title: 'OTHER ESSENTIALS',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(homeScreen)/Offer" options={{
            headerShown: true,
            title: 'OFFERS',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
          <Stack.Screen name="(homeScreen)/Popular" options={{
            headerShown: true,
            title: 'POPULAR PRODUCTS',
            headerTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerBackTitleStyle: {fontSize: 16, fontWeight: '500'},
            headerTintColor: '#EEEEEE',
            headerStyle: {backgroundColor: '#1F6E3C'}
          }}/>
    </Stack>
  )
};

export default RootLayout;