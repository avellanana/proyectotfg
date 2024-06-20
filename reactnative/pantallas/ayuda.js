import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const Ayuda = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Reglas</Text>
                    <Text style={styles.sectionTextR}>
                        - Cada vez que completes una meditación obtendrás una estrella.
                    </Text>
                    <Text style={styles.sectionTextR}>
                        - Para desbloquear una constelación debes haber acumulado la cantidad de estrellas que se indican en cada constelación.
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
                    <Text style={styles.sectionText}>
                        - ¿Puedo recuperar los puntos después de desbloquear una constelación?
                    </Text>
                    <Text style={styles.sectionTextR}>
                        No, una vez que la constelación fue desbloqueada, no se puede revertir esta acción.
                    </Text>
                    <Text style={styles.sectionText}>
                        - ¿Qué sucede cuando termine de desbloquear todas las constelaciones?
                    </Text>
                    <Text style={styles.sectionTextR}>
                        Puedes optar por jugar en modo 'Avanzado'. En el modo avanzado, los puntos solo se obtienen si completas las meditaciones varios días seguidos.
                    </Text>
                    <Text style={styles.sectionText}>
                        - ¿Cómo puedo acceder al modo Avanzado?
                    </Text>
                    <Text style={styles.sectionTextR}>
                        El acceso al modo avanzado está disponible solo para usuarios Premium.
                    </Text>
                    <Text style={styles.sectionText}>
                        - ¿Qué otros beneficios tiene ser usuario Premium?
                    </Text>
                    <Text style={styles.sectionTextR}>
                        Ser usuario Premium te dará acceso a las 88 constelaciones. Como usuario del plan Básico tienes acceso a 21 constelaciones.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',  // Color de fondo para todo el contenedor
        marginTop:5,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#00000021',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'PoppinsBold',
        color: '#5A336E',
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
        fontFamily: 'PoppinsBold',  // Asegúrate de tener la fuente PoppinsRegular definida
    },
    sectionTextR: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        fontFamily: 'Lexend-Regular',  // Asegúrate de tener la fuente Lexend-Regular definida
    },
});

export default Ayuda;
