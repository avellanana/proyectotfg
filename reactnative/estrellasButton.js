import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useEstrellasDesbloqueadas } from './estrellasDesbloqueadasContext';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font'; 

const EstrellasButton = () => {
    const { diferenciaPuntos } = useEstrellasDesbloqueadas();
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false); 

    useEffect(() => {
        loadFonts();
      }, []);
    
      const loadFonts = async () => {
        await Font.loadAsync({
          'LexendRegular': require('./assets/fonts/Lexend-VariableFont_wght.ttf'),
          'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'),
        });
        setFontsLoaded(true);
      };

    const onPressButton = () => {
        navigation.navigate('Constelaciones');
    };

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPressButton}>
            <Image source={require('./assets/estrellaPuntos.png')} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{diferenciaPuntos}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        top: 60,
        right: 15,
        paddingVertical: 3,
        paddingHorizontal:10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        flexDirection: 'row', // Alinear la imagen y el texto horizontalmente
        alignItems: 'center', // Centrar verticalmente
        backgroundColor:'#8D5273',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily:'LexendRegular',
    },
    image: {
        width: 20, // Ajustar el tamaño de la imagen según sea necesario
        height: 20,
        marginRight: 5, // Espacio entre la imagen y el texto
    },
    textContainer: {
        marginLeft: 5, // Espacio entre la imagen y el texto
    },
});

export default EstrellasButton;