<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <router-link to="/">Currency Converter |</router-link>
  <router-link to="/sensor-aggregation"> Sensor |</router-link>
  <router-link to="/sensor-aggregation-simulation"> Sensor Simulation</router-link>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
