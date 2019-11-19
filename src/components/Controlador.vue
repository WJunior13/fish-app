<template>
  <div class="div-fundo">
    <div>
      <!-----------------------NavBar---------------------------->
      <b-navbar toggleable="md" type="dark" class="nav-color">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand class="nav-link" to="init">
          <i class="fas fa-home"></i>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <router-link class="nav-link" to="/controlador">Controladores</router-link>
          </b-navbar-nav>
        
        </b-collapse>
      </b-navbar>
      <!------------------------------------------------------------------------------------------------------>
      <div>
        <b-form inline @submit="saveController">
          <h3>Cadastrar Controlador</h3>
          <div class="form-cadastro"></div>
          <label class="sr-only" for="inline-form-input-desc">Descrição</label>
          <b-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Descrição "
            v-model="descricao"
          ></b-input>

          <label class="sr-only" for="inline-form-input-nserie">Número de série</label>
          <b-input
            id="inline-form-input-username"
            placeholder="Nº de série"
            type="number"
            v-model="nserie"
          ></b-input>

          <b-button pill variant="info" type="submit">
            <i class="far fa-save"></i> Salvar
          </b-button>
        </b-form>
      </div>

      <div>
        <div class="mensagem" v-if="showMessage">Nenhum Controlador Cadastrado</div>
        <table class="table" v-if="showTable">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nº de série</th>
              <th scope="col">Descrição</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dados in controladores" :key="dados">
              <th scope="col">
                <b-form-checkbox></b-form-checkbox>
              </th>
              <td>{{dados.numeroSerie}}</td>
              <td>{{dados.descricaoControlador}}</td>
              <td>
                <b-button size="sm" variant="info" class="mr-2" v-on:click="editCotroller(dados.idControlador)">
                  <i class="fas fa-edit"></i>
                  Editar
                </b-button>
                <b-button size="sm"  variant="danger">
                  <i class="fa fa-trash"></i>
                  Excluir
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/services/api";


import axios from "axios";
export default {
  data() {
    return {
      controladores: [],
      descricao: "",
      nserie: "",
      showTable:false,
      showMessage:false
    };
  },
  async mounted() {
    const id=this.$root.usuario.id
    const response = await api.get(`usuario/controlador/${id}`);
    this.controladores = response.data;
     if(this.controladores.length == 0){
      this.showMessage=true
     }else{
       this.showMessage=false
       this.showTable=true
     }
       
    
  },
  methods: {
    async saveController(e) {
      e.preventDefault();
      try {
        const controlador = {
          descricao: this.descricao,
          nserie: this.nserie
          
        };
        await api.post("controlador", controlador);
        console.log("salvo");
      } catch (error) {
        console.log(error);
      }
    },
    async editCotroller(id){
      await api.put(`controlador/${id}`)
           this.descricao=response.data.descricao;
           this.nserie=response.data.nserie;
        }
      
  }
  
};
</script>
<style scoped>
.form-cadastro {
  padding-left: 30px;
  padding-top: 100px;
}
.mensagem{
 padding-top: 20px; 
position: relative;
align-items: center;
text-align: center;
font-size: 30px;
font-style: oblique;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;



}
.div-fundo {
  position: absolute;
  top: 150;
  left: 0;
  z-index: 11;
  background-image: url("../assets/aquario.jpg");
  width: 100%;
  height: 100%;
  filter: alpha(opacity=150);
}
</style>