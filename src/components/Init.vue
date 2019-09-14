<template>
		<div class="container">
			<setup v-if="showSetup"></setup>
			<div class="row">
				<div id="" class="col-8 mx-auto weather">
					<div class="visor-data">
						
						<h1 id="data" class="text-center display-4">{{dateNow | date}}, {{aTime}}</h1>
						<div>
					    
                         <router-link  to='/init'>
						<img src="../assets/settings.svg" alt="imagem" class="icone-settings" @click="openSetup">
                         </router-link>
					
						</div>
						<div class='linha-visor'>							
							<div id="description" class="">
								<img src="../assets/bubbles.svg" alt="imagem" class="icone-bolha">		
							</div>
							
							<div id="temperatura" class="visor-temp">
								<img src="../assets/temperature.svg" alt="imagem" class="icone_Temperatura">
								<span>22°C</span>					
							</div>
						</div>
						
						<div class="weather-body">					
							<div class="row">
								<div class="tempMax col-4 text-center">
									<i class="wi wi-raindrop"></i><span> Temp.Máx</span>
								</div>
								<div class="tempMin col-4 text-center">
									<i class="wi wi-strong-wind"></i><span> Temp.Min</span>
								</div>			
							</div>
							
							<div class="row">
								<div id="tempMax" class="tempMax-data col-4 text-center">
									28°
								</div>
								<div id="tempMin" class="tempMin-data col-4 text-center">
									21°
								</div>
							
							</div>
						</div>						
					</div>					
				</div>
			</div>
		</div>
 
</template>

<script>
import Setup from '@/components/Setup.vue'
   export default {
  name: "init",
  data() {
    return {
	  dateNow: new Date(),
	  time: '00:00:00',
	  showSetup: false,
	   
	}
  },
  filters: {
	date: formatDate,
	hour:time
  },
  computed:{
	 aTime: function() {
      var self = this;
      setInterval(function() {
        self.time = getAtime();
      }, 1000);
      return self.time;
    }
  },
   components:{
	   Setup
   },
   methods:{
	   openSetup() {
      this.showSetup = true;
  },
  closeModal() {
     this.showSetup = false;
  },
  submitAndClose() {
    
  }
   }
   }

  function formatDate(date) {
  	let dia = date.getDate()
  	let mes = ["01", "02", "03", "04", "05", "06", "07", "08","09","10","11","12"]
  	[date.getMonth()]
  	let ano = date.getFullYear()
  
  	return `${dia} / ${mes} / ${ano}`
}
 function time(date){
	
	let h=date.getHours();
	let m=date.getMinutes();
	let s=date.getSeconds();
	setInterval('time()',500);
	return `${h}: ${m}: ${s}`
}
var getAtime = function() {
  var date = new Date();
  var hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
  var minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
  var second = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
  var str_hour = hour + ':' + minute + ':' + second;
  return str_hour;
};

   
</script>
<style>

  @media (max-width: 600px){
	  .linha-visor>.visor-temp{
		  font-size: 20px!important;
	}


   .linha-visor>.icone_Temperatura{
	 width: 5px;
	 height: 5px; 	 
	}
  }

body
 {
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
	border:1px solid white;
	margin-top: 10rem;
	background-color: rgba(4, 72, 83, 0.5);
	border-radius: 20px;
	color: white;
}

.weather-head {
	height: 50%;
}


.linha-visor{
	display: flex;
	align-items: center;
	justify-content: space-around;


}

.icone-bolha{
	width: 100px;
	height: 100px;
}

.tempMax, .tempMin {
	border-top: 1px solid white;
	border-bottom: 1px solid white;
	font-size: 1.5rem;

}
.icone_Temperatura{
	width: 100px;
	height: 100px;
}
.icone-settings{
	width: 50px;
	height: 50px;
	margin-top: -107px;
	margin-left: 688px;
	
}
.visor-temp{
	display :flex;
	align-items: center;
}

.visor-temp>span{
	display: relative;
	margin-left: -18px;
}

#temperatura{
	font-size: 7rem;
}


#tempMax, #tempMin {
	font-size: 2rem;
	padding-top: 1rem;
	padding-bottom: 1rem;
}
</style>