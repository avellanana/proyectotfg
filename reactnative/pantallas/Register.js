import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'Lexend-Regular': require('../assets/fonts/Lexend-VariableFont_wght.ttf'),
                'PoppinsBold': require('../assets/fonts/Poppins-Bold.ttf'),
            });
            setFontsLoaded(true);
        };
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
    }

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://172.20.10.7:8080/api/auth/registro', {
                nombreusuario: username,
                password: password,
                email: email
            });

            if (response.status === 200) {
                navigation.navigate('Login');
            } else {
                setError('Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setError('Error de conexión');
        }
    };

    return (
        <ImageBackground source={require('../assets/fondocielo.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Image source={require('../assets/lyraPrincipal2.png')} style={styles.logo} />
                <Text style={styles.title}>Registrarse</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'PoppinsBold',
        color: '#fff', 
    },
    input: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'white',
        marginTop: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', 
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        padding: 11,
        marginVertical: 10,
        backgroundColor: '#C3727C',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'PoppinsBold',
    },
});

export default RegisterScreen;

