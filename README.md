# (ITMSD 3) Laboratory 1: One Life + One Button

# ColorSwitchGame
A simple React Native + Expo mobile game created for the Mobile Application Development – Game Jam Lab.

The game follows the One Button + One Life rule where the player must rely on quick reflexes and focus to survive.

# Mobile App Game Jam – Laboratory 1
Course: Mobile Application Development
Framework: React Native + Expo
Concept: One Button + One Life Game

## Game Overview
ColorSwitchGame is a fast reaction mobile game where players must tap the correct colored circles before time runs out.

Each circle stays on the screen for only two seconds, so players must react quickly. If the player fails to tap the circle in time, the game ends immediately because the game only has one life.

To make the game more challenging, other shapes appear as distractions. These shapes should not be tapped. If the player taps the wrong shape or misses the circle, the game ends.

The game tests the player’s: Reaction speed and Focus

while keeping the gameplay simple and easy to understand.

## Technologies Used
- React Native
- Expo


# Reflection
### What was your game idea?
My game idea was to create a simple a mobile game called ColorSwitchGame. The game is for the player to tap only the colored circles that appear on the screen and each circle stays on the screen for only two seconds, so the player needs to react quickly before the time runs out. If the player does not tap the circle in time, the game ends immediately because the game only has one life. I added other shapes and colors that appear on the screen as distractions. These shapes are not part of the goal to make the game more challenging, the player must focus and tap only the correct circles. The game is designed to test the player's reaction speed and attention. 


### What was the most difficult part to implement?
The most difficult part was the timing and touch detection. The circles only stay on the screen for a short time, so I needed to make sure the timer works properly and resets every time a new circle appears. I used React Hooks like useState and useEffect in React Native to control the timer and the game state. The difficult part was detecting the correct shape when the player taps the screen. Sometimes the circles and other shapes appear close to each other, so the game must detect the correct tap. I had to test and adjust the game several times to make sure the taps work correctly and the gameplay stays smooth.



### What would you improve with more time?
If I had more time I would improve the design and add more features to make the game more fun. For example, I would addsound effects and vibration feedback when the player taps a circle or when the game ends and I would also improve the animations so the circles appear and disappear more smoothly. I would add saving the player's high score using AsyncStorage, so their score is still saved even after closing the app and I would improve the user interface to make the game look attractive.



## GitHub Repository
https://github.com/aimejoyces/ColorSwitchGame.git



# Demo Video Link:
https://drive.google.com/drive/folders/1Anbpe7jQX5nOZXcv-ZnGk27oIZ49q1VX?usp=sharing
