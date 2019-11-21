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
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <router-link class="nav-link" to="/monitoring">Monitoramento</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <router-link class="nav-link" to="/devices">Controladores</router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em class="pr-2">{{ usuario.nome }}</em>
            </template>

            <b-dropdown-item @click="showUserModal()">
              <i class="far fa-user"></i>
              Meus Dados
            </b-dropdown-item>

            <b-dropdown-item class="nav-link" @click="logout()">
              <i class="fas fa-sign-out-alt"></i>
              Sair
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </template>
  </b-navbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState({
      logado(state) {
        return state.sessao.logado;
      },
      usuario(state) {
        return state.sessao.usuario;
      },
    }),
  },
  methods: {
    ...mapMutations('sessao', ['setLogado']),
    logout() {
      this.setLogado(false);
      this.$router.replace('/login');
    },
    showUserModal() {
      this.$root.$emit('show:modaluser');
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-fixed {
  z-index: 99;
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
