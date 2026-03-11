import React from 'react';
import { Circle } from './Circle';
import { Square } from './Square';
import { Star } from './Star';

export type ShapeType = 'CIRCLE' | 'STAR' | 'SQUARE';

export interface GameObject {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  color: string;
  tapped: boolean;
}

interface ShapeProps {
  obj: GameObject;
  size: number;
}

export const Shape: React.FC<ShapeProps> = ({ obj, size }) => {
  if (obj.tapped) return null;

  switch (obj.type) {
    case 'CIRCLE':
      return <Circle color={obj.color} size={size} x={obj.x} y={obj.y} />;
    case 'SQUARE':
      return <Square color={obj.color} size={size} x={obj.x} y={obj.y} />;
    case 'STAR':
      return <Star color={obj.color} size={size} x={obj.x} y={obj.y} />;
    default:
      return null;
  }
};