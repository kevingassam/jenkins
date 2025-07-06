import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animation de zoom et dézoom en boucle
    const startAnimation = () => {
      Animated.sequence([
        // Zoom in
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        // Zoom out
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Répéter l'animation
        startAnimation();
      });
    };

    startAnimation();

    // Timer pour passer à la page suivante
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer);
      scaleAnim.stopAnimation();
    };
  }, [onFinish, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.4,
    height: height * 0.2,
  },
});

export default SplashScreen; 