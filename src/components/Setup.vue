<template>
  <transition name="modal">
    <div class="modal modal-mask" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
            <h2>Configurar Controlador</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
            <div>
              <div class="row">
                <div class="time1">
                  <div class="row">
                    Alimentação 1:
                    <div class="switch__container">
                      <input id="switch-shadow" class="switch switch--shadow" type="checkbox" />
                      <label for="switch-shadow"></label>
                    </div>
                  </div>
                  <time-picker
                    v-model="time"
                    :show-meridian="false"
                    icon-control-up="glyphicon glyphicon-plus"
                    icon-control-down="glyphicon glyphicon-minus"
                  />
                </div>

                <div class="time2">
                  <div class="row">
                    Alimentação 2:
                    <div class="switch__container">
                      <input id="switch-shadow" class="switch switch--shadow" type="checkbox" />
                      <label for="switch-shadow"></label>
                    </div>
                  </div>

                  <time-picker
                    v-model="time"
                    :show-meridian="false"
                    icon-control-up="glyphicon glyphicon-plus"
                    icon-control-down="glyphicon glyphicon-minus"
                  />
                </div>
              </div>
              <div class="time3">
                <div class="row">
                  Alimentação 3:
                  <div class="switch__container">
                    <input id="switch-shadow" class="switch switch--shadow" type="checkbox" />
                    <label for="switch-shadow"></label>
                  </div>
                </div>
                <time-picker
                  v-model="time"
                  :show-meridian="false"
                  icon-control-up="glyphicon glyphicon-plus"
                  icon-control-down="glyphicon glyphicon-minus"
                />
              </div>
            </div>

            <div class="modal-temp">
              <h5>Selecione o intervalo de temperatura:</h5>
              <div class="row">
                <div class="labelMin">
                  <label>Temp.Mínima</label>
                  <h6>{{valorMin}}°C</h6>
                </div>

                <div class="labelMax">
                  <label>Temp.Máxima</label>
                  <h6>{{valorMax}}°C</h6>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="20"
                step="0.1"
                value="10"
                oninput="this.parentNode.dataset.lbound=this.value;"
                v-model="valorMin"
              />
              <input
                type="range"
                min="20"
                max="30"
                step="0.1"
                value="20"
                oninput="this.parentNode.dataset.ubound=this.value;"
                v-model="valorMax"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-primary" type="submit">Salvar Alterações</button>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import Init from "@/components/Init.vue";
export default {
  data() {
    return {
      valorMin: "",
      valorMax: "",
      time: new Date("")
    };
  },
  components: {
    Init
  }
};
</script>
<style>
/*@import url("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");*/
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
.labelMin {
  padding-left: 10px;
}
.labelMax {
  padding-left: 200px;
}
.modal-temp {
  padding-top: 35px;
}
button {
  right: 45px;
}
.time1 {
  padding-left: 10px;
}
.time1 > .row {
  padding-left: 10px;
}
.time2 {
  padding-left: 150px;
}
.switch__container {
  margin: 0px auto;
  width: 0px;
}

.switch {
  visibility: hidden;
  position: absolute;
  margin-left: -9999px;
}

.switch + label {
  display: block;
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
}

.switch--shadow + label {
  padding: 2px;
  width: 30px;
  height: 15px;
  background-color: #dddddd;
  border-radius: 10px;
}
.switch--shadow + label:before,
.switch--shadow + label:after {
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  content: "";
}
.switch--shadow + label:before {
  right: 1px;
  background-color: #f1f1f1;
  border-radius: 10px;
  transition: background 0.4s;
}
.switch--shadow + label:after {
  width: 12px;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.4s;
}
.switch--shadow:checked + label:before {
  background-color: #8ce196;
}
.switch--shadow:checked + label:after {
  transform: translateX(15px);
}
</style>