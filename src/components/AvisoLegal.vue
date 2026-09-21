<template>
  <div class="pagina">
    <h2>Aviso Legal</h2>
    <p>
      Esta aplicación é un proxecto académico desenvolvido en Vue 3.
      A información aquí mostrada é de carácter ficticio e só se usa
      con fins educativos.
    </p>
  </div>
</template>

<script setup></script>

<style scoped>
.pagina {
  background: white;
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
  line-height: 1.6;
}
</style>