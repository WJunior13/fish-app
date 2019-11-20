<template>
  <div id="app">
    <Header />
    <div class="conteudo-router">
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

<style>
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

.conteudo-router {
  position: relative;
  top: 56px;
  height: calc(100% - 56px);
  overflow: auto;
}
</style>
