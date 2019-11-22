import io from 'socket.io-client';

export default io('https://back-end-fishapp.herokuapp.com', {
  token: 'nenhum',
});
