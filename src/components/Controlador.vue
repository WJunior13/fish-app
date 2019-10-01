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
    <b-form inline>
      <label class="sr-only" for="inline-form-input-desc">Descrição</label>
      <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Ex:Controlador 1"></b-input>

      <label class="sr-only" for="inline-form-input-nserie">Número de série</label>
      <b-input id="inline-form-input-username" placeholder="Nº de série"></b-input>

      <b-button variant="primary">Save</b-button>
    </b-form>
 
  
   <table class="table" v-for="dados in controladores" :key="dados">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nº de série</th>
      <th scope="col">Descrição</th>
      
    </tr>
  </thead>
  <tbody>
    
      <th scope="row">1</th>
      <td>{{dados.nserie}}</td>
      <td>{{dados.descricao}}</td>
    
    
  </tbody>
</table>
  </div>
</template>
<script>
import api from "@/services/api.js";
import axios from "axios";
export default {
     data(){
       return{
         controladores:[],
        
       }
     },
async mounted(){
  const response = await api.get("controlador");
   this.controladores=response.data;
}

};
</script>
<style >
</style>