import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SquareProps {
  color: string;
  size: number;
  x: number;
  y: number;
}

export const Square: React.FC<SquareProps> = ({ color, size, x, y }) => (
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
        styles.squareShape, 
        { 
          width: size, 
          height: size, 
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
  squareShape: {
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
