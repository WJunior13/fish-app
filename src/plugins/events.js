const eventStack = {};

export default function install(Vue) {
  Vue.prototype.$evnt = {
    on(id, callback = () => {}) {
      eventStack[id] = callback;
    },
    off(id) {
      if (eventStack[id]) {
        delete eventStack[id];
      }
    },
    emit(id, data) {
      if (eventStack[id]) {
        eventStack[id](data);
      }
    },
  };
}
