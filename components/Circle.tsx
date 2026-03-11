import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CircleProps {
  color: string;
  size: number;
  x: number;
  y: number;
}

export const Circle: React.FC<CircleProps> = ({ color, size, x, y }) => (
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
    <View 
      style={[
        styles.circleShape, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2, 
          backgroundColor: color 
        }
      ]} 
    />
  </View>
);

const styles = StyleSheet.create({
  shape: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleShape: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
