import React, { useEffect, useState, useCallback} from 'react';
import useWebSocket from "react-use-websocket";

export const WebSocketDemo = () => {
    const [messageHistory, setMessageHistory] = useState([]);

    const socketUrl = `ws://localhost:3000/eventSocket`;
  
    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
    });
};