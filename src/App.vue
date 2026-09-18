<template>
  <div id="app">
    <!-- Aquí se carga el componente principal DE MOMENTO-->
    <XestionPacientes />
  </div>
</template>

<script setup>
import XestionPacientes from './components/XestionPacientes.vue'
</script>

<style>
:global(body) {
  margin: 0;
  background: #f6f6f6;
}

#app {
  max-width: 80vw;
  margin: 0 auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

</style>
