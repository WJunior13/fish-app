export default function SocketPlugin(socket) {
  return store => {
    socket.on('data:device', data => {
      store.commit('controlador/setDataDevice', data);
    });

    store.subscribe(({ type, payload }) => {
      if (type === 'setConfig') {
        socket.emit('update:config:device', payload);
      }
    });
  };
}
