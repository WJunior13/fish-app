
<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/home">Home</b-navbar-brand>
       
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <router-link class="nav-link" to="/login">Login</router-link>

          <router-link class="nav-link" to="/cadastro">Cadastro</router-link>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right disabled>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>Controlador</em>
            </template>
            <b-dropdown-item href="/login">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

      <router-link v-if="logado" to="/login" v-on:click.native="logout()" replace></router-link>
      <router-link to="/home"></router-link>
      <router-link to="/cadastro"></router-link>
      <router-link to="/init"></router-link>
      <!-- <login/> -->
    </b-navbar>
    <router-view @logado="autenticar"/>
    {{this.input.nserie}}
    {{this.input.senha}}
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "app",
  data() {
    return {
      logado: false,
      input:{
        nserie:'',
        senha:''
      },
      show: true,
      
    };
  },
  mounted() {
    if (!this.logado) {
      this.$router.replace("/home");
    }
    axios.get("http://localhost:3000/cadastro").then(response => {
            this.dados= response.data
           
      
           
    })
    
   
  },

  methods: {
    autenticar(status) {
      this.logado = status;
    },
    logout() {
      this.logado = false;
    },
    handleClick() {
      this.showDismissibleAlert = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(this.$root.teste);
      alert(JSON.stringify(this.form));
    },
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato:400,700");
body {
  background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_jbzUDlEb0sMtE-cmcGzIe2VP47rLVWKQ22C3Z2FfQYeB8Jrh4w";
  font-family: "Lato", sans-serif !important;
}

.router-link-active {
  font-weight: bold;
  color: #fff !important;
}
.nav-background {
  background: #353535;
}
</style>

    