<template>
  <div class="not-found">
    <h2>A páxina que buscas non existe</h2>
    <img
      src="../assets/img/404.png"
      alt="404 Not Found"
    >
    <p class="mensaxe">
      Comproba a dirección ou volve á páxina principal.
    </p>
  </div>
</template>

<script setup></script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.not-found h2 {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--verde-oscuro);
  background: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.not-found img {
  max-width: 400px;
  width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
}

.mensaxe {
  color: var(--gris-suave);
  font-size: 0.95rem;
  font-style: italic;
}
</style>