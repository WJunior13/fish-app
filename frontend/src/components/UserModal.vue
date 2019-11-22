<template>
  <modal @open="loadFields()" size="lg" title="Perfil do Usuário" id="userprofile">
    <form class="needs-validation" name="f1">
      <label for="validationDefaultUsername">Nome</label>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Usuário"
          aria-describedby="basic-addon1"
          v-model="formUser.nome"
        />
      </div>

      <label for="validationDefaultEmail">Email</label>

      <div class="input-group mb-3">
        <input
          class="form-control"
          aria-describedby="basic-addon1"
          type="email"
          placeholder="Email"
          v-model="formUser.email"
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
          v-model="formUser.telefone"
        />
      </div>

      <label for="validationDefaultSenha">Senha</label>

      <div class="input-group mb-3">
        <input
          type="password"
          class="form-control"
          placeholder="Senha"
          aria-describedby="basic-addon1"
          v-model="formUser.senha"
        />
      </div>
    </form>

    <hr color="#ccc" />

    <div class="alinhar-direita">
      <button type="button" class="btn btn-outline-success mr-2" data-dismiss="modal" @click="updateUser(formUser)">
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
import cloneObject from '@/utils/cloneObject';
import api from '@/services/api';
import Modal from './modal';

export default {
  name: 'UserModal',
  components: {
    Modal,
  },
  data() {
    return {
      formUser: {
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
  methods: {
    ...mapMutations('sessao', ['setUsuario']),
    async updateUser(usuario) {
      try {
        await api.put(`/usuario`, usuario);

        this.setUsuario(usuario);
        this.closeModalUser();
      } catch (error) {
        console.log(error);
        // exiibir erro pro usuario ou nao
      }
    },
    loadFields() {
      this.formUser = cloneObject(this.usuario);
    },
    closeModalUser() {
      this.limparCampos();
      this.$evnt.emit('modal:userprofile', false);
    },
    limparCampos() {
      this.formUser = {
        id: '',
        nome: '',
        email: '',
        telefone: '',
        senha: '',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.alinhar-direita {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}
</style>
