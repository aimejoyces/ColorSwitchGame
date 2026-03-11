import { Audio } from 'expo-av';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Text, TouchableOpacity } from 'react-native';
import { GameObject } from '../components/Shape';
import { GameOverScreen } from '../screens/GameOverScreen';
import { GameScreen } from '../screens/GameScreen';
import { HomeScreen } from '../screens/HomeScreen';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHAPE_SIZE = 55;
const GAME_TIME_LIMIT = 2000;

const COLORS = [
  '#FF5252', // Red
  '#2196F3', // Blue
  '#4CAF50', // Green
  '#FFEB3B', // Yellow
  '#9C27B0', // Purple
  '#FF9800', // Orange
];

type GameState = 'START' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';
type Theme = 'dark' | 'light';

export default function ColorSwitchGame() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [theme, setTheme] = useState<Theme>('dark');
  const [score, setScore] = useState(0);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME_LIMIT);
  const [soundsLoaded, setSoundsLoaded] = useState(false);
  
  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  const popSoundRef = useRef<Audio.Sound | null>(null);
  const failSoundRef = useRef<Audio.Sound | null>(null);
  const introSoundRef = useRef<Audio.Sound | null>(null);
  const startSoundRef = useRef<Audio.Sound | null>(null);
  const exitSoundRef = useRef<Audio.Sound | null>(null);

  const pulseValue = useSharedValue(0);
  const isDark = theme === 'dark';

  useEffect(() => {
    async function setupAudio() {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          allowsRecordingIOS: false,
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
          playThroughEarpieceAndroid: false,
        });

        const { sound: pop } = await Audio.Sound.createAsync(require('../assets/sounds/pop.mp3'));
        const { sound: fail } = await Audio.Sound.createAsync(require('../assets/sounds/fail.mp3'));
        const { sound: start } = await Audio.Sound.createAsync(require('../assets/sounds/start.mp3'));
        const { sound: exit } = await Audio.Sound.createAsync(require('../assets/sounds/exit.mp3'));
        const { sound: intro } = await Audio.Sound.createAsync(
          require('../assets/sounds/intro.mp3'),
          { isLooping: true, volume: 0.5 }
        );

        popSoundRef.current = pop;
        failSoundRef.current = fail;
        startSoundRef.current = start;
        exitSoundRef.current = exit;
        introSoundRef.current = intro;

        setSoundsLoaded(true);
      } catch (e) {
        console.log('Error setting up audio', e);
      }
    }
    setupAudio();

    return () => {
      popSoundRef.current?.unloadAsync();
      failSoundRef.current?.unloadAsync();
      startSoundRef.current?.unloadAsync();
      exitSoundRef.current?.unloadAsync();
      introSoundRef.current?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    async function updateIntro() {
      if (introSoundRef.current && soundsLoaded) {
        try {
          const status = await introSoundRef.current.getStatusAsync();
          if (status.isLoaded) {
            if (gameState === 'START') {
              if (!status.isPlaying) await introSoundRef.current.playAsync();
            } else {
              if (status.isPlaying) await introSoundRef.current.stopAsync();
            }
          }
        } catch (e) {}
      }
    }
    updateIntro();
  }, [gameState, soundsLoaded]);

  const playPop = async () => popSoundRef.current?.replayAsync().catch(() => {});
  const playFail = async () => failSoundRef.current?.replayAsync().catch(() => {});
  const playStart = async () => startSoundRef.current?.replayAsync().catch(() => {});
  const playExit = async () => exitSoundRef.current?.replayAsync().catch(() => {});

  const getRandomPosition = useCallback((existingObjects: GameObject[]) => {
    const maxX = SCREEN_WIDTH - SHAPE_SIZE - 30;
    const maxY = SCREEN_HEIGHT - SHAPE_SIZE - 50;
    const minX = 30;
    const minY = 140;

    let pos = {
      x: Math.random() * (maxX - minX) + minX,
      y: Math.random() * (maxY - minY) + minY,
    };

    let attempts = 0;
    while (attempts < 5 && existingObjects.some(obj => 
      Math.abs(obj.x - pos.x) < SHAPE_SIZE + 10 && 
      Math.abs(obj.y - pos.y) < SHAPE_SIZE + 10
    )) {
      pos = {
        x: Math.random() * (maxX - minX) + minX,
        y: Math.random() * (maxY - minY) + minY,
      };
      attempts++;
    }
    return pos;
  }, []);

  const getRandomColor = useCallback(() => COLORS[Math.floor(Math.random() * COLORS.length)], []);

  const getDifficulty = (currentScore: number) => {
    if (currentScore <= 5) return { targetCount: 1, decoyCount: 1 };
    if (currentScore <= 10) return { targetCount: 2, decoyCount: 2 };
    if (currentScore <= 20) return { targetCount: 3, decoyCount: 2 };
    if (currentScore <= 44) return { targetCount: 3, decoyCount: 3 };
    return { targetCount: 5, decoyCount: 4 };
  };

  const gameOver = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    playFail();
    setGameState('GAME_OVER');
  }, []);

  const spawnLevel = useCallback(() => {
    const { targetCount, decoyCount } = getDifficulty(score);
    const newObjects: GameObject[] = [];

    for (let i = 0; i < targetCount; i++) {
      const pos = getRandomPosition(newObjects);
      newObjects.push({ id: `target-${i}-${Date.now()}`, type: 'CIRCLE', x: pos.x, y: pos.y, color: getRandomColor(), tapped: false });
    }

    for (let i = 0; i < decoyCount; i++) {
      const pos = getRandomPosition(newObjects);
      newObjects.push({ id: `decoy-${i}-${Date.now()}`, type: Math.random() > 0.5 ? 'STAR' : 'SQUARE', x: pos.x, y: pos.y, color: getRandomColor(), tapped: false });
    }

    setObjects(newObjects);
    setTimeLeft(GAME_TIME_LIMIT);
    startTimeRef.current = Date.now();
    pulseValue.value = 0;
  }, [score, getRandomPosition, getRandomColor, pulseValue]);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = GAME_TIME_LIMIT - elapsed;
        
        if (remaining <= 1000 && pulseValue.value === 0) {
          pulseValue.value = withRepeat(
            withSequence(withTiming(1, { duration: 250 }), withTiming(0, { duration: 250 })),
            -1,
            true
          );
        }

        if (remaining <= 0) {
          setTimeLeft(0);
          gameOver();
        } else {
          setTimeLeft(remaining);
        }
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      pulseValue.value = 0;
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState, gameOver, pulseValue]);

  const startGame = () => {
    setScore(0);
    playStart();
    setGameState('PLAYING');
    spawnLevel();
  };

  const resumeGame = () => {
    startTimeRef.current = Date.now() - (GAME_TIME_LIMIT - timeLeft);
    setGameState('PLAYING');
  };

  const pauseGame = () => setGameState('PAUSED');
  const exitToMain = () => { playExit(); setGameState('START'); setScore(0); };
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const handleTouchAt = useCallback((x: number, y: number) => {
    if (gameState !== 'PLAYING') return;
    setObjects(prev => {
      const hitObject = prev.find(obj => {
        if (obj.tapped) return false;
        const dist = Math.sqrt(Math.pow(x - (obj.x + SHAPE_SIZE / 2), 2) + Math.pow(y - (obj.y + SHAPE_SIZE / 2), 2));
        return dist < (SHAPE_SIZE / 2 + 15);
      });
      if (!hitObject) return prev;
      if (hitObject.type !== 'CIRCLE') { setTimeout(gameOver, 0); return prev; }
      playPop();
      return prev.map(obj => obj.id === hitObject.id ? { ...obj, tapped: true } : obj);
    });
  }, [gameState, gameOver]);

  useEffect(() => {
    if (gameState === 'PLAYING' && objects.length > 0 && objects.filter(o => o.type === 'CIRCLE').every(o => o.tapped)) {
      setScore(s => s + 1);
      spawnLevel();
    }
  }, [objects, gameState, spawnLevel]);

  const timerTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(pulseValue.value, [0, 1], [isDark ? '#FFFFFF' : '#121212', '#FF5252']),
    transform: [{ scale: 1 + pulseValue.value * 0.1 }],
  }));

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.bgDark : styles.bgLight]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {gameState === 'START' && (
        <HomeScreen isDark={isDark} onStart={startGame} onToggleTheme={toggleTheme} />
      )}
      
      {gameState === 'PLAYING' && (
        <GameScreen 
          score={score}
          timeLeft={timeLeft}
          timerTextStyle={timerTextStyle}
          isDark={isDark}
          objects={objects}
          shapeSize={SHAPE_SIZE}
          onPause={pauseGame}
          onTouchAt={handleTouchAt}
        />
      )}
      
      {gameState === 'PAUSED' && (
        <View style={[styles.overlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)' }]}>
          <View style={[styles.modalCard, isDark ? styles.hudItemDark : styles.hudItemLight]}>
            <Text style={[styles.overlayTitle, isDark ? styles.textLight : styles.textDark]}>PAUSED</Text>
            <TouchableOpacity style={[styles.mainButton, { width: '100%' }]} onPress={resumeGame}>
              <Text style={styles.buttonText}>RESUME</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondaryButton, { marginTop: 20 }]} onPress={exitToMain}>
              <Text style={styles.secondaryButtonText}>EXIT TO MENU</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {gameState === 'GAME_OVER' && (
        <GameOverScreen 
          score={score}
          isDark={isDark}
          onRestart={startGame}
          onExit={exitToMain}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgDark: { backgroundColor: '#121212' },
  bgLight: { backgroundColor: '#F0F2F5' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
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
  overlayTitle: { fontSize: 32, fontWeight: '900', marginBottom: 30 },
  textLight: { color: '#FFFFFF' },
  textDark: { color: '#121212' },
  mainButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF', letterSpacing: 1 },
  secondaryButton: { paddingVertical: 12, width: '100%', alignItems: 'center' },
  secondaryButtonText: { fontSize: 14, fontWeight: '700', color: '#2196F3' },
});
