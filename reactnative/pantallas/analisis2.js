import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import SockJS from 'sockjs-client';
import * as Stomp from 'react-native-stompjs';
import { useEstrellasDesbloqueadas } from '../estrellasDesbloqueadasContext';
import { useUser } from '../UsuarioContext';

const Analisis2 = () => {
    const { estrellasDesbloqueadas, setEstrellasDesbloqueadas, meditationCount, setMeditationCount, diferenciaPuntos } = useEstrellasDesbloqueadas();
    const { userId } = useUser();

    //revisar si quitar
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Obtener meditationCount
                const meditationResponse = await axios.get(`http://172.20.10.7:8080/meditation/count/${userId}`);
                const meditationCount = meditationResponse.data;
                setMeditationCount(meditationCount);

                // Obtener estrellasDesbloqueadas
                const estrellasResponse = await axios.get(`http://172.20.10.7:8080/sumarEstrellas/${userId}`);
                const estrellasCount = estrellasResponse.data;
                console.log(estrellasCount);
                setEstrellasDesbloqueadas(estrellasCount);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();
    }, [setMeditationCount, setEstrellasDesbloqueadas]);

    return (
        <View style={styles.container}>
            <Text>Hola, la suma de puntos del usuario es: {meditationCount}</Text>
            <Text>Estrellas desbloqueadas total: {estrellasDesbloqueadas}</Text>
            <Text>Diferencia de puntos {diferenciaPuntos}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Analisis2;
