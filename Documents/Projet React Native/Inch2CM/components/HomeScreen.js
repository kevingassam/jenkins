import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [inches, setInches] = useState('');
  const [centimeters, setCentimeters] = useState('');
  const [activeInput, setActiveInput] = useState('inches');
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const convertInchesToCm = (value) => {
    if (value === '') {
      setCentimeters('');
      return;
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const cmValue = (numValue * 2.54).toFixed(2);
      setCentimeters(cmValue);
    }
  };

  const convertCmToInches = (value) => {
    if (value === '') {
      setInches('');
      return;
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const inchValue = (numValue / 2.54).toFixed(3);
      setInches(inchValue);
    }
  };

  const handleInchesChange = (value) => {
    setInches(value);
    setActiveInput('inches');
    convertInchesToCm(value);
  };

  const handleCmChange = (value) => {
    setCentimeters(value);
    setActiveInput('centimeters');
    convertCmToInches(value);
  };

  const clearAll = () => {
    setInches('');
    setCentimeters('');
    setActiveInput('inches');
  };

  const addNumber = (num) => {
    if (activeInput === 'inches') {
      const newValue = inches + num;
      handleInchesChange(newValue);
    } else {
      const newValue = centimeters + num;
      handleCmChange(newValue);
    }
  };

  const addDecimal = () => {
    if (activeInput === 'inches') {
      if (!inches.includes('.')) {
        const newValue = inches + '.';
        handleInchesChange(newValue);
      }
    } else {
      if (!centimeters.includes('.')) {
        const newValue = centimeters + '.';
        handleCmChange(newValue);
      }
    }
  };

  const deleteLast = () => {
    if (activeInput === 'inches') {
      const newValue = inches.slice(0, -1);
      handleInchesChange(newValue);
    } else {
      const newValue = centimeters.slice(0, -1);
      handleCmChange(newValue);
    }
  };

  const NumberButton = ({ number, onPress, colors }) => (
    <TouchableOpacity 
      style={[styles.numberButton, { backgroundColor: colors.numberButton }]} 
      onPress={onPress}
    >
      <Text style={[styles.numberButtonText, { color: colors.text }]}>{number}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Inch2CM</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Pouces ↔ Centimètres</Text>
          </View>

          {/* Floating Theme Button */}
          <TouchableOpacity 
            style={[styles.floatingThemeButton, { backgroundColor: colors.surface, borderColor: colors.border }]} 
            onPress={toggleTheme}
          >
            <Text style={[styles.themeButtonText, { color: colors.text }]}>
              {isDarkMode ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>

          {/* Conversion Cards */}
          <View style={styles.conversionContainer}>
            {/* Inches Card */}
            <View style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: activeInput === 'inches' ? colors.activeBorder : 'transparent' }
            ]}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => setActiveInput('inches')}
              >
                <Text style={[styles.unitLabel, { color: colors.textSecondary }]}>Pouces</Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: activeInput === 'inches' ? colors.primary : colors.text }
                  ]}
                  value={inches}
                  onChangeText={handleInchesChange}
                  placeholder="0.00"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  editable={false}
                  onFocus={() => setActiveInput('inches')}
                />
                <Text style={[styles.unitSymbol, { color: colors.textSecondary }]}>in</Text>
              </TouchableOpacity>
            </View>

            {/* Conversion Arrow */}
            <View style={styles.arrowContainer}>
              <Text style={[styles.arrow, { color: colors.textSecondary }]}>↔</Text>
            </View>

            {/* Centimeters Card */}
            <View style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: activeInput === 'centimeters' ? colors.activeBorder : 'transparent' }
            ]}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => setActiveInput('centimeters')}
              >
                <Text style={[styles.unitLabel, { color: colors.textSecondary }]}>Centimètres</Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: activeInput === 'centimeters' ? colors.primary : colors.text }
                  ]}
                  value={centimeters}
                  onChangeText={handleCmChange}
                  placeholder="0.00"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                  editable={false}
                  onFocus={() => setActiveInput('centimeters')}
                />
                <Text style={[styles.unitSymbol, { color: colors.textSecondary }]}>cm</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Custom Keyboard */}
          <View style={[styles.keyboardContainer, { backgroundColor: colors.keyboard }]}>
            <View style={styles.keyboardRow}>
              <NumberButton number="7" onPress={() => addNumber('7')} colors={colors} />
              <NumberButton number="8" onPress={() => addNumber('8')} colors={colors} />
              <NumberButton number="9" onPress={() => addNumber('9')} colors={colors} />
            </View>
            <View style={styles.keyboardRow}>
              <NumberButton number="4" onPress={() => addNumber('4')} colors={colors} />
              <NumberButton number="5" onPress={() => addNumber('5')} colors={colors} />
              <NumberButton number="6" onPress={() => addNumber('6')} colors={colors} />
            </View>
            <View style={styles.keyboardRow}>
              <NumberButton number="1" onPress={() => addNumber('1')} colors={colors} />
              <NumberButton number="2" onPress={() => addNumber('2')} colors={colors} />
              <NumberButton number="3" onPress={() => addNumber('3')} colors={colors} />
            </View>
            <View style={styles.keyboardRow}>
              <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.specialButton }]} onPress={addDecimal}>
                <Text style={[styles.specialButtonText, { color: colors.textSecondary }]}>.</Text>
              </TouchableOpacity>
              <NumberButton number="0" onPress={() => addNumber('0')} colors={colors} />
              <TouchableOpacity style={[styles.specialButton, { backgroundColor: colors.specialButton }]} onPress={deleteLast}>
                <Text style={[styles.specialButtonText, { color: colors.textSecondary }]}>⌫</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keyboardRow}>
              <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
                <Text style={styles.clearButtonText}>Effacer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  floatingThemeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 1000,
  },
  themeButtonText: {
    fontSize: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  conversionContainer: {
    marginBottom: 5,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unitLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  input: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    flex: 2,
    paddingVertical: 10,
  },
  unitSymbol: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 0,
  },
  arrow: {
    fontSize: 24,
    fontWeight: '600',
  },
  keyboardContainer: {
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  numberButton: {
    borderRadius: 5,
    width: (width - 120) / 3,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    margin: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  numberButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  specialButton: {
    borderRadius: 5,
    width: (width - 120) / 3,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    margin: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  specialButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#ef4444',
    borderRadius: 15,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default HomeScreen; 