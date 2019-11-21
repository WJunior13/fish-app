<template>
  <div id="app">
    <Header />
    <div class="conteudo-router">
      <div class="imagem-fundo-app" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '@/components/header';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');
body {
  background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_jbzUDlEb0sMtE-cmcGzIe2VP47rLVWKQ22C3Z2FfQYeB8Jrh4w';
  font-family: 'Lato', sans-serif !important;
}

html,
body,
div#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.imagem-fundo-app {
  background-image: url('./assets/img_aquario.png');
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: 100vh;
}

.conteudo-router {
  position: relative;
  top: 56px;
  height: calc(100% - 56px);
  overflow: auto;
}

form {
  > label {
    font-weight: 600;
  }
}
</style>
