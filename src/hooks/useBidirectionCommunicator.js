import { useEffect, useState, useCallback } from 'react';

// ────────────────────────────────────────────────
// Bidirectional communicator hook (MessageChannel)
// ────────────────────────────────────────────────
const useBidirectionCommunicator = () => {
  const [port, setPort] = useState(null);
  const [lastMessage,setLastMessage] = useState(null)
  const [isConnected, setIsConnected] = useState(false)


  useEffect(() => {
    const messageHandler = (e) => {
      if (e.ports?.[0]) {
        const receivedPort = e.ports[0];
        // Handle initial message that carried the port (if any)
        if (e.data) {
          setLastMessage(e.data);
        }

        setPort(receivedPort);
        setIsConnected(true)

        receivedPort.onmessage = (event)=>{
          setLastMessage(event.data)
        };
        receivedPort.start();
      }
    };

    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
      setPort((currentPort) => {
        if (currentPort) {
          currentPort.close();
        }
        return null;
      });
      setIsConnected(false)

    }
  }, []);

  const sendToParent = useCallback((msg) => {
    if (!port) {
      console.warn('No communication port available yet');
      return;
    }
    port.postMessage(msg);
  }, [port]);

  return {isConnected , message:lastMessage ,send:sendToParent };
};