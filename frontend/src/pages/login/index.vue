<template>
  <div class="conteudo-login">
    <div class="imagem-fundo-login" />

    <div class="card-login p-1">
      <div class="alert alert-danger alert-dismissible fade show" v-if="alerta">
        <b-button type="button" class="close" data-dismiss="alert" @click="closeAlert()">&times;</b-button>
        <strong>Atenção!</strong>
        Email ou senha incorretos.
      </div>

      <b-card style="width:100%;">
        <img src="@/assets/logoHandle.png" style="190px; height:190px" class="img-logo" />

        <b-form @submit="onSubmit" @reset="onReset" style="width:100%" v-if="show">
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
import api from '@/services/api';

export default {
  name: 'LoginApp',
  props: {
    dadosUser: {
      type: [String, Object],
    },
  },
  data() {
    return {
      show: true,
      alerta: false,
      id: '',
      email: '',
      senha: '',
      checkLembrar: false,
      nome: '',
      telefone: '',
    };
  },
  watch: {
    checkLembrar() {
      this.salvarCredencial();
    },
  },

  mounted() {
    const dataUser = localStorage.getItem('dados');
    if (dataUser) {
      this.$root.usuario = JSON.parse(dataUser);
    }

    const login = localStorage.getItem('login');
    if (login) {
      const { email, senha, checkLembrar } = JSON.parse(login);
      this.email = email;
      this.senha = senha;
      this.checkLembrar = checkLembrar;
    }
  },

  methods: {
    handleClick() {
      this.showDismissibleAlert = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$root.logado = true;
    },
    closeAlert() {
      this.alerta = false;
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reseta os valores do formulario */
      this.email = '';
      this.senha = '';
      this.alerta = false;

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    salvarCredencial() {
      if (this.checkLembrar[0] === true) {
        const { email, senha, checkLembrar } = this;
        localStorage.setItem('login', JSON.stringify({ email, senha, checkLembrar }));
      } else {
        console.log('1mfdkmdk');
        localStorage.removeItem('login');
      }
    },

    async login() {
      try {
        const resposta = await api.post('/auth', { email: this.email, senha: this.senha });
        this.id = resposta.data.usuario.id;
        this.nome = resposta.data.usuario.nome;
        this.telefone = resposta.data.usuario.telefone;
        this.email = resposta.data.usuario.email;
        this.senha = resposta.data.usuario.senha;

        localStorage.setItem(
          'dados',
          JSON.stringify({
            id: this.id,
            nome: this.nome,
            telefone: this.telefone,
            email: this.email,
            senha: this.senha,
          })
        );

        if (resposta.data.usuario) {
          this.alerta = false;
          this.email = '';
          this.senha = '';
          this.$emit('logado', true);
          return this.$router.replace({ name: 'init' });
        }

        console.log('usuario nao cadastrado', resposta.data);
      } catch (error) {
        this.alerta = true;
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.imagem-fundo-login {
  background-image: url('../../assets/img_aquario.png');
  background-size: cover;
  position: fixed;
  width: 100vw;
  height: 100vh;
}

.conteudo-login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.card-login {
  max-width: 650px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
