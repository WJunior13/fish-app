import { CLIENT_RENEG_LIMIT } from "tls";

export default function SocketPlugin(socket) {
  return store => {
    socket.on('data:device', data => {
      store.commit('controlador/setDataDevice', data);
    });

    store.subscribe(({ type, payload }) => {
      if (type.includes('setConfig')) {
        console.log('enviou pro back', payload)
        socket.emit('update:config:device', payload);
      }
    });
  };
}
