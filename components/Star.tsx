import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface StarProps {
  color: string;
  size: number;
  x: number;
  y: number;
}

export const Star: React.FC<StarProps> = ({ color, size, x, y }) => (
  <View 
    style={[
      styles.shape, 
      { 
        width: size, 
        height: size, 
        top: y, 
        left: x 
      }
    ]} 
    pointerEvents="none"
  >
    <Ionicons name="star" size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  shape: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
