<template>
  <div>
    <div tabindex="-1" role="dialog" class="pro-modal-wrap-backdrop">
      <div role="document" class="pro-modal-body">
        <!-- <faq v-if="type === 'confirm'" />
        <error v-else-if="type === 'error'" />
        <warning v-else-if="type === 'warning'" />
        <info v-else-if="type === 'info'" />
       #COLOCAR ICONES
        -->
        <div class="pro-notify-content">
          <h3>{{ title }}</h3>
          <span>{{ content }}</span>
          <template v-if="component">
            <component :is="component" />
          </template>
        </div>
        <div class="pro-notify-btns">
          <button
            id="confirm-cancel"
            type="button"
            v-if="cancelText"
            @click="close"
            :class="'pro-notify-btn-cancel ' + cancelColor"
          >
            <span>{{ cancelText }}</span>
          </button>
          <button
            type="button"
            v-if="okText"
            id="confirm-ok"
            ref="confirm"
            tabindex="0"
            @click="confirm"
            :class="'pro-notify-btn-confirm ' + okColor"
          >
            <span>{{ okText }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notify',
  props: {
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    onOk: { type: Function, default: () => {} },
    onCancel: { type: Function, default: () => {} },
    type: { type: String, default: 'confirm' },
    okText: { type: [String, Boolean], default: 'Sim' },
    cancelText: { type: [String, Boolean], default: false },
    okColor: { type: String, default: 'c-primary' },
    cancelColor: { type: String, default: 'c-primary' },
    component: { type: [Function, Object, Boolean], required: false, default: false },
    resolve: { type: Function },
  },
  mounted() {
    setTimeout(() => {
      if (this.$refs.confirm) this.$refs.confirm.focus();
    }, 10);
  },
  methods: {
    confirm() {
      this.onOk();
      this.destroy();
      this.resolve(true);
    },
    close() {
      this.onCancel();
      this.destroy();
      this.resolve(false);
    },
    destroy() {
      this.$el.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(this.$el);
        this.$destroy();
      }, 180);
    },
  },
};
</script>

<style scoped lang="scss">
.pro-modal-wrap-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  animation: fade-in 0.3s ease;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

.pro-modal-body {
  position: relative;
  max-width: 453px;
  width: 100%;
  border: 0;
  border-radius: 4px;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 22px 30px 22px;
  margin: 13px;
  overflow: auto;

  animation: scale-in 0.21s ease;
  @keyframes scale-in {
    from {
      transform: scale(0.2);
    }
    to {
      transform: scale(1);
    }
  }

  > svg {
    position: absolute;
    left: 10px;
    top: 22px;
    width: 37px;
    height: 37px;
  }

  .pro-notify-content {
    max-height: 80vh;
    overflow: auto;

    > h3 {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      margin-left: 31px;
      margin-bottom: 7px;
      font-size: 1.18rem;
      line-height: 1.4;
    }

    > span {
      margin-left: 31px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .pro-notify-btns {
    margin-top: 24px;
    float: right;
    > button {
      outline: none;
      line-height: 1.499;
      display: inline-block;
      font-weight: 400;
      text-align: center;
      touch-action: manipulation;
      background-image: none;
      border: 1px solid transparent;
      white-space: nowrap;
      padding: 0 15px;
      font-size: 14px;
      border-radius: 4px;
      height: 32px;
      user-select: none;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      position: relative;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
      color: rgba(0, 0, 0, 0.65);
      background-color: #fff;
      border-color: #d9d9d9;
    }

    .pro-notify-btn-confirm {
      margin-left: 8px;
    }

    .pro-notify-btn-cancel {
      &:hover {
        border-color: #1890ff;
        color: #1890ff;
      }
    }

    .c-danger {
      color: #f5222d;
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      &:hover {
        color: #fff;
        background-color: #f5222d;
        border-color: #f5222d;
      }
    }
    .c-primary {
      &:hover {
        border-color: #1890ff;
        color: #1890ff;
      }
    }
    .c-success {
      &:hover {
        border-color: #60d303;
        color: #60d303;
      }
    }
  }
}
.fade-out {
  .pro-modal-wrap-backdrop {
    transition: opacity 0.21s ease-in-out;
    opacity: 0;
  }
  .pro-modal-body {
    transition: all 0.21s ease-in-out;
    transform: scale(0);
  }
}
</style>
