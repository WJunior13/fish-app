import Vue from 'vue';
import Confirm from './Confirm';

export default {
  Component: Vue.extend(Confirm),

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
