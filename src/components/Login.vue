<template>
      <div id="login">
        <b-container>
    <b-row align-h="center" class="mt-5">
      <b-col cols="5">
        <b-card class="p-3">
          <h3 class="mb-4">Login</h3>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup1"
                    label="Nº do Controlador:"
                    label-for="exampleInput1"
                    >
        <b-form-input id="exampleInput1"
                      type="number"
                      v-model="form.Ncontrolador"
                      required
                      placeholder="Insira o número do controlador">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Senha:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="password"
                      v-model="form.senha"
                      required
                      placeholder="Digite sua senha">
        </b-form-input>
      </b-form-group>

      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="remember">Lembrar senha</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <div class="d-flex justify-content-between">
        <div>
         <router-link  to='/init'> <b-button type="submit" variant="primary" >Entrar</b-button></router-link>
         
          <b-button type="reset" variant="danger">Cancelar</b-button>
        </div>
        <div>
          <router-link class="nav-link" to='/cadastro'>Cadastrar Controlador</router-link>
          
        </div>
      </div>
    </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
export default {
  name:'login',
  data() {
    return {
      form: {
        Ncontrolador: "",
        senha: ""
      },
      show: true
    };
  },
  methods: {
    handleClick() {
      this.showDismissibleAlert = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$root.logado=true
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reseta os valores do formulario */
      this.form.Ncontrolador = "";
      this.form.senha = "";

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
</style>
