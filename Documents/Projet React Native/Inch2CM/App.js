import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      {isLoading ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <HomeScreen />
      )}
    </ThemeProvider>
  );
}
