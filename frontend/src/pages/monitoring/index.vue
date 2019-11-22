<template>
  <div>
    <UserModal />
    <!---------------------------------------------Modal Temp------------------------------------------>
    <modal v-if="showTemp">
      <h4 slot="header" class="modal-title">
        <div class="row">
          Temperaturas ideais
          <div class="cl">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </h4>
      <div slot="body">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Espécie</th>
              <th scope="col">Faixa de Temperatura</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Espada</td>
              <td>24 a 28 °C</td>
            </tr>
            <tr>
              <td>Molinésia</td>
              <td>24 a 28 °C</td>
            </tr>
            <tr>
              <td>Colisa</td>
              <td>22 a 28 °C</td>
            </tr>
            <tr>
              <td>Tricogaster</td>
              <td>21 a 28 °C</td>
            </tr>
            <tr>
              <td>Kinguio</td>
              <td>10 a 26 °C</td>
            </tr>
            <tr>
              <td>Betta</td>
              <td>24 a 30 °C</td>
            </tr>
            <tr>
              <td>Platy</td>
              <td>24 a 28 °C</td>
            </tr>
            <tr>
              <td>Guppy</td>
              <td>24 a 28 °C</td>
            </tr>
            <tr>
              <td>Carpa</td>
              <td>10 a 30 °C</td>
            </tr>
            <tr>
              <td>Barbos</td>
              <td>22 a 26 °C</td>
            </tr>
            <tr>
              <td>Paulistinha</td>
              <td>20 a 26 °C</td>
            </tr>
            <tr>
              <td>Oscar</td>
              <td>24 a 28 °C</td>
            </tr>
            <tr>
              <td>Acará Bandeira</td>
              <td>24 a 28 °C</td>
            </tr>
          </tbody>
        </table>
      </div>
    </modal>
    <!---------------------------------Modal Setup---------------------------------------------------------->
    <modal v-if="showSetup">
      <h4 slot="header" class="modal-title">
        <div class="row">
          Configurar Controlador
          <div class="close-title">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </h4>

      <div slot="body">
        <div class="food">
          <h6>Selecione os horarios de Alimentação:</h6>

          <div class="row">
            <div class="time1">
              <div class="row">
                Alimentação 1:
                <swtich v-model="switch1" />
              </div>
              <time-picker
                v-model="time1"
                :readonly="isDisabled1"
                :show-meridian="false"
                format="HH:mm"
                icon-control-up="fas fa-plus-circle"
                icon-control-down="fas fa-minus-circle"
              />
            </div>

            <div class="time2">
              <div class="row">
                Alimentação 2:
                <swtich v-model="switch2" />
              </div>

              <time-picker
                v-model="time2"
                format="HH:mm"
                :readonly="isDisabled2"
                :show-meridian="false"
                icon-control-up="fas fa-plus-circle"
                icon-control-down="fas fa-minus-circle"
              />
            </div>
          </div>
          <div class="time3">
            <div class="row">
              Alimentação 3:
              <swtich v-model="switch3" class="sw3" />
            </div>
            <time-picker
              v-model="time3"
              format="HH:mm"
              :readonly="isDisabled3"
              :show-meridian="false"
              icon-control-up="fas fa-plus-circle"
              icon-control-down="fas fa-minus-circle"
            />

            <div class="modal-temp">
              <div class="row">
                Selecione o intervalo de temperatura:
                <div class="temp-info">
                  <a id="missionclick" class="moreinfo" style="cursor:pointer;" @click="openTemp()">
                    Dúvidas sobre a temperatura?
                  </a>
                </div>
              </div>

              <div class="row">
                <div class="labelMin">
                  <label>Temp.Mínima</label>
                  <h6>{{ valorMin }}°C</h6>
                </div>

                <div class="labelMax">
                  <label>Temp.Máxima</label>
                  <h6>{{ valorMax }}°C</h6>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="25"
                step="0.1"
                value="10"
                oninput="this.parentNode.dataset.lbound=this.value;"
                v-model="valorMin"
              />
              <input
                type="range"
                min="25"
                max="35"
                step="0.1"
                value="20"
                oninput="this.parentNode.dataset.ubound=this.value;"
                v-model="valorMax"
              />
            </div>
          </div>
        </div>
      </div>

      <div slot="footer">
        <button type="button" class="btn btn-outline-success mr-2" data-dismiss="modal" @click="submitAndClose()">
          <i class="far fa-check-circle"></i>
          Salvar Alterações
        </button>
        <button type="button" class="btn btn-outline-danger mr-2" @click="closeModal()">
          <i class="far fa-times-circle"></i>
          Cancelar
        </button>
      </div>
    </modal>

    <div class="container box-monitoring" v-if="showInit">
      <div id class="col-8 mx-auto weather">
        <div class="hora">
          <span>{{ dateTimeFormatted }}</span>
        </div>
        <div class="linha-setting">
          <router-link to="/monitoring">
            <Setting class="icone-settings" alt="imagem" @click="openSetup"/>
          </router-link>
        </div>
        <div class="linha-visor">
          <div id="description" class>
            <Bublee class="icone-bolha" />
          </div>

          <div id="temperatura" class="visor-temp">
           
            <TempIcon class="icone_Temperatura" />
            <span>21.4°C</span>
          </div>
        </div>

        <div class="weather-body">
          <div class="row">
            <div class="tempMax col-4 text-center">
              <i class="wi wi-raindrop"></i>
              <span>Temp.Máx</span>
            </div>
            <div class="tempMin col-4 text-center">
              <i class="wi wi-strong-wind"></i>
              <span>Temp.Min</span>
            </div>
          </div>

          <div class="row">
            <div id="tempMax" class="tempMax-data col-4 text-center">{{ valorMax }}°C</div>
            <div id="tempMin" class="tempMin-data col-4 text-center">{{ valorMin }}°C</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import UserModal from '@/components/UserModal';
