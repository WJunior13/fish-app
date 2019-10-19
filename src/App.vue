
<template>
  <div id="app">
      <router-link v-if="logado" to="/login" v-on:click.native="logout()" replace></router-link>
      <router-link to="/home"></router-link>
      <router-link to="/cadastro"></router-link>
      <router-link to="/init"></router-link>
      <router-link to="/controlador"></router-link>

   
    <router-view @logado="autenticar"/>
  </div>
</template>

<script>
export default {

  name: "app",
  data() {
    return {
      logado: false,
      
        email:'',
        senha:'' ,
      show: true,
      
    };
  },
  mounted() {
    if (!this.logado) {
      this.$router.replace("/home");
    }
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
      alert(JSON.stringify(this));
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
  background:#353535;
}

</style>

    