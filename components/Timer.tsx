import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

interface TimerProps {
  timeLeft: number;
  timerTextStyle: any;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, timerTextStyle }) => (
  <View style={styles.timerRow}>
    <Animated.Text style={[styles.hudValue, timerTextStyle]}>
      {(timeLeft / 1000).toFixed(1)}s
    </Animated.Text>
  </View>
);

const styles = StyleSheet.create({
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hudValue: {
    fontSize: 24,
    fontWeight: '900',
  },
});
