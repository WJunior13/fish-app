<template>
  <div>
    <UserModal />
    <ConfigModal />
    <HelpTemp />

    <div class="container box-monitoring">
      <div id class="col-8 mx-auto weather">
        <div class="hora">
          <span>{{ dateTimeFormatted }}</span>
        </div>
        <div class="linha-setting">
          <Setting class="icone-settings" alt="imagem" @click="showSetup()" />
        </div>
        <div class="linha-visor">
          <div id="description" class>
            <Bublee class="icone-bolha" />
          </div>

          <div id="temperatura" class="visor-temp">
            <TempIcon class="icone_Temperatura" />
            <span>{{ controlador.temp }} °C</span>
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
            <div id="tempMax" class="tempMax-data col-4 text-center">{{ controlador.tempMax }}°C</div>
            <div id="tempMin" class="tempMin-data col-4 text-center">{{ controlador.tempMin }}°C</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { format } from 'date-fns';

import UserModal from '@/components/UserModal';
import ConfigModal from '@/components/ConfigModal';
import HelpTemp from '@/components/HelpTemp';

import TempIcon from '@/assets/temperature.svg';
import Setting from '@/assets/settings.svg';
import Bublee from '@/assets/bubbles.svg';

export default {
  name: 'InitApp',
  components: {
    UserModal,
    ConfigModal,
    HelpTemp,
    TempIcon,
    Setting,
    Bublee,
  },
  data() {
    return {
      dateTimeFormatted: '',
    };
  },
  computed: {
    ...mapState('controlador', ['controlador']),
  },
  mounted() {
    this.getDateFormated();
  },
  methods: {
    showSetup() {
      this.$evnt.emit('modal:paramscontroller', true);
    },
    getDateFormated() {
      this.dateTimeFormatted = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

      setTimeout(() => {
        this.getDateFormated();
      }, 1000);
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
