<template>
  
  <div>
     <!-----------------------NavBar---------------------------->
    <b-navbar toggleable="md" type="dark" class="nav-color">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand class="nav-link" to="init">Início</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <router-link class="nav-link" to="/controlador">Controladores</router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>Controlador</em>
            </template>
            <b-dropdown-item @click="openUser">Meus Dados</b-dropdown-item>

            <b-dropdown-item class="nav-link" to="/home">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!------------------------------------------------------------------------------------------------------>
    <div>    
      <b-form inline  @submit="saveController">
        <h3>Cadastrar Controlador</h3>
        <div class="form-cadastro"></div>
      <label class="sr-only" for="inline-form-input-desc">Descrição</label>
      <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Descrição " v-model="descricao"></b-input>

      <label class="sr-only" for="inline-form-input-nserie">Número de série</label>
      <b-input id="inline-form-input-username" placeholder="Nº de série" type="number" v-model="nserie"></b-input>

      <b-button pill variant="info" type="submit">Salvar</b-button>
    </b-form>
 </div>

  <div>
   <table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nº de série</th>
      <th scope="col">Descrição</th>
      
    </tr>
  </thead>
  <tbody>
      <tr v-for="dados in controladores" :key="dados">
      <th scope="col"><b-form-checkbox ></b-form-checkbox>
      </th>
      <td>{{dados.nserie}}</td>
      <td>{{dados.descricao}}</td>
      </tr>
    
  </tbody>
</table>
</div>
  </div>
</template>
<script>
import api from "@/services/api";

import axios from "axios";
export default {
     data(){
       return{
         controladores:[],
        descricao:'',
        nserie:''
        
       }
     },
async mounted(){
  const response = await api.get("controlador");
   this.controladores=response.data;
},
methods:{
  async saveController(e) {
      e.preventDefault();
      try {
        const controlador = {
          descricao: this.descricao,
          nserie:this.nserie
          
        };
        await api.post("controlador", controlador);
        console.log("salvo");
      } catch (error) {
        console.log(error);
      }
}
}

};
</script>
<style scoped>
.form-cadastro{
  padding-left: 30px;
  padding-top: 100px;
}


</style>