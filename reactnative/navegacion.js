import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Inicio from './pantallas/homeScreen';
import Configuracion from './pantallas/configuracion';
import Analisis2 from './pantallas/analisis2';
import MapaEstelar from './pantallas/mapaEstelar';
import EstrellasButton from './estrellasButton';
import Constelaciones from './pantallas/constelaciones';
import Meditaciones from './pantallas/meditaciones';
import Ayuda from './pantallas/ayuda';
import { useUser } from './UsuarioContext';
import { useEstrellasDesbloqueadas } from './estrellasDesbloqueadasContext';

const Drawer = createDrawerNavigator();
const menuIcon = require('./assets/menu.png');

const CustomHeader = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
    <Image source={menuIcon} style={{ width: 24, height: 24, marginLeft: 10 }} />
  </TouchableOpacity>
);

const LogoutButton = ({ onPressLogout }) => (
  <View style={styles.logoutContainer}>
    <Text style={styles.cerrarText}>¿Está seguro de que desea cerrar la sesión?</Text>
    <TouchableOpacity style={styles.logoutButton} onPress={onPressLogout}>
      <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
    </TouchableOpacity>
  </View>
);

const AppDrawer = ({ isAuthenticated }) => {
  const navigation = useNavigation();
  const { logout } = useUser(); 
  const { resetData } = useEstrellasDesbloqueadas();

  const handleLogout = () => {
    console.log('Llamando a handleLogout');
    logout(); 
    resetData();
    navigation.navigate('Login'); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Drawer.Navigator
        screenOptions={{
          overlayColor: 'rgba(0, 0, 0, 0.4)',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#8D5273',
          },
          drawerStyle: {
            backgroundColor: '#8D5273',
          },
          drawerLabelStyle: {
            color: 'white',
            fontFamily: 'LexendRegular'
          },
        }}
      >
        <Drawer.Screen name="HomeScreen" component={Inicio} options={({ navigation }) => ({
          title: 'Menu',
          headerTransparent: true,
          headerLeft: () => <CustomHeader navigation={navigation} />
        })} />
        {isAuthenticated && (
          <>
            <Drawer.Screen name="Configurar Temporizador" component={Configuracion} options={{
              headerTintColor: 'white', 
              headerStyle: { backgroundColor: '#8D5273'}
            }} />
            <Drawer.Screen name="Constelaciones" component={Constelaciones} options={{
              headerTintColor: 'white',
            }} />
            <Drawer.Screen name="MapaEstelar" component={MapaEstelar} options={({ navigation }) => ({
              headerTransparent: true, 
              headerTitle: '',
              headerLeft: () => <CustomHeader navigation={navigation} />,
            })} />
            <Drawer.Screen name="Meditaciones y Sonidos" component={Meditaciones} options={{
              headerTintColor: 'white',
            }} />
            <Drawer.Screen name="Ayuda" component={Ayuda} options={{
              headerTintColor: 'white',
            }} />
            <Drawer.Screen name="Logout" options={{ title: 'Cerrar sesión' }}>
              {() => <LogoutButton onPressLogout={handleLogout} />}
            </Drawer.Screen>
          </>
        )}
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#C3727C',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 16,
    marginTop: 19,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'LexendRegular',
  },
  cerrarText:{
    fontSize: 16,
    fontFamily:'LexendRegular',
  }
});

export default AppDrawer;

