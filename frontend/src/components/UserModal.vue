<template>
  <modal v-if="showModal">
    <h3 slot="header" class="modal-title">
      <div class="row">Atualizar Dados</div>
    </h3>
    <div slot="body">
      <form class="needs-validation" name="f1">
        <label for="validationDefaultUsername">Nome</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Usuário"
            aria-describedby="basic-addon1"
            v-model="formUsuario.nome"
          />
        </div>
        <label for="validationDefaultEmail">Email</label>
        <div class="input-group mb-3">
          <input
            class="form-control"
            aria-describedby="basic-addon1"
            type="email"
            placeholder="Email"
            v-model="formUsuario.email"
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
            v-model="formUsuario.telefone"
          />
        </div>
        <label for="validationDefaultSenha">Senha</label>
        <div class="input-group mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Senha"
            aria-describedby="basic-addon1"
            v-model="formUsuario.senha"
          />
        </div>
      </form>
    </div>
    <div slot="footer">
      <button type="button" class="btn btn-outline-success mr-2" data-dismiss="modal" @click="updateUser(formUsuario)">
        <i class="far fa-check-circle"></i>
        Salvar Alterações
      </button>
      <button type="button" class="btn btn-outline-danger mr-2" @click="closeModalUser()">
        <i class="far fa-times-circle"></i>
        Cancelar
      </button>
    </div>
  </modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import api from '@/services/api';
import Modal from './Modal';

export default {
  name: 'UserModal',
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
      formUsuario: {
        id: '',
        nome: '',
        email: '',
        telefone: '',
        senha: '',
      },
    };
  },
  computed: {
    ...mapState({
      usuario(state) {
        return state.sessao.usuario;
      },
    }),
  },
  created() {
    this.$root.$on('show:modaluser', () => {
      this.formUsuario = JSON.parse(JSON.stringify(this.usuario));
      this.showModal = true;
    });
  },
  destroyed() {
    this.$root.$off('show:modaluser');
  },
  methods: {
    ...mapMutations('sessao', ['setUsuario']),
    async updateUser(usuario) {
      try {
        await api.put('/user', usuario);
        this.setUsuario(usuario);
      } catch (error) {
        console.log(error);
        // exiibir erro pro usuario ou nao
      }
    },
    closeModalUser() {
      this.limparCampos();
      this.showModal = false;
    },
    limparCampos() {
      this.formUsuario = {
        formUsuario: {
          id: '',
          nome: '',
          email: '',
          telefone: '',
          senha: '',
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
