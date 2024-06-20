//timer.js
import { useEstrellasDesbloqueadas } from '../estrellasDesbloqueadasContext';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, Image } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Audio } from 'expo-av';
import axios from 'axios';
import campanaSound from '../assets/campana.mp3';
import campanitaSound from '../assets/campanita.mp3';
import cuencoSound from '../assets/cuenco.mp3';
import lyraSound from '../assets/lyra.mp3';
import SockJS from 'sockjs-client';
import * as Stomp from 'react-native-stompjs';
import pause from '../assets/pause.png';
import play from '../assets/play.png';
import { useUser } from '../UsuarioContext';
import * as Font from 'expo-font';

const Timer = ({ route, navigation }) => {
    const { selectedMinute, timerKey, selectedSound } = route.params;
    const [paused, setPaused] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const { estrellasDesbloqueadas, setEstrellasDesbloqueadas, meditationCount, setMeditationCount } = useEstrellasDesbloqueadas(); //cambiar por este
    const { userId } = useUser();

    useEffect(() => {
        setIsCompleted(false);
        setPaused(false);
    }, [timerKey]);

    useEffect(() => {
        const fetchMeditationCount = async () => {
            try {
                const response = await axios.get(`http://172.20.10.7:8080/meditation/count/${userId}`);
                const count = response.data;
                console.log('Meditation count:', response.data);
                setMeditationCount(count);
            } catch (error) {
                console.error('Error fetching meditation count:', error);
            }
        };

        fetchMeditationCount();

        const socket = new SockJS('http://172.20.10.7:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            console.log('WebSocket connected');
            stompClient.subscribe('/topic/meditationCount', (message) => {
                console.log('WebSocket message:', message.body);
                const count = JSON.parse(message.body);
                setMeditationCount(count);
            });
        }, (error) => {
            console.error('WebSocket connection error:', error);
        });

        return () => {
            stompClient.disconnect();
        };
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handlePause = () => {
        setPaused((prev) => !prev);
    };

    const handleReturn = () => {
        setPaused(false);
        navigation.navigate('Configurar Temporizador'); 
    };

    const handleComplete = async () => {
        setIsCompleted(true); 
        await playSound(selectedSound); 
        registrarMeditacion(selectedMinute);

    };

    const handleFinish = () => {
        setIsCompleted(false);
        navigation.navigate('HomeScreen'); 
    };

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

    //Envia a la tabla en mysql
    const registrarMeditacion = async (tiempo) => {
        try {
            const response = await axios.post('http://172.20.10.7:8080/meditation', {
                tiempo: tiempo,
                usuarioId: userId, 
                fecha: new Date().toISOString() 
            });
            console.log('Meditación registrada:', response.data);
            console.log(Font.isLoaded('Lexend-Regular'));
        } catch (error) {
            console.error('Error al registrar la meditación:', error);
        }
    };

    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                key={timerKey}
                isPlaying={!paused && !isCompleted}
                duration={selectedMinute * 60} 
                colors={['#5A336E']}
                onComplete={handleComplete}
                size={350} 
                strokeWidth={20} 
                strokeLinecap="round" 
                trailColor="#f5f5f5" 
                textStyle={{ fontSize: 30 }} 
            >
                {({ remainingTime, animatedColor }) => (
                    <View style={styles.timer}>
                        <Text style={{ color: animatedColor, fontSize: 30 }}>
                            {formatTime(remainingTime)}
                        </Text>
                    </View>
                )}
            </CountdownCircleTimer>
            {!isCompleted ? (
                <TouchableOpacity onPress={handlePause}>
                    <Image source={paused ? play : pause} style={styles.buttonImage} />
                </TouchableOpacity>
            ) : (
                <View style={styles.buttonFinish}>
                    <TouchableOpacity onPress={handleFinish}>
                        <Text style={styles.buttonText}>Terminar</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.button}>
                <TouchableOpacity onPress={handleReturn}>
                    <Text style={styles.buttonText}>Configurar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonImage: {
        width: 33,
        height: 33,
        resizeMode: 'contain',
        marginTop: 40,
    },
    button: {
        marginTop: 40,
        backgroundColor: '#C3727C',
        width: 180,
        paddingVertical: 11,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonFinish: {
        marginTop: 40,
        paddingVertical: 11,
        borderRadius: 10,
        backgroundColor: '#5A336E', 
        width: 180, 
        alignItems: 'center', 
    },
    buttonText: {
        fontFamily: 'Lexend-Regular',
        fontSize: 18,
        color: 'white',
        alignContent: 'center',
    },
});

export default Timer;