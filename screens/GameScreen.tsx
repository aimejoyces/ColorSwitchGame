import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HUD } from '../components/HUD';
import { GameObject, Shape } from '../components/Shape';

interface GameScreenProps {
  score: number;
  timeLeft: number;
  timerTextStyle: any;
  isDark: boolean;
  objects: GameObject[];
  shapeSize: number;
  onPause: () => void;
  onTouchAt: (x: number, y: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  score,
  timeLeft,
  timerTextStyle,
  isDark,
  objects,
  shapeSize,
  onPause,
  onTouchAt,
}) => (
  <View 
    style={styles.gameContainer}
    onStartShouldSetResponder={(evt) => {
      return evt.nativeEvent.locationY > 120;
    }}
    onResponderGrant={(evt) => {
      const { changedTouches } = evt.nativeEvent;
      changedTouches.forEach(touch => onTouchAt(touch.locationX, touch.locationY));
    }}
    onResponderStart={(evt) => {
      const { changedTouches } = evt.nativeEvent;
      changedTouches.forEach(touch => onTouchAt(touch.locationX, touch.locationY));
    }}
  >
    <HUD 
      score={score} 
      timeLeft={timeLeft} 
      timerTextStyle={timerTextStyle} 
      isDark={isDark} 
      onPause={onPause} 
    />
    {objects.map(obj => (
      <Shape key={obj.id} obj={obj} size={shapeSize} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
  },
});