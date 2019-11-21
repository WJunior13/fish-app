<template>
  <b-modal v-model="show" :title="title" centered>
    <div v-if="show" class="modal-classe modal modal-mask" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    id: { type: [String, Number], required: true },
    title: { type: [String], required: false, default: () => 'Title ?' },
  },
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$evnt.on(`modal:open:${this.id}`, () => {
      this.show = true;
      this.$emit('open');
    });
  },
  beforeDestroy() {
    this.$evnt.off(`modal:close:${this.id}`);
    this.$emit('close');
  },
};
</script>

<style>
.modal-classe {
  position: absolute;
  z-index: 100;
  margin: auto auto;
}
.modal-mask {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  height: 427px;
  overflow-y: auto;
}
.modal-header {
  padding: 0 11px;
}
</style>
