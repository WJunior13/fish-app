<template>
  <div class="wrapper-cadastro">
    <div class="formulario">
      <h2 class="space">Cadastro de usuário</h2>
      <form class="needs-validation" name="f1">
        <label for="validationDefaultUsername">Nome</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Usuário"
            aria-describedby="basic-addon1"
            v-model="nome"
          />
        </div>

        <label for="validationDefaultEmail">Email</label>

        <div class="input-group mb-3">
          <input
            class="form-control"
            aria-describedby="basic-addon1"
            type="email"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>

        <label for="validationDefaultTelefone">Telefone</label>

        <div class="input-group mb-3">
          <input
            type="tel"
            class="form-control"
            placeholder="Telefone"
            aria-describedby="basic-addon1"
            v-model="telefone"
          />
        </div>

        <label for="validationDefaultSenha">Senha</label>

        <div class="input-group mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Senha"
            aria-describedby="basic-addon1"
            v-model="senha"
          />
        </div>
        <hr color="#ccc" />

        <div class="alinhar-direita">
          <button type="button" class="btn btn-outline-success mr-2" data-dismiss="modal" @click="saveUser()">
            <i class="far fa-check-circle"></i>
            Salvar Alterações
          </button>

          <button type="button" class="btn btn-outline-danger mr-2" @click="closeModalUser()">
            <i class="far fa-times-circle"></i>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'Cadastro',
  data() {
    return {
      nome: '',
      email: '',
      telefone: '',
      criaSenha: '',
      senha: '',
    };
  },
  methods: {
    async saveUser() {
      try {
        const usuario = {
          nome: this.nome,
          email: this.email,
          telefone: this.telefone,
          senha: this.senha,
        };
        await api.post('usuario', usuario);

        this.$router.replace('/login');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.wrapper-cadastro {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  div.formulario {
    width: 100%;
    max-width: 580px;
    background: #fff !important;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 18px #cdcdcd;
    border-radius: 6px;
    padding: 11px 18px;

    input {
      margin-bottom: 8px;
    }

    .alinhar-direita {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
    }
  }
}
</style>
