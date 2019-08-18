<template>
<div id="cadastro">
   <form class="needs-validation" name="f1">
  <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="validationTooltip01">Número de Série</label>
      <input type="number" class="form-control" id="validationTooltip01" placeholder="Informe o nº de série do controlador"  required>
      <div class="valid-tooltip">
      </div>
    </div>
   </div>
   <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="validationTooltip02">Criar senha</label>
      <input type="password" class="form-control" id="validationTooltip02" name="senha" placeholder="Informe uma senha" size="10"  required>
      <div class="valid-tooltip">
      </div>
    </div>
   </div>
   <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="validationTooltip03">Confirmar senha</label>
      <input type="password" class="form-control" id="validationTooltip03" name="confSenha" placeholder="Confirme sua senha" size="10" required>
      <div class="valid-tooltip">
      </div>
    </div>
   </div>
    

  
  <button class="btn btn-primary" type="submit">Enviar</button>
  <button class="btn btn-danger" type="esc">Cancelar</button>
</form>
</div>

</template>

<script>
  export default {
   name:'cadastro',
    data() {
      return {
        cadastro: {
          nserie: '',
          senha: '',
        },
      }
    },
  }
  function validarSenha(){
	senha = document.f1.senha.value
	confSenha = document.f1.confSenha.value
 
	if (senha == confSenha)
		alert("SENHAS IGUAIS")
	else
		alert("SENHAS DIFERENTES")
}
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }
</style>