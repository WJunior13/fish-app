<template>
  <div class="wrapper-controlador">
    <div class="formulario">
      <h3>Cadastrar Controlador</h3>

      <div class="form-cadastro">
        <b-form style="width:100%">
          <label class="sr-only" for="inline-form-input-desc">Descrição</label>
          <b-input id="inline-form-input-name" placeholder="Descrição " v-model="selected.descricao"></b-input>

          <label class="sr-only" for="inline-form-input-nserie">Número de série</label>
          <b-input
            id="inline-form-input-username"
            placeholder="Nº de série"
            type="number"
            v-model="selected.numeroSerie"
          ></b-input>

          <div class="alinhar-direita">
            <button class="btn btn-outline-success mr-2" type="button" @click="save(selected)">
              <i class="far fa-save"></i>
              Salvar
            </button>
            <button class="btn btn-outline-warning mr-2" type="button" @click="clearFields()">
              <i class="far fa-save"></i>
              Cancelar
            </button>
          </div>
        </b-form>
      </div>

      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">Numero de Série</th>
            <th scope="col">Descrição</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="controlador in controladores" :key="controlador.id">
            <td>{{ controlador.numeroSerie }}</td>
            <td>{{ controlador.descricao }}</td>
            <td>
              <b-button size="sm" variant="info" class="mr-2" @click="edit(controlador)">
                <i class="fas fa-edit"></i>
                Editar
              </b-button>
              <b-button size="sm" variant="danger" @click="remove(controlador)">
                <i class="fa fa-trash"></i>
                Excluir
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import api from '@/services/api';
import notify from '@/components/notify';

export default {
  data() {
    return {
      selected: {
        id: null,
        descricao: '',
        numeroSerie: '',
      },
    };
  },
  computed: {
    ...mapState('controlador', ['controladores']),
  },
  async mounted() {
    this.clearFields();
    this.loadDevices();
  },
  methods: {
    ...mapMutations('controlador', ['setControladores']),
    async remove(controller) {
      try {
        await api.delete(`usuario/controlador/${controller.id}`);
        this.loadDevices();
      } catch (error) {
        notify.error({
          title: 'Atenção',
          content: 'Erro ao remover Controladores.',
          okColor: 'c-danger',
          okText: 'Fechar',
        });
      }
    },
    async save(controller) {
      try {
        if (controller.id) {
          await api.put(`usuario/controlador/${controller.id}`, controller);
          this.loadDevices();
          this.clearFields();
        } else {
          await api.post('usuario/controlador', controller);
          this.loadDevices();
          this.clearFields();
        }
      } catch (error) {
        notify.error({
          title: 'Atenção',
          content: 'Erro ao salvar Controlador.',
          okColor: 'c-danger',
          okText: 'Fechar',
        });
      }
    },
    edit(controller) {
      this.selected = controller;
    },
    async loadDevices() {
      try {
        const response = await api.get(`usuario/controlador`);
        this.setControladores(response.data);
      } catch (error) {
        notify.error({
          title: 'Atenção',
          content: 'Erro ao remover Controladores.',
          okColor: 'c-danger',
          okText: 'Fechar',
        });
      }
    },
    clearFields() {
      this.selected = {
        id: null,
        descricao: '',
        numeroSerie: '',
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper-controlador {
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

    .form-cadastro {
      margin: 20px 0px 35px;

      input {
        width: 100%;
        margin-bottom: 13px;
      }
      .alinhar-direita {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
      }
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
