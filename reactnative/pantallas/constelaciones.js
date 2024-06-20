import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Modal, TouchableOpacity, Button, FlatList } from 'react-native';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useEstrellasDesbloqueadas } from '../estrellasDesbloqueadasContext';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../UsuarioContext';


const Constelaciones = ({ }) => {
  const [constelaciones, setConstelaciones] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedConstelacion, setSelectedConstelacion] = useState(null);
  const [unlockModalVisible, setUnlockModalVisible] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [unlockSuccessModalVisible, setUnlockSuccessModalVisible] = useState(false);
  const [unlockFailureModalVisible, setUnlockFailureModalVisible] = useState(false);
  const { setEstrellasDesbloqueadas, diferenciaPuntos } = useEstrellasDesbloqueadas();
  const [constelacionDesbloqueadaModalVisible, setConstelacionDesbloqueadaModalVisible] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { userId } = useUser();

  const navigation = useNavigation();
  useEffect(() => {
    loadFonts();
    fetchConstelaciones();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      'LexendRegular': require('../assets/fonts/Lexend-VariableFont_wght.ttf'),
      'PoppinsBold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  const fetchConstelaciones = () => {
    axios.get('http://172.20.10.7:8080/constelaciones')
      .then(response => {
        console.log('Constelaciones fetched:', response.data);
        setConstelaciones(response.data);
      })
      .catch(error => {
        console.error('Error fetching constellations:', error);
      });
  };


  const openModal = (constelacion) => {
    setSelectedConstelacion(constelacion);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedConstelacion(null);
  };

  const openUnlockModal = () => {
    setUnlockModalVisible(true);
  };

  const closeUnlockModal = () => {
    setUnlockModalVisible(false);
  };

  const closeUnlockSuccessModal = () => {
    setUnlockSuccessModalVisible(false);
  };

  const closeUnlockFailureModal = () => {
    setUnlockFailureModalVisible(false);
  };

  const desbloquearConstelacion = async () => {
    try {
      // Consultar si la constelación ya está desbloqueada para el usuario
      const response = await axios.get(`http://172.20.10.7:8080/constelacionesdesbloqueadas/${userId}/${selectedConstelacion.id}`);
      if (response.data) {
        setConstelacionDesbloqueadaModalVisible(true);
        console.log("Elige de nuevo. La constelación elegida ya está desbloqueada.");
      } else {
        if (diferenciaPuntos >= selectedConstelacion.estrellasConstelacion) {
          const response = await axios.post('http://172.20.10.7:8080/desbloquearConstelacion', {
            usuarioId: userId,
            constId: selectedConstelacion.id,
            estrellasDesbloqueadas: selectedConstelacion.estrellasConstelacion,
            fechaDesbloqueo: new Date().toISOString()
          });
          console.log("Estrellas desbloqueadas total: ", response.data); 
          setEstrellasDesbloqueadas(response.data);
          if (stompClient) {
            stompClient.send('/desbloquearConstelacion', {}, JSON.stringify({
              usuarioId: userId,
              constId: selectedConstelacion.id
            }));
          }
          setUnlockSuccessModalVisible(true);
        } else {
          // Si el conteo de meditaciones es menor al número de estrellas, mostrar un mensaje de error que impide el desbloqueo
          console.log("No tienes suficientes meditaciones para desbloquear esta constelación.");
          setUnlockFailureModalVisible(true);
        }
      }
    }
    catch (error) {
      console.error('Error desbloqueando constelación:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.constelacionContainer}>
        <Image
          style={styles.image}
          source={{ uri: `http://172.20.10.7:8080/images/${item.nombreArchivo}.png?v=${new Date().getTime()}` }}
        />
        <Text style={styles.constelacionNombre}>{item.constelacion}</Text>
        <View style={styles.constelacionEstrellasContainer}>
          <Text style={styles.constelacionEstrellasText}>{item.estrellasConstelacion}</Text>
          <Image
            style={styles.constelacionEstrellaImage}
            source={require('../assets/estrellaPuntos.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={constelaciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3} 
        contentContainerStyle={styles.listContent} 
      />
      {selectedConstelacion && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
            <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
              <TouchableOpacity style={styles.closeIconContainer} onPress={closeModal}>
                <Image source={require('../assets/cerrar.png')} style={styles.closeIcon} />
              </TouchableOpacity>
              <Image
                style={styles.modalImage}
                source={{ uri: `http://172.20.10.7:8080/images/${selectedConstelacion.nombreArchivo}.png?v=${new Date().getTime()}` }}
              />
              <Text style={[styles.modalTitle, styles.modalTextTitle]}>{selectedConstelacion.constelacion}</Text>
              <Text style={[styles.modalDescription, styles.modalText]}>{selectedConstelacion.descripcion}</Text>
              <View style={styles.buttonContainerModal}>
                <TouchableOpacity style={styles.buttonEstrellas} onPress={openUnlockModal}>
                  <Text style={styles.buttonText}>{`Estrellas: ${selectedConstelacion.estrellasConstelacion}`}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
      {selectedConstelacion && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={unlockModalVisible}
          onRequestClose={closeUnlockModal}
        >
          <TouchableOpacity style={styles.modalContainer} onPress={closeUnlockModal}>
            <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
              <Text style={[styles.modalTitle, styles.modalTextTitle]}>Desbloquear utilizando {selectedConstelacion.estrellasConstelacion} estrellas</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={closeUnlockModal}>
                  <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={desbloquearConstelacion}>
                  <Text style={styles.buttonText}>Desbloquear</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={unlockSuccessModalVisible}
        onRequestClose={closeUnlockSuccessModal}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={closeUnlockSuccessModal}>
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <Text style={[styles.modalTitle, styles.modalText]}>Constelación desbloqueada</Text>
            <TouchableOpacity style={styles.button} onPress={closeUnlockSuccessModal}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      {/* Modal para fallo en desbloqueo */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={unlockFailureModalVisible}
        onRequestClose={closeUnlockFailureModal}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={closeUnlockFailureModal}>
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <Text style={[styles.modalTitle, styles.modalText]}>No tienes suficientes estrellas para desbloquear la constelación</Text>
            <TouchableOpacity style={styles.button} onPress={closeUnlockFailureModal}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={constelacionDesbloqueadaModalVisible}
        onRequestClose={() => setConstelacionDesbloqueadaModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={() => setConstelacionDesbloqueadaModalVisible(false)}>
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <Text style={[styles.modalTitle, styles.modalText]}>Elige de nuevo. La constelación ya está desbloqueada</Text>
            <TouchableOpacity style={styles.button} onPress={() => setConstelacionDesbloqueadaModalVisible(false)}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  constelacionContainer: {
    width: '94%',
    margin: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  constelacionNombre: {
    fontFamily: 'LexendRegular',
    fontSize: 17,
    marginBottom: 5,
  },
  constelacionEstrellasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor:'#8D5273',
    paddingHorizontal:15,
    paddingVertical:4,
    borderRadius:8,
  },
  constelacionEstrellasText: {
    fontFamily: 'LexendRegular',
    fontSize: 14,
    marginRight: 5,
    color:'white',
  },
  constelacionEstrellaImage: {
    width: 20,
    height: 20,
  },
  constelacionEstrellas: {
    fontFamily: 'LexendRegular',
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  buttonContainerModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  modalStars: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8D5273',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'LexendRegular'
  },
  modalText: {
    fontFamily: 'LexendRegular',
  },
  modalTextTitle: {
    fontFamily: 'PoppinsBold',
    fontSize: 17,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  closeIcon: {
    width: 30,
    height: 30,
    tintColor: '#C3727C',
  },
  buttonEstrellas: {
    backgroundColor: '#8D5273',
    padding: 10,
    borderRadius: 8,
    width: '70%',
    alignItems: 'center',
  }
});

export default Constelaciones;