import Modal from '@/components/modal';
import Swtich from '@/components/Switch.vue';
import api from '@/services/api.js';
import TempIcon from "@/assets/temperature.svg"
import Setting from "@/assets/settings.svg"
import Bublee from "@/assets/bubbles.svg"

export default {
  name: 'InitApp',
  components: {
    Modal,
    Swtich,
    UserModal,
    TempIcon,
    Setting,
    Bublee,
  },
  data() {
    return {
      dateTimeFormatted: '',
      showSetup: false,
      showInit: true,
      showTemp: false,
      valorMax: '',
      valorMin: '',
      time1: new Date(),
      time2: new Date(),
      time3: new Date(),

      switch1: false,
      switch2: false,
      switch3: false,
      nome: '',
      email: '',
      senha: '',
      telefone: '',
    };
  },

  computed: {
    isDisabled1() {
      return !this.switch1;
    },
    isDisabled2() {
      return !this.switch2;
    },
    isDisabled3() {
      return !this.switch3;
    },
  },
  mounted() {
    this.getDateFormated();
  },
  methods: {
    getDateFormated() {
      this.dateTimeFormatted = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
      setTimeout(() => {
        this.getDateFormated();
      }, 1000);
    },
    openTemp() {
      this.openTemp = true;
    },
    openSetup() {
      this.showSetup = true;
    },
    closeModal() {
      this.showSetup = false;
      this.showTemp = false;
    },
    closeModalUser() {
      this.showUser = false;
    },
    async submitAndClose() {
      try {
        const configuracao = {
          time1: this.time1,
          time2: this.time2,
          time3: this.time3,
          valorMax: this.valorMax,
          valorMin: this.valorMin,
        };

        await api.put('/controlador', configuracao);
        console.log('salvo');

        localStorage.setItem(
          'config',
          JSON.stringify({
            time1: this.time1,
            time2: this.time2,
            time3: this.time3,
            valorMax: this.valorMax,
            valorMin: this.valorMin,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss">
.box-monitoring {
  color: #fff !important;
}

@media (max-width: 600px) {
  .linha-visor > .visor-temp {
    font-size: 20px !important;
  }
  .hora {
    font-size: 20px !important;
  }
  .container > .col-8 {
    width: 270px;
    height: 440px;
    padding-top: 50px;
    padding-right: 280px;
  }
  .modal-temp {
    font-size: 13px !important;
  }
  .weather-body > .row > .tempMax,
  .tempMin {
    font-size: 17px !important;
  }
  .row > .tempMax-data,
  .tempMin-data {
    font-size: 20px !important;
  }
  .time2 > .row {
    padding-left: -270px;
  }
  .food {
    font-size: 13px !important;
  }
  .modal-title {
    font-size: 18px !important;
  }

  .linha-setting > .icone-settings {
    width: 15px;
    height: 15px;
  }

  .linha-visor > .icone_Temperatura {
    width: 5px;
    height: 5px;
  }
}
.hora {
  font-size: 60px;
}
.table {
  font-size: 12px;
}

.cl {
  padding-left: 240px;
}

.weather {
  border: 1px solid white;
  margin-top: 5rem;
  background-color: rgba(4, 72, 83, 0.5);
  border-radius: 20px;
}

.weather-head {
  height: 100%;
}

.linha-visor {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 60px;
}

.icone-bolha {
  width: 100px;
  height: 100px;
}

.tempMax,
.tempMin {
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  font-size: 1.5rem;
}
.icone_Temperatura {
  width: 100px;
  height: 100px;
}
.icone-settings {
  width: 45px;
  height: 45px;
}
.visor-temp {
  display: flex;
  align-items: center;
}
.linha-setting {
  margin-top: -80px;
  margin-left: 670px;
}

.visor-temp > span {
  display: relative;
  margin-left: -18px;
}

#temperatura {
  font-size: 7rem;
}

.temp-info {
  font-size: 12px;
  padding-left: 55px;
}

#tempMax,
#tempMin {
  font-size: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
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
.close-title {
  padding-left: 180px;
}
.sw3 {
  padding-right: 360px;
}
.nav-color {
  background: rgb(50, 80, 109);
}

.corpo-contador {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.corpo-contador button {
  outline: none;
  border: none;
  font-size: 19px;
  width: 25px;
  height: 25px;
  background: none;
  margin: 4px;
  cursor: pointer;
}
.corpo-contador input {
  width: 45px;
  height: 30px;
  border: 1px solid #bbb;
  border-radius: 4px;
}
</style>
