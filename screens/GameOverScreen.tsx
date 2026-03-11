import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GameOverScreenProps {
  score: number;
  isDark: boolean;
  onRestart: () => void;
  onExit: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, isDark, onRestart, onExit }) => (
  <View style={styles.centerContainer}>
    <View style={[styles.modalCard, isDark ? styles.hudItemDark : styles.hudItemLight]}>
      <Text style={styles.gameOverText}>GAME OVER</Text>
      
      <View style={styles.finalScoreBox}>
        <Text style={[styles.finalScoreLabel, isDark ? styles.textLight : styles.textDark]}>SCORE</Text>
        <Text style={[styles.finalScoreValue, isDark ? styles.textLight : styles.textDark]}>{score}</Text>
      </View>
      
      <TouchableOpacity style={[styles.mainButton, { width: '100%' }]} onPress={onRestart}>
        <Text style={styles.buttonText}>PLAY AGAIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.secondaryButton, { marginTop: 20 }]} onPress={onExit}>
        <Text style={styles.secondaryButtonText}>MAIN MENU</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    elevation: 15,
  },
  hudItemDark: { backgroundColor: '#1E1E1E' },
  hudItemLight: { backgroundColor: '#FFFFFF' },
  gameOverText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FF5252',
    marginBottom: 10,
    textAlign: 'center',
  },
  finalScoreBox: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  finalScoreLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.6,
  },
  finalScoreValue: {
    fontSize: 56,
    fontWeight: '900',
  },
  mainButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  secondaryButton: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2196F3',
  },
  textLight: { color: '#FFFFFF' },
  textDark: { color: '#121212' },
});
