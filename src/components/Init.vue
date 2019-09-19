<template>
  <div class="container">
    <setup v-if="showSetup">
      
      <h3 slot="header" class="modal-title">
        <div class="row">
        Configurar Controlador
        <div class="close-title">
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="closeModal"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        </div>
      </h3>
      

      <div slot="body">
          <h5>Selecione os horarios de Alimentação:</h5>
        <div>
          <div class="row">
            <div class="time1">
              <div class="row">Alimentação 1:
				  <swtich v-model="switch1"/>
			  </div>
              <time-picker
	            v-model="times"
				:readonly="isDisabled1"
                :show-meridian="false"
                icon-control-up="glyphicon glyphicon-plus"
                icon-control-down="glyphicon glyphicon-minus"
              />
            </div>

            <div class="time2">
              <div class="row">Alimentação 2:
				  <swtich v-model="switch2"/>
			  </div>

              <time-picker
                v-model="times"
				:readonly="isDisabled2"
                :show-meridian="false"
                icon-control-up="glyphicon glyphicon-plus"
                icon-control-down="glyphicon glyphicon-minus"
              />
            </div>
          </div>
          <div class="time3">
            <div class="row">Alimentação 3:
			<swtich v-model="switch3"  class="sw3"/>
      </div>
            <time-picker
              v-model="times"
				:readonly="isDisabled3"
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

      <div slot="footer">
        <button
          type="button"
          class="btn btn-outline-success mr-2"
          data-dismiss="modal"
          @click="submitAndClose()"
        >Salvar Alterações</button>
        <button type="button" class="btn btn-outline-danger mr-2" @click="closeModal()">Cancelar</button>
        
      </div>
    </setup>
    <div class="row">
      <div id class="col-8 mx-auto weather">
        <div class="visor-data">
          <h1 id="data" class="text-center display-4">{{dateNow | date}}, {{aTime}}</h1>
          <div>
            <router-link to="/init">
              <img
                src="../assets/settings.svg"
                alt="imagem"
                class="icone-settings"
                @click="openSetup"
              />
            </router-link>
          </div>
          <div class="linha-visor">
            <div id="description" class>
              <img src="../assets/bubbles.svg" alt="imagem" class="icone-bolha" />
            </div>

            <div id="temperatura" class="visor-temp">
              <img src="../assets/temperature.svg" alt="imagem" class="icone_Temperatura" />
              <span>22°C</span>
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
              <div id="tempMax" class="tempMax-data col-4 text-center">28°</div>
              <div id="tempMin" class="tempMin-data col-4 text-center">21°</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Setup from "@/components/Setup.vue";
import Swtich from "@/components/Switch.vue";
import api from "@/services/api.js";


export default {
  name: "init",
  data() {
    return {
	  dateNow: new Date(),
	  times: new Date(''),
      time: "00:00:00",
	  showSetup: false,
	  valorMax: '',
	  valorMin: '',
	  switch1: false,
	  switch2: false,
	  switch3: false,
    };
  },
  filters: {
    date: formatDate,
    hour: time
  },
   
  async mounted(){
    const response = await api.get('configuracao/nserie')
    response.data
  },
  

  
  computed: {
    aTime: function() {
      var self = this;
      setInterval(function() {
        self.time = getAtime();
      }, 1000);
      return self.time;
	},
	isDisabled1: function(){
    	return !this.switch1;
	},
	isDisabled2: function(){
    	return !this.switch2;
	},
	isDisabled3: function(){
    	return !this.switch3;
    }
  },
  components: {
	Setup,
	Swtich
  },
  methods: {
    openSetup() {
      this.showSetup = true;
    },
    closeModal() {
      this.showSetup = false;
    },
    submitAndClose() {}
  }
};

function formatDate(date) {
  let dia = date.getDate();
  let mes = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ][date.getMonth()];
  let ano = date.getFullYear();

  return `${dia} / ${mes} / ${ano}`;
}
function time(date) {
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  setInterval("time()", 500);
  return `${h}: ${m}: ${s}`;
}
var getAtime = function() {
  var date = new Date();
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var second =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  var str_hour = hour + ":" + minute + ":" + second;
  return str_hour;
};
</script>
<style>
@media (max-width: 600px) {
  .linha-visor > .visor-temp {
    font-size: 20px !important;
  }

  .linha-visor > .icone_Temperatura {
    width: 5px;
    height: 5px;
  }
}

body {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  color: white;
}

/* background color on top of bg image*/
.hero {
  position: absolute;
  min-height: 100vh;
  min-width: 100vw;
  top: 0;
  bottom: 0;
  background-color: rgba(31, 34, 118, 0.5);
  z-index: -5;
}

.weather {
  border: 1px solid white;
  margin-top: 10rem;
  background-color: rgba(4, 72, 83, 0.5);
  border-radius: 20px;
  color: white;
}

.weather-head {
  height: 50%;
}

.linha-visor {
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  width: 50px;
  height: 50px;
  margin-top: -107px;
  margin-left: 688px;
}
.visor-temp {
  display: flex;
  align-items: center;
}

.visor-temp > span {
  display: relative;
  margin-left: -18px;
}

#temperatura {
  font-size: 7rem;
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
.close-title{
  padding-left: 150px ;
}
.sw3{
  padding-right: 360px;
}
</style>
