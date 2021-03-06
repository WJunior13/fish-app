import { CLIENT_RENEG_LIMIT } from "tls";

export default function SocketPlugin(socket) {
  return store => {
    socket.on('rasp:servidor:temperatura', data => {
      store.commit('controlador/setTemp', data);
    });

    store.subscribe(({ type, payload }) => {
      if (type.includes('setConfig')) {
        socket.emit('update:config:device', payload);
      }
    });
  };
}
