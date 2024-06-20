import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../UsuarioContext'; // Importa el contexto de usuario
import * as Font from 'expo-font';

const LoginScreen = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const { login } = useUser();
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

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://172.20.10.7:8080/api/auth/login', {
                nombreusuario: username,
                password: password
            });

            console.log('Respuesta del backend:', response.data); 

            if (typeof response.data === 'number') {
                console.log('ID de usuario recibido:', response.data);

                login(response.data);

                // Pasar el ID de usuario como parámetro
                setIsAuthenticated(true);
                navigation.navigate('Home', { id: response.data });
            } else {
                console.log('Respuesta incorrecta del backend:', response.data);
                setError('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            if (error.response && error.response.status === 401) {
                setError('Usuario o contraseña incorrectos');
            } else {
                setError('Error de conexión');
            }
        }
    };

    return (
        <ImageBackground source={require('../assets/fondocielo.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Image source={require('../assets/lyraPrincipal2.png')} style={styles.logo} />
                <Text style={styles.title}>Iniciar Sesión</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Registrarse</Text>
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
        resizeMode: 'cover', // Opcional: 'contain', 'stretch'
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

export default LoginScreen;
