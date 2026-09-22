<template>
  <div class="pagina">
    <h2>Sobre Nós</h2>
    <p>Somos un equipo dedicado á xestión sanitaria en Galicia.</p>
  </div>
</template>

<script setup></script>

<style scoped>
.pagina {
  background: rgba(255, 255, 255, 0.637);
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  min-height: 300px;
}

.pagina h2 {
  background: var(--verde-principal);
  color: white;
  padding: 0.7rem 1rem;
  border-radius: 3px;
  font-size: 1.3rem;
  text-align: center;
  margin: 0 0 1.2rem 0;
}

.pagina p {
  color: var(--gris-suave);
  font-size: 1rem;
}
</style>