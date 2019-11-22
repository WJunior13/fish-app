<template>
  <modal id="helptemp" title="Temperaturas ideais" size="lg">
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">Espécie</th>
          <th scope="col">Faixa de Temperatura</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.especie">
          <td>{{ item.especie }}</td>
          <td>{{ item.temps }} °C</td>
        </tr>
      </tbody>
    </table>
  </modal>
</template>

<script>
import Modal from './modal';

export default {
  name: 'HelpTemp',
  components: {
    Modal,
  },
  data() {
    return {
      items: [
        {
          especie: 'Espada',
          temps: '24 a 28',
        },
        {
          especie: 'Molinésia',
          temps: '24 a 28',
        },
        {
          especie: 'Colisa',
          temps: '22 a 28',
        },
        {
          especie: 'Tricogaster',
          temps: '21 a 28',
        },
        {
          especie: 'Kinguio',
          temps: '10 a 26',
        },
        {
          especie: 'Betta',
          temps: '24 a 30',
        },
        {
          especie: 'Platy',
          temps: '24 a 28',
        },
        {
          especie: 'Guppy',
          temps: '24 a 28',
        },
        {
          especie: 'Carpa',
          temps: '10 a 30',
        },
        {
          especie: 'Barbos',
          temps: '22 a 26',
        },
        {
          especie: 'Paulistinha',
          temps: '24 a 28',
        },
        {
          especie: 'Acará Bandeira',
          temps: '24 a 28',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
