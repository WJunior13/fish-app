
<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/home">Home</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
         <router-link class="nav-link" to='/login'>Login</router-link>
         
            <router-link class="nav-link" to='/cadastro'>Cadastro</router-link>
     
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

      <router-link to="/login"></router-link>
      <router-link to="/home"></router-link>
      <router-link to="/cadastro"></router-link>
      <router-link to="/init"></router-link>
      <!-- <login/> -->
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      form: {
        Ncontrolador: "",
        senha: ""
      },
      show: true
    };
  },
  mounted() {
    this.$router.replace("/home");
  },
  methods: {
    handleClick() {
      this.showDismissibleAlert = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(this.$root.teste);
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reseta os valores do formulario */
      this.form.Ncontrolador = "";
      this.form.senha = "";

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato:400,700");
body {
  background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_jbzUDlEb0sMtE-cmcGzIe2VP47rLVWKQ22C3Z2FfQYeB8Jrh4w";
  font-family: "Lato", sans-serif !important;
}

.router-link-active{
  font-weight: bold;
  color: #fff!important;
}
.nav-background {
  background: #353535;
  

}
</style>

    