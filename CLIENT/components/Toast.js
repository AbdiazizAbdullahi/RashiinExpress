import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Toast = ({ iconName, message, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: 'transparent', alignItems: 'center', },
      ]}
      onPress={onPress}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: message?.color, borderColor: '#EEEEEE', borderWidth: 2, borderRadius: 15, marginTop: 85, paddingHorizontal: 5}}>
            {iconName && (
              <AntDesign
                name={iconName}
                size={20}
                color={'#EEEEEE'}
              />
            )}
            <Text
              style={{
                color: '#EEEEEE',
                fontSize: 16,
                fontWeight: '400',
                textAlign: 'center',
                margin: 5,
              }}>
              {message?.text}
            </Text> 
        </View>
    </TouchableOpacity>
  );
};

export default Toast;
