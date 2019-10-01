<template>
  <div id="login">
    <b-navbar toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/home">Home</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <router-link class="nav-link" to="/login">Login</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container class="login">
      <b-row align-h="center" class="mt-5">
        <b-col cols="5">
          <b-card class="p-3">
            <div class="alert alert-danger alert-dismissible fade show" v-if="alerta">
              <button type="button" class="close" data-dismiss="alert" @click="closeAlert()">&times;</button>
              <strong>Atenção!</strong>
              Email ou senha incorretos.
            </div>
            <h3 class="mb-4">Login</h3>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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

              <b-form-group id="exampleGroup4">
                <b-form-checkbox-group id="exampleChecks">
                  <b-form-checkbox v-model="checkLembrar">Lembrar senha</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
              <div class="d-flex justify-content-between">
                <div>
                  <b-button type="submit" variant="success mr-2" v-on:click="login()">Entrar</b-button>

                  <b-button type="reset" variant="danger mr-2">Cancelar</b-button>
                </div>
                <div>
                  Não possui conta?
                  <router-link class="nav-link" to="/cadastro">Cadastrar-se</router-link>
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
import axios from "axios"
export default {
  name: "login",
  data() {
    return {
      show: true,
      alerta: false,
      email:'',
      senha:'',
      checkLembrar:false

    };
  },
 
  mounted(){
     const login=localStorage.getItem("login")
     if(login){
       const {email,senha,checkLembrar}=JSON.parse(login)
       this.email=email
       this.senha=senha
       this.checkLembrar=checkLembrar
     }
  },
  watch:{
    checkLembrar(){
      this.salvarCredencial()
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
    closeAlert(){
    this.alerta=false
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reseta os valores do formulario */
      this.email = "";
      this.senha = "";
      this.alerta=false;  

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    salvarCredencial(){
     if(this.checkLembrar[0] === true){
       const {email,senha,checkLembrar }=this
      localStorage.setItem("login",JSON.stringify({email,senha,checkLembrar}))
     }else{
       console.log('1mfdkmdk')
       localStorage.removeItem("login")
     }
    },
    login() {
       
       axios.post("http://localhost:3000/auth",{email:this.email,senha:this.senha}).then(response => {
           // this.dados= response.data 
           console.log(response)
           this.alerta=false
           console.log("Email ou senha incorretos");
          this.email = "";
          this.senha = "";
          this.$emit("logado", true);
          this.$router.replace({ name: "init" });

    }).catch(e=>{
    this.alerta=true
    }) 
          
    
    
    }  
  }
};
</script>

<style>
.login {
  border-color: red;
}
</style>
