// WebSocketService.js
import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const WS_URL = 'ws://172.20.10.7:8080/ws'; 

let stompClient = null;

export const initializeWebSocket = (onMessageReceived) => {
    useEffect(() => {
        const socket = new WebSocket(WS_URL);
        stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = () => {
            console.log('WebSocket conectado');
            stompClient.subscribe('/topic/constelacionesDesbloqueadas', onMessageReceived);
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [onMessageReceived]);
};
