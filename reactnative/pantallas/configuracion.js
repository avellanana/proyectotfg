//configuracion.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Audio } from 'expo-av';
import campanaSound from '../assets/campana.mp3';
import campanitaSound from '../assets/campanita.mp3';
import cuencoSound from '../assets/cuenco.mp3';
import lyraSound from '../assets/lyra.mp3';
import * as Font from 'expo-font';


const Configuracion = () => {
  const navigation = useNavigation();
  const [selectedMinute, setSelectedMinute] = useState(1);
  const [selectedSound, setSelectedSound] = useState("campana");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Lexend-Regular': require('../assets/fonts/Lexend-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  const playSound = async (soundName) => {
    const soundObject = new Audio.Sound();
    try {
      switch (soundName) {
        case 'campana':
          await soundObject.loadAsync(campanaSound);
          break;
        case 'campanita':
          await soundObject.loadAsync(campanitaSound);
          break;
        case 'cuenco':
          await soundObject.loadAsync(cuencoSound);
          break;
        case 'lira':
          await soundObject.loadAsync(lyraSound);
          break;
        default:
          console.warn('Invalid sound name:', soundName);
      }
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error al reproducir el sonido:', error);
    }
  };

  const handleStartTimer = () => {
    navigation.navigate('Timer', {
      selectedMinute,
      timerKey: Math.random().toString(),
      selectedSound,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.title}>Minutos</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMinute}
            onValueChange={(itemValue) => setSelectedMinute(itemValue)}
            style={[styles.picker, styles.pickerColor]}
            itemStyle={styles.pickerItem}>
            {Array.from({ length: 60 }, (_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={i + 1} />
            ))}
          </Picker>
        </View>
      </View>
      <Text style={styles.selectedMinute}>Duración: {selectedMinute} min</Text>

      <View style={styles.soundPickerContainer}>
        <Text style={styles.title}>Sonido</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSound}
            onValueChange={(itemValue) => {
              setSelectedSound(itemValue);
              playSound(itemValue);
            }}
            style={[styles.picker, styles.pickerColor]}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Campana" value="campana" />
            <Picker.Item label="Campanita" value="campanita" />
            <Picker.Item label="Cuenco" value="cuenco" />
            <Picker.Item label="Lira" value="lira" />
          </Picker>
        </View>
      </View>
      <Text style={styles.selectedSound}>Sonido: {selectedSound}</Text>
      <TouchableOpacity style={styles.button} onPress={handleStartTimer}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  pickerContainer: {
    alignItems: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  picker: {
    width: 200,
    height: 30,
  },
  unitText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Lexend-Regular',
  },
  selectedMinute: {
    fontSize: 20,
    marginBottom: 50,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Lexend-Regular',
  },
  soundPickerContainer: {
    alignItems: 'center',
  },
  selectedSound: {
    fontSize: 20,
    marginBottom: 50,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Lexend-Regular',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 80,
    backgroundColor: '#C3727C',
  },
  buttonText: {
    color: '#F0F0F0',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Lexend-Regular',
  },
  title: {
    fontSize: 22,
    fontFamily: 'PoppinsBold',
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
  },
  pickerItem: {
    fontFamily: 'Lexend-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  pickerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 5,
    borderColor: '#192543',
    borderWidth: 1,
    borderRadius: 10,
  },
});


export default Configuracion;