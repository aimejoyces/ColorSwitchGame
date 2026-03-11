import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HomeScreenProps {
  isDark: boolean;
  onStart: () => void;
  onToggleTheme: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ isDark, onStart, onToggleTheme }) => (
  <View style={styles.centerContainer}>
    <View style={styles.logoContainer}>
      <View style={[styles.logoCircle, { backgroundColor: '#FF5252' }]} />
      <View style={[styles.logoCircle, { backgroundColor: '#2196F3', left: 20 }]} />
      <View style={[styles.logoCircle, { backgroundColor: '#4CAF50', top: 20, left: 10 }]} />
    </View>
    
    <Text style={[styles.titleText, isDark ? styles.textLight : styles.textDark]}>Color Switch</Text>
    <Text style={[styles.subtitleText, isDark ? styles.textMutedLight : styles.textMutedDark]}>One-Life Challenge</Text>
    
    <View style={styles.instructionContainer}>
      <Text style={[styles.instructionText, isDark ? styles.textLight : styles.textDark]}>
        Tap only to switch color
      </Text>
      <Text style={[styles.instructionText, isDark ? styles.textLight : styles.textDark, { fontSize: 12, marginTop: 5 }]}>
        Avoid Stars and Squares!
      </Text>
    </View>

    <TouchableOpacity style={styles.mainButton} onPress={onStart}>
      <Text style={styles.buttonText}>START GAME</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.themeToggle} onPress={onToggleTheme}>
      <Ionicons name={isDark ? "sunny" : "moon"} size={20} color="#2196F3" />
      <Text style={styles.themeToggleText}>
        {isDark ? 'LIGHT MODE' : 'DARK MODE'}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  logoCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    opacity: 0.8,
  },
  titleText: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 30,
    textAlign: 'center',
  },
  instructionContainer: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    padding: 20,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    marginBottom: 40,
  },
  instructionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  mainButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 18,
    borderRadius: 20,
    width: '70%',
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
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    padding: 10,
  },
  themeToggleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
    marginLeft: 8,
  },
  textLight: { color: '#FFFFFF' },
  textDark: { color: '#121212' },
  textMutedLight: { color: '#AAAAAA' },
  textMutedDark: { color: '#666666' },
});