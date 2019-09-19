<template>
  <div id="login">
    <b-container class="login">
      <b-row align-h="center" class="mt-5">
        <b-col cols="5">
          <b-card class="p-3">
            <div class="alert alert-danger alert-dismissible fade show" v-if="alerta">
              <button type="button" class="close" data-dismiss="alert" @click="closeAlert()">&times;</button>
              <strong>Atenção!</strong>
              Número de série ou senha incorretos.
            </div>
            <h3 class="mb-4">Login</h3>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                id="exampleInputGroup1"
                label="Nº do Controlador:"
                label-for="exampleInput1"
              >
                <b-form-input
                  id="exampleInput1"
                  type="number"
                  v-model="form.nserie"
                  required
                  placeholder="Insira o número do controlador"
                ></b-form-input>
              </b-form-group>
              <b-form-group id="exampleInputGroup2" label="Senha:" label-for="exampleInput2">
                <b-form-input
                  id="exampleInput2"
                  type="password"
                  v-model="form.senha"
                  required
                  placeholder="Digite sua senha"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="exampleGroup4">
                <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                  <b-form-checkbox value="remember">Lembrar senha</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
              <div class="d-flex justify-content-between">
                <div>
                  <b-button type="submit" variant="primary" v-on:click="login()">Entrar</b-button>

                  <b-button type="reset" variant="danger">Cancelar</b-button>
                </div>
                <div>
                  <router-link class="nav-link" to="/cadastro">Cadastrar Controlador</router-link>
                 
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
  name: "login",
  data() {
    return {
      form: {
        nserie: "",
        senha: ""
      },
      show: true,
      alerta: false,
    };
  },
  methods: {
    handleClick() {
      this.showDismissibleAlert = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$root.logado = true;
    },
    closeAlert(){
    this.alerta=false
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reseta os valores do formulario */
      this.form.nserie = "";
      this.form.senha = "";
      this.alerta=false;  

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    login() {
      if (this.form.nserie != "" && this.form.senha != "") {
        if (
          this.form.nserie == this.$parent.input.nserie &&
          this.form.senha == this.$parent.input.senha
        ) {
          this.$emit("logado", true);
          this.$router.replace({ name: "init" });
        } else {
          console.log("Numero de serie ou senha incorretos");
          this.form.nserie = "";
          this.form.senha = "";
           this.alerta=true;
        }
      } else {
        console.log("Os campos devem estar preenchidos");
      }
    }
  }
};
</script>

<style>
.login{
  border-color:red  
}
</style>
