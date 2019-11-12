<template>
   <div class="div-fundo">
       <div id="controlador">
   
     <b-navbar toggleable="md" type="dark" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/home">Home</b-navbar-brand>
       
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <router-link class="nav-link" to="/login">Login</router-link>

          
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        
      </b-collapse>
 </b-navbar>
  <h2 class="space">Cadastro de usuário</h2>
    <form class="needs-validation" name="f1" @submit="formSubmit">
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationDefault01">Nome</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault01"
            placeholder="Informe um Nome"
            v-model="nome"
            required
          />
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationDefaultUsername">Email</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend2">@</span>
            </div>
            <input
              type="email"
              class="form-control"
              id="validationDefaultUsername"
              placeholder="Email"
              aria-describedby="inputGroupPrepend2"
              v-model="email"
              required
            />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-2 mb-3">
          <label for="validationDefault03">Telefone</label>
          <input
            type="text"
            class="form-control"
            id="validationDefault03"
            placeholder="Telefone"
            v-model="telefone"
            required
          />
        </div>
        <div class="col-md-2 mb-3">
          <label for="validationDefault04">Criar Senha</label>
          <input
            type="password"
            class="form-control"
            id="validationDefault04"
            placeholder="Digite uma senha"
            v-model="criaSenha"
            required
          />
        </div>
        <div class="col-md-2 mb-3">
          <label for="validationDefault04">Confirmar Senha</label>
          <input
            type="password"
            class="form-control"
            id="validationDefault05"
            placeholder="Digite uma senha"
            v-model="senha"
            required
          />
        </div>
      </div>
      <div class="form-group"></div>
      <button class="btn btn-success" type="submit" @click="$bvToast.show('my-toast')">
        <i class="far fa-check-circle"></i> 
        Cadastrar</button>
      <router-link to="home">
      <button class="btn btn-danger" type="reset">
        <i class="far fa-times-circle"></i> 
        Cancelar</button>
        </router-link>
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
  </div>

</template>

<script>
import api from "@/services/api";
export default {
  name: "cadastro",
  data() {
    return {
      nome:"",
      email:"",
      telefone:"",
      criaSenha:"",
      senha:"",
    };
  },

  watch: {
    email: function() {
      console.log(this.email);
    }
  },
  methods: {
    async formSubmit(e) {
      e.preventDefault();
      try {
        const usuario = {
          nome: this.nome,
          email:this.email,
          telefone:this.telefone,
          senha:this.senha
        };
        await api.post("usuario", usuario);
        console.log("salvo");
        window.location.replace("http://localhost:8080/login")
        
      } catch (error) {
        console.log(error);
      }
      
    },

    popToast() {
      // Use a shorter name for this.$createElement
      const h = this.$createElement;
      // Increment the toast count
      this.count++;
      // Create the message
      const vNodesMsg = h("p", { class: ["text-center", "mb-0"] }, [
        h("b-spinner", { props: { type: "grow", small: true } }),
        " Flashy ",
        h("strong", {}, "toast"),
        ` message #${this.count} `,
        h("b-spinner", { props: { type: "grow", small: true } })
      ]);
      // Create the title
      const vNodesTitle = h(
        "div",
        { class: ["d-flex", "flex-grow-1", "align-items-baseline", "mr-2"] },
        [
          h("strong", { class: "mr-2" }, "The Title"),
          h("small", { class: "ml-auto text-italics" }, "5 minutes ago")
        ]
      );
      // Pass the VNodes as an array for message and title
      this.$bvToast.toast([vNodesMsg], {
        title: [vNodesTitle],
        solid: true,
        variant: "info"
      });
    }
  }
};
</script>

<style scoped>
form {
  margin-bottom: 2rem;
  padding: 15px;
}
button {
  margin: 0 5px;
}
.space{

  padding-left: 8px;
}
.div-fundo {
  position: absolute;
  top: 150;
  left: 0;
  z-index: 11;
  background-image: url("../assets/img_aquario.png");
  width: 100%;
  height: 100%;
  filter: alpha(opacity=20);
}
</style>
