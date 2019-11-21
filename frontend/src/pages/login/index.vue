<template>
  <div class="conteudo-login">
    <div class="card-login p-1">
      <b-card style="width:100%;">
        <div class="box-imagem-logo">
          <img src="@/assets/logoHandle.png" style="190px; height:190px" class="img-logo" />
        </div>

        <b-form @submit.prevent="" style="width:100%" v-if="show">
          <b-form-group id="exampleInputGroup1" label="Email:" label-for="exampleInput1">
            <b-form-input
              id="exampleInput1"
              type="email"
              v-model="email"
              required
              placeholder="Insira um email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="exampleInputGroup2" label="Senha:" label-for="exampleInput2">
            <b-form-input
              id="exampleInput2"
              type="password"
              v-model="senha"
              required
              placeholder="Digite sua senha"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-checkbox-group>
              <b-form-checkbox style="color:#333" v-model="checkLembrar">Lembrar senha</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <b-button block variant="success" type="submit" @click="login()">
            <i class="fas fa-sign-in-alt"></i>
            Entrar
          </b-button>

          <div class="d-flex justify-content-between">
            <span style="color:#333;" class="mt-1">
              Não possui conta?
              <router-link class="nav-link" to="/cadastro">Cadastrar-se</router-link>
            </span>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import notify from '@/components/notify';
// import api from '@/services/api';

export default {
  name: 'LoginApp',
  data() {
    return {
      show: true,
      checkLembrar: false,
      email: '',
      senha: '',
    };
  },
  watch: {
    checkLembrar() {
      this.salvarCredenciais();
    },
  },
  mounted() {
    const login = localStorage.getItem('login');
    if (login) {
      const { email, senha, checkLembrar } = JSON.parse(login);
      this.checkLembrar = checkLembrar;
      this.email = email;
      this.senha = senha;
    }
  },
  methods: {
    ...mapMutations('sessao', ['setUsuario', 'setLogado']),
    salvarCredenciais() {
      if (this.checkLembrar[0] === true) {
        const { email, senha, checkLembrar } = this;
        localStorage.setItem('login', JSON.stringify({ email, senha, checkLembrar }));
      } else {
        localStorage.removeItem('login');
      }
    },
    async login() {
      try {
        // const { email, senha } = this;
        // const { data } = await api.post('/auth', { email, senha });

        const usuario = {
          id: 5,
          email: 'jonasvargaski@hotmail.com',
          senha: 'msmsd',
          nome: 'Jonas Vargaski',
          telefone: '99905651',
        };

        // this.setUsuario(data);
        this.setUsuario(usuario);
        this.setLogado(true);

        this.$router.replace({ name: 'monitoring' });
      } catch (error) {
        this.setLogado(false);

        notify.error({
          title: 'Atenção',
          content: 'Dados e-mail ou senha inválidos.',
          okColor: 'c-danger',
          okText: 'Fechar',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.conteudo-login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .box-imagem-logo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.card-login {
  max-width: 580px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
