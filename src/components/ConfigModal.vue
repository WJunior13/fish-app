<template>
  <modal @open="getConfig()" id="paramscontroller" title="Configurar Controlador" size="lg">
    <div class="p-2">
      <h6>Selecione os horarios de Alimentação:</h6>

      <div class="row">
        <div class="time1">
          <div class="row">
            Alimentação 1:
               <div class="custom-control custom-switch ml-2">
                <input  v-model="config.enable1" type="checkbox" class="custom-control-input" id="enable1">
               <label class="custom-control-label" for="enable1"></label>
              </div>
          </div>
          <time-picker
            v-model="config.time1"
            :readonly="!config.enable1"
            :show-meridian="false"
            format="HH:mm"
            icon-control-up="fas fa-plus-circle"
            icon-control-down="fas fa-minus-circle"
          />
        </div>

        <div class="time2">
          <div class="row">
            Alimentação 2:
            <div class="custom-control custom-switch ml-2">
                <input  v-model="config.enable2" type="checkbox" class="custom-control-input" id="enable2">
               <label class="custom-control-label" for="enable2"></label>
              </div>
          </div>

          <time-picker
            v-model="config.time2"
            :readonly="!config.enable2"
            format="HH:mm"
            :show-meridian="false"
            icon-control-up="fas fa-plus-circle"
            icon-control-down="fas fa-minus-circle"
          />
        </div>
      </div>
      <div class="time3">
        <div class="row">
          Alimentação 3:
           <div class="custom-control custom-switch ml-2">
                <input  v-model="config.enable3" type="checkbox" class="custom-control-input" id="enable3">
               <label class="custom-control-label" for="enable3"></label>
              </div>
        </div>
        <time-picker
          v-model="config.time3"
          :readonly="!config.enable3"
          format="HH:mm"
          :show-meridian="false"
          icon-control-up="fas fa-plus-circle"
          icon-control-down="fas fa-minus-circle"
        />

        <div class="modal-temp">
          <div class="row">
            Selecione o intervalo de temperatura:
            <div class="temp-info">
              <a
                id="missionclick"
                class="moreinfo"
                style="cursor:pointer;"
                @click="openHelp()"
              >Dúvidas sobre a temperatura?</a>
            </div>
          </div>

          <div class="row">
            <div class="labelMin">
              <label>Temp.Mínima</label>
              <h6>{{ config.tempMin }}°C</h6>
            </div>

            <div class="labelMax">
              <label>Temp.Máxima</label>
              <h6>{{ config.tempMax }}°C</h6>
            </div>
          </div>
          <input
            type="range"
            min="10"
            max="30"
            step="0.1"
            value="10"
            oninput="this.parentNode.dataset.lbound=this.value;"
            v-model="config.tempMin"
          />
          <input
            type="range"
            min="25"
            max="35"
            step="0.1"
            value="20"
            oninput="this.parentNode.dataset.ubound=this.value;"
            v-model="config.tempMax"
          />
        </div>

        <hr color="#cecece" />

        <div class="alinhar-direita">
          <button
            type="button"
            class="btn btn-outline-success mr-2"
            data-dismiss="modal"
            @click="save(config)"
          >
            <i class="far fa-check-circle"></i>
            Salvar Alterações
          </button>
          <button type="button" class="btn btn-outline-danger mr-2" @click="close()">
            <i class="far fa-times-circle"></i>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapMutations } from 'vuex';
import { parseISO } from 'date-fns';
import cloneObject from '@/utils/cloneObject';
import Modal from './modal';
import Swtich from './Switch';

export default {
  name: 'ConfigModal',
  components: {
    Modal,
    Swtich,
  },
  data() {
    return {
      config: {
        tempMin: 0,
        tempMax: 0,
        time1: null,
        time2: null,
        time3: null,
        enable1: false,
        enable2: false,
        enable3: false,
      },
    };
  },

  methods: {
    ...mapMutations('controlador', ['setConfig']),
    save(config) {
      this.setConfig(config);
      this.close();
    },
    close() {
      this.$evnt.emit('modal:paramscontroller', false);
    },
    getConfig() {
      const cfg = cloneObject(this.$store.state.controlador.controlador.config);

      console.log(cfg)

      this.config = {
        ...cfg,
        time1: parseISO(cfg.time1),
        time2: parseISO(cfg.time2),
        time3: parseISO(cfg.time3),
      };
    },
    openHelp() {
      this.$evnt.emit('modal:helptemp', true);
    },
    teste(e){
      console.log(e)
    }
  },
};
</script>

<style lang="scss" scoped>
.alinhar-direita {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 5px 0px 0px;
}
</style>
