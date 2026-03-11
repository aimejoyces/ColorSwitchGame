import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Timer } from './Timer';

interface HUDProps {
  score: number;
  timeLeft: number;
  timerTextStyle: any;
  isDark: boolean;
  onPause: () => void;
}

export const HUD: React.FC<HUDProps> = ({ score, timeLeft, timerTextStyle, isDark, onPause }) => (
  <View style={styles.hudContainer}>
    <View style={[styles.hudItem, isDark ? styles.hudItemDark : styles.hudItemLight]}>
      <Text style={[styles.hudLabel, isDark ? styles.textLight : styles.textDark]}>SCORE</Text>
      <Text style={[styles.hudValue, isDark ? styles.textLight : styles.textDark]}>{score}</Text>
    </View>
    
    <View style={[styles.hudItem, isDark ? styles.hudItemDark : styles.hudItemLight, { marginHorizontal: 10 }]}>
      <Text style={[styles.hudLabel, isDark ? styles.textLight : styles.textDark]}>TIME</Text>
      <Timer timeLeft={timeLeft} timerTextStyle={timerTextStyle} />
    </View>

    <TouchableOpacity style={styles.miniPauseButton} onPress={onPause}>
      <Ionicons name="pause" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  hudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'center',
    zIndex: 100,
  },
  hudItem: {
    flex: 1,
    height: 65,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hudItemDark: {
    backgroundColor: '#1E1E1E',
  },
  hudItemLight: {
    backgroundColor: '#FFFFFF',
  },
  hudLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    opacity: 0.6,
  },
  hudValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniPauseButton: {
    width: 65,
    height: 65,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  textLight: { color: '#FFFFFF' },
  textDark: { color: '#121212' },
});