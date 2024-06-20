//home.js
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, StyleSheet, ImageBackground, Image } from 'react-native';
import * as Font from 'expo-font';
import { useUser } from '../UsuarioContext';

const Home = () => {

    const navigation = useNavigation();
    const { userId } = useUser(); 


    const onPressEmpezar = () => {
        navigation.navigate('Configurar Temporizador')
    }

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

    return (
        <ImageBackground
            source={require('../assets/fotoEstrellas.jpg')}
            style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.textoInicio}>Lyra te da la bienvenida</Text>
                    <Text style={styles.textoComplemento}>a un espacio para descansar al final del día.</Text>
                    <Text style={styles.textoMeditar}>Comienza configurando un temporizador para meditar</Text>
                    <Pressable style={styles.button} onPress={onPressEmpezar}>
                        <Text style={styles.buttonText}>Empezar</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
    },
    textoInicio:{
        fontFamily:'PoppinsBold',
        color:'white',
        fontSize:25,
    },
    textoComplemento:{
        fontFamily:'LexendRegular',
        fontSize:16,
        color:'white',
        marginBottom:350,
    },
    textoMeditar:{
        fontFamily:'LexendRegular',
        fontSize:16,
        textAlign:'center',
        color:'white',
        marginBottom:10,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#C3727C',
        padding: 10,
        borderRadius: 5,
        paddingHorizontal: 70,
        paddingVertical: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Lexend-Regular',
    },
});

export default Home;


