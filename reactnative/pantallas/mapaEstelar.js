import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { useUser } from '../UsuarioContext'; 

const MapaEstelar = () => {
    const [constelaciones, setConstelaciones] = useState([]);
    const { userId } = useUser();
    const fondoEstrellas = require('../assets/fondoestrellas.png');
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const numColumns = 3; 
    const numRows = 7; 
    const margin = 10; 
    const existingPositions = [];

    const fetchConstelaciones = async () => {
        try {
            const response = await fetch(`http://172.20.10.7:8080/constelacionesdesbloqueadas/${userId}`);
            const data = await response.json();
            console.log(data);
            setConstelaciones(data);
        } catch (error) {
            console.error('Error fetching constelaciones:', error);
        }
    };

    useEffect(() => {
        fetchConstelaciones();
    }, []);

    const getRandomPosition = () => {
        let col, row;
        let attempts = 0;
        const maxAttempts = 100; 

        do {
            col = Math.floor(Math.random() * numColumns);
            row = Math.floor(Math.random() * numRows);

            // Verificar si la posición ya está ocupada
            const overlap = existingPositions.some(({ col: c, row: r }) => c === col && r === row);

            if (!overlap) {
                existingPositions.push({ col, row });
                break;
            }

            attempts++;
        } while (attempts < maxAttempts);

        if (attempts === maxAttempts) {
            console.warn('No se pudo encontrar una posición válida después de varios intentos.');
            return null;
        }

        const columnWidth = (screenWidth - (numColumns + 1) * margin) / numColumns;
        const rowHeight = (screenHeight - (numRows + 1) * margin) / numRows;
        const left = col * (columnWidth + margin) + margin;
        const top = row * (rowHeight + margin) + margin;

        return { left, top, width: columnWidth - margin, height: rowHeight - margin };
    };

    return (
        <ImageBackground source={fondoEstrellas} style={styles.background}>
            {constelaciones.map((constelacion, index) => {
                const position = getRandomPosition();
                if (!position) return null;

                const { left, top, width, height } = position;

                return (
                    <View key={index} style={[styles.constelacionItem, { left, top, width, height }]}>
                        <Image source={{ uri: `${constelacion.imageUrl}?v=6` }} style={styles.image} />
                    </View>
                );
            })}
            <TouchableOpacity style={styles.buttonContainer} onPress={fetchConstelaciones}>
                <Image source={require('../assets/refresh.png')} style={styles.buttonImage} />
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    constelacionItem: {
        position: 'absolute',
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    buttonImage: {
        width: 40,
        height: 40,
    },
});

export default MapaEstelar;

