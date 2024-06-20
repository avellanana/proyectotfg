import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UsuarioContext';

export const EstrellasDesbloqueadasContext = createContext();

export const EstrellasDesbloqueadasProvider = ({ children }) => {
  const [estrellasDesbloqueadas, setEstrellasDesbloqueadas] = useState(0);
  const [meditationCount, setMeditationCount] = useState(0);
  const [diferenciaPuntos, setDiferenciaPuntos] = useState(0);
  const { userId } = useUser();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (!userId) return;
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
        if (error.response) {
          console.error('Server responded with status', error.response.status);
          console.error('Response data:', error.response.data);
        }
      }
    };

    if (userId) {
      fetchInitialData();
    }
  }, [userId]);

  useEffect(() => {
    // Calcular la diferencia entre meditationCount y estrellasDesbloqueadas
    const diferencia = meditationCount - estrellasDesbloqueadas;
    setDiferenciaPuntos(diferencia);
  }, [meditationCount, estrellasDesbloqueadas]);

  const resetData = () => {
    console.log('Reseteando data...');
    setEstrellasDesbloqueadas(0);
    setMeditationCount(0);
    setDiferenciaPuntos(0);
  };

  return (
    <EstrellasDesbloqueadasContext.Provider value={{
      estrellasDesbloqueadas,
      setEstrellasDesbloqueadas,
      meditationCount,
      setMeditationCount,
      diferenciaPuntos,
      resetData
    }}>
      {children}
    </EstrellasDesbloqueadasContext.Provider>
  );
};

export const useEstrellasDesbloqueadas = () => useContext(EstrellasDesbloqueadasContext);