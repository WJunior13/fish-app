<template>
   <div class="switch__container">
                    <input :id="_uid" class="switch switch--shadow" :value="value" @input="$emit('input',!value)"  type="checkbox" />
                    <label :for="_uid"></label>
                </div>
</template>
 <script>
 export default {
    props:[
      "value"
    ] 
 }
 </script>
 <style>
 .switch__container {
  margin: 0px auto;
  width: 0px;
}

.switch {
  visibility: hidden;
  position: absolute;
  margin-left: -9999px;
}

.switch + label {
  display: block;
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
}

.switch--shadow + label {
  padding: 2px;
  width: 30px;
  height: 15px;
  background-color: #dddddd;
  border-radius: 10px;
}
.switch--shadow + label:before,
.switch--shadow + label:after {
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  content: "";
}
.switch--shadow + label:before {
  right: 1px;
  background-color: #f1f1f1;
  border-radius: 10px;
  transition: background 0.4s;
}
.switch--shadow + label:after {
  width: 12px;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.4s;
}
.switch--shadow:checked + label:before {
  background-color: #8ce196;
}
.switch--shadow:checked + label:after {
  transform: translateX(15px);
}
 
 </style>