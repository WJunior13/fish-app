import Vue from 'vue';
import Notify from './Notify.vue';

export default {
  Component: Vue.extend(Notify),

  confirm(props) {
    return this.mount({ ...props, type: 'confirm' });
  },
  error(props) {
    this.mount({ ...props, type: 'error' });
  },
  warning(props) {
    this.mount({ ...props, type: 'warning' });
  },
  info(props) {
    this.mount({ ...props, type: 'info' });
  },

  mount(props) {
    return new Promise(resolve => {
      const instance = new this.Component({
        propsData: { ...props, resolve },
      }).$mount();

      document.body.appendChild(instance.$el);
    });
  },
};
