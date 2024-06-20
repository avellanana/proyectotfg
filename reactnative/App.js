import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pantallas/Login';
import Home from './pantallas/homeScreen';
import RegisterScreen from './pantallas/Register';
import { UserProvider } from './UsuarioContext';
import { EstrellasDesbloqueadasProvider } from './estrellasDesbloqueadasContext';
import AppDrawer from './navegacion';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Timer from './pantallas/timer';
import EstrellasButton from './estrellasButton';
import Constelaciones from './pantallas/constelaciones';
import Meditaciones from './pantallas/meditaciones';
import Ayuda from './pantallas/ayuda';

const loadFonts = async () => {
  await Font.loadAsync({
    'LexendRegular': require('./assets/fonts/Lexend-VariableFont_wght.ttf'),
    'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
};

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setFontsLoaded(true);
      }
    };

    prepareApp();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      <EstrellasDesbloqueadasProvider>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <Stack.Navigator>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
              </Stack.Screen>
              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {props => <AppDrawer {...props} isAuthenticated={isAuthenticated} />}
              </Stack.Screen>
              <Stack.Screen name="Timer" component={Timer} options={{ headerShown: false }} />
              <Stack.Screen name="Constelaciones" component={Constelaciones} options={{ headerShown: false }} />
              <Stack.Screen name="Meditaciones" component={Meditaciones} options={{ headerShown: false }} />
              <Stack.Screen name="Ayuda" component={Ayuda} options={{ headerShown: false }} />
            </Stack.Navigator>
            {isAuthenticated && <EstrellasButton />}
          </View>
        </NavigationContainer>
      </EstrellasDesbloqueadasProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
