<template>
  <div id="controlador">
    <form class="needs-validation" name="f1" @submit="formSubmit">
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationTooltip01">Número de Série</label>
          <input
            type="number"
            class="form-control"
            id="nserie"
            placeholder="Informe o nº de série do controlador"
            name="nserie"
            v-model="nserie"
            required
          />
          <div class="valid-tooltip"></div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationTooltip02">Criar senha</label>
          <input
            type="password"
            class="form-control"
            id="senha01"
            name="seha"
            placeholder="Informe uma senha"
            size="10"
            required
          />
          <div class="valid-tooltip"></div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationTooltip03">Confirmar senha</label>
          <input
            type="password"
            class="form-control"
            id="senha"
            name="senha"
            placeholder="Confirme sua senha"
            size="10"
            v-model="senha"
            required
          />
          <div class="valid-tooltip"></div>
        </div>
      </div>
      
      <button class="btn btn-primary" type="submit" @click="$bvToast.show('my-toast')">Enviar</button>
       <router-link  to='/home'><button class="btn btn-danger" type="reset">Cancelar</button></router-link>
    </form>
     <b-toast id="my-toast" variant="success" solid>
      <template v-slot:toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#77dd77" class="mr-2" width="12" height="12"></b-img>
           
          <strong class="mr-auto"></strong>
          <small class="text-muted mr-2"></small>
        </div>
      </template>
      Cadastro realizado com sucesso
    </b-toast>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "cadastro",
  data() {
    return {
      nserie: "",
      senha: "",

    };
  },
  
  watch:{
    nserie:function(){
      console.log(this.nserie)
    }
  },
  methods: {
    async formSubmit(e) {
      e.preventDefault();
      try {
        const controlador = {
          nserie: this.nserie,
          senha: this.senha
        };
        await api.post("cadastro", controlador);
        console.log("salvo");
        
        
      } catch (error) {
        console.log(error);
      }
    },
    
  popToast() {
        // Use a shorter name for this.$createElement
        const h = this.$createElement
        // Increment the toast count
        this.count++
        // Create the message
        const vNodesMsg = h(
          'p',
          { class: ['text-center', 'mb-0'] },
          [
            h('b-spinner', { props: { type: 'grow', small: true } }),
            ' Flashy ',
            h('strong', {}, 'toast'),
            ` message #${this.count} `,
            h('b-spinner', { props: { type: 'grow', small: true } })
          ]
        )
        // Create the title
        const vNodesTitle = h(
          'div',
          { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
          [
            h('strong', { class: 'mr-2' }, 'The Title'),
            h('small', { class: 'ml-auto text-italics' }, '5 minutes ago')
          ]
        )
        // Pass the VNodes as an array for message and title
        this.$bvToast.toast([vNodesMsg], {
          title: [vNodesTitle],
          solid: true,
          variant: 'info'
        })
      }
    
  },
  
};
</script>

<style scoped>
form {
  margin-bottom: 2rem;
  padding: 15px;
}
button{
   margin: 0 5px;
}
</style>
