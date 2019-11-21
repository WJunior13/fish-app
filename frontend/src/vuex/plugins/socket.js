export default function SocketPlugin(socket) {
  return store => {
    socket.on('data:device', data => {
      store.commit('setDataDevice', data);
    });
    store.subscribe(({ type, payload }) => {
      if (type === 'updateDataDevice') {
        socket.emit('update:data:device', payload);
      }
    });
  };
}
