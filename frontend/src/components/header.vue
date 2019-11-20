<template>
  <b-navbar toggleable="md" type="dark" class="nav-fixed">
    <template v-if="!logado">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/home">Home</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <router-link class="nav-link" to="/login">Login</router-link>
        </b-navbar-nav>
      </b-collapse>
    </template>
    <template v-else>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/home">Teste</b-navbar-brand>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState({
      logado(state) {
        console.log(state.sessao.logado);
        return state.sessao.logado;
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
.nav-fixed {
  z-index: 9999;
  background: #353535;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.router-link-active {
  font-weight: bold;
  color: #fff !important;
}
</style>
