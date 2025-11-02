# Colguetti

A mobile application built with **Expo (React Native)** to manage **timed alarms with item checklists**.  
Each alarm helps you collect specific items before a countdown ends — ideal for organizing routines, reminders, or timed preparations.

---

## Features

- Create alarms with customizable countdown durations  
- Add and manage item lists linked to each alarm  
- Local notifications when alarms finish  
- Persistent storage using AsyncStorage  
- Background execution support (with battery optimization disabled)
- Animated UI transitions for a smoother experience  

---

## Tech Stack

| Category | Library |
|-----------|----------|
| **Framework** | [Expo](https://expo.dev/) (React Native 0.81) |
| **Language** | TypeScript |
| **Navigation** | `@react-navigation/native`, `@react-navigation/native-stack` |
| **Storage** | `@react-native-async-storage/async-storage` |
| **Notifications** | `expo-notifications` |
| **Icons** | `lucide-react-native` |
| **UI Feedback** | `toastify-react-native` |
| **Layout** | `react-native-safe-area-context`, `react-native-screens`, `react-native-svg` |
| **Build Tools** | EAS Build, Expo CLI |

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/marcosdima/colguetti_react.git
cd colguetti
```
    
2. Install dependencies:
```bash
npm install
```

3. Build the app in development:
```bash
npm run build:dev
```
