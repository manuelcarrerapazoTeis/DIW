<template>
  <div id="app">
    <NavBar />
    <main class="contenido-principal">
      <router-view />
    </main>
    <FooTer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import FooTer from './components/FooTer.vue';
</script>

<style>
/* Paleta verde global de la app */
:root {
  --verde-principal: #4ca136;
  --verde-oscuro: #3a7c2a;
  --verde-claro: #e8f5e3;
  --gris-texto: #333;
  --gris-suave: #777;
  --gris-borde: #ddd;
  --amarillo: #ffe66d;
}

body {
  margin: 0;
  background: #f6f6f6 url('./assets/img/fondo.png') no-repeat center center fixed;
  background-size: cover;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--gris-texto);
  overflow-y: hidden;
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
  background: transparent; 
}

.contenido-principal {
  flex: 1;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
</style>