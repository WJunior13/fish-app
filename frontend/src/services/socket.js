import io from 'socket.io-client';

export default io('https://back-end-fishapp.herokuapp.com', {
 // export default io('http://localhost:8181', {
  token: 'nenhum',
});
