<template>
  <transition name="modal">
    <div class="modal modal-mask" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
            <!--
            <h2>Configurar Controlador</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>-->
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
            <!--
            -->
          </div>

          <div class="modal-footer">
            
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
     
    </div>
  </transition>
</template>

 <!--
<script>
import Teste from "@/components/Swtich";

export default {
  data() {
    return {
     
    };
  },
  components: {
    Teste,
    InputHour
  }
};
</script>-->
<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

</style>