import React, { useState, useEffect } from 'react';
import { SplashScreen } from 'expo-splash-screen';

export const useSplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [ready, setReady] = useState(false); // Add a state for readiness
  
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsVisible(false);
      }
    };
  
    const onReady = (callback) => {
      if (!ready) {
        setReady(true); // Set ready only once
        callback(); // Call the provided callback function when ready
      }
    };
  
    return { isVisible, hideSplashScreen, onReady };
  };