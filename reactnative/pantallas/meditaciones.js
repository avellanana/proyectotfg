import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

const Meditaciones = () => {
    const [sound, setSound] = useState(null);
    const [playingId, setPlayingId] = useState(null);

    const playPauseSound = async (audioFile, id) => {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
            setPlayingId(null);
        }

        if (playingId === id) {
            setPlayingId(null);
        } else {
            const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
            setSound(newSound);
            setPlayingId(id);
            await newSound.playAsync();
        }
    };

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Meditaciones guiadas</Text>
            <View style={styles.item}>
                <Image source={require('../assets/marmed.jpg')} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Meditación para terminar el día</Text>
                    <Text style={styles.description}>Relajación profunda</Text>
                    <Text style={styles.duration}>Duración: 6 minutos</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => playPauseSound(require('../assets/Meditacion6min.mp3'), 'meditacion1')}
                >
                    <Image
                        source={playingId === 'meditacion1' ? require('../assets/pause.png') : require('../assets/play.png')}
                        style={styles.buttonImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <Image source={require('../assets/arbolesmed.jpg')} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Meditación para dormir</Text>
                    <Text style={styles.description}>Calma y paz interior</Text>
                    <Text style={styles.duration}>Duración: 10 minutos</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => playPauseSound(require('../assets/MeditacionDormir.mp3'), 'meditacion2')}
                >
                    <Image
                        source={playingId === 'meditacion2' ? require('../assets/pause.png') : require('../assets/play.png')}
                        style={styles.buttonImage}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.header}>Sonidos para dormir</Text>
            <View style={styles.item}>
                <Image source={require('../assets/cascadason.jpg')} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Sonido de río</Text>
                    <Text style={styles.description}>Fluye con la vida</Text>
                    <Text style={styles.duration}>Duración: 18 minutos</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => playPauseSound(require('../assets/SonidoNoche.mp3'), 'sonido1')}
                >
                    <Image
                        source={playingId === 'sonido1' ? require('../assets/pause.png') : require('../assets/play.png')}
                        style={styles.buttonImage}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <Image source={require('../assets/piedrasson.jpg')} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Instrumental de cuerdas</Text>
                    <Text style={styles.description}>Serenidad y pausa</Text>
                    <Text style={styles.duration}>Duración: 15 minutos</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => playPauseSound(require('../assets/SonidoHarp.mp3'), 'sonido2')}
                >
                    <Image
                        source={playingId === 'sonido2' ? require('../assets/pause.png') : require('../assets/play.png')}
                        style={styles.buttonImage}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 5,
        marginBottom: 30,
    },
    header: {
        fontSize: 22,
        marginVertical: 10,
        fontFamily: 'PoppinsBold',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: '#00000021',
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: 120,
        height: 120,
        marginRight: 10,
        borderRadius: 10,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 17,
        fontFamily: 'PoppinsBold',
    },
    description: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'Lexend-Regular',
    },
    duration: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'Lexend-Regular',
    },
    button: {
        padding: 10,
    },
    buttonImage: {
        width: 24,
        height: 24,
    },
});

export default Meditaciones;
