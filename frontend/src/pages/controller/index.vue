<template>
     <div class="div-fundo">
       <div>
        <b-form inline @submit.prevent>
          <h3>Cadastrar Controlador</h3>
          <div class="form-cadastro"></div>
          <label class="sr-only" for="inline-form-input-desc">Descrição</label>
          <b-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Descrição "
             v-model="selected.descricao"
          ></b-input>

          <label class="sr-only" for="inline-form-input-nserie">Número de série</label>
          <b-input
            id="inline-form-input-username"
            placeholder="Nº de série"
            type="text"
            v-model="selected.numeroSerie"
            :disabled="isDisabled"
          ></b-input>

          <b-button pill variant="info" type="button"  @click="save(selected)">
            <i class="far fa-save"></i> Salvar
          </b-button>
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
 
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import api from '@/services/api';
import notify from '@/components/notify';
import cloneObject from '@/utils/cloneObject'

export default {
  data() {
    return {
      selected: {
        id: null,
        descricao: '',
        numeroSerie: '',
      },
      isDisabled: false
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
          await api.put(`usuario/controlador`, controller);
          this.loadDevices();
          this.clearFields();
         
        } else {
          await api.post('usuario/controlador', controller);
          this.loadDevices();
          this.clearFields();
       
        }
      } catch (error) {
        if(controller.id){
        notify.info({
          title: 'Atenção',
          content: 'Controlador atualizado',
          okColor: 'c-primary',
          okText: 'Fechar',
          })
          this.clearFields();
          }else{
          notify.error({
          title: 'Atenção',
          content: 'Erro ao salvar Controlador.',
          okColor: 'c-danger',
          okText: 'Fechar',
        });
        this.clearFields();
          }
        
      }
    },
    edit(controller) {
      this.selected = cloneObject(controller);
      this.$nextTick(()=>{
        this.isDisabled = true;
      });
    },
    async loadDevices() {
      try {
        const response = await api.get(`usuario/controlador`);
        console.log(response.data)
        this.setControladores(response.data);
      } catch (error) {
        notify.error({
          title: 'Atenção',
          content: 'Erro ao buscar Controladores.',
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
.form-cadastro {
  padding-left: 30px;
  padding-top: 100px;
}
.div-fundo {
  position: absolute;
  top: 150;
  left: 0;
  z-index: 11;
  background-image:url('aquario.jpg');
  width: 100%;
  height: 100%;
  filter: alpha(opacity=150);
}

</style>
