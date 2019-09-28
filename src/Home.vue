<template>
    <div>
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
 
 <div class="container-fluid" >
          <p>
            <img src="./assets/img-2.png" width="100%" >
          </p>
          <p>
            <img src="./assets/Imagem1.png" width="100%" >
          </p>
          </div>
          </div>
          </template>
          <script>
  export default {
   name:'home',
   
    
  }

</script>

        <style>

 p{
    background-color: rgba(239, 247, 250, 0.700);
    font-size: 30px;
    font-style: inherit;
    size: 10

}
.nav-background {
  background: #353535;
}
  </style>