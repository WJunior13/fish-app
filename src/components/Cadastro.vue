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

      <button class="btn btn-primary" type="submit">Enviar</button>
       <router-link  to='/hora'><button class="btn btn-danger" type="reset">Cancelar</button></router-link>
    </form>
    
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "cadastro",
  data() {
    return {
      nserie: "",
      senha: ""
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
    }
  }
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
