<template>
  <b-modal v-model="show" :size="size" :title="title" centered hide-footer>
    <slot />
  </b-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    id: { type: [String, Number], required: true },
    title: { type: [String], required: false, default: () => 'Title ?' },
    size: { type: [String], required: false, default: () => 'sm' },
  },
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$evnt.on(`modal:${this.id}`, action => {
      this.show = action;
      this.$emit(action ? 'open' : 'close');
    });
  },
  beforeDestroy() {
    this.$evnt.off(`modal:${this.id}`);
    this.$emit('close');
  },
};
</script>

<style>
.modal-header {
  color: #333;
}
</style>
