<template>
  <footer class="footer">
    <ul class="link-aviso">
      <router-link to="/avisolegal" target="_blank">Aviso Legal</router-link>
    </ul>
    <p>© {{ new Date().getFullYear() }} Sanidad Teis — Desenvolvido en Vue 3</p>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background: var(--verde-principal);
  color: white;
  text-align: center;
  padding: 0.8rem 2rem;
  font-size: 0.85rem;
  margin-top: auto;
}

.link-aviso {
  display: block;
  margin: 0 0 4px 0;
  padding: 0;
}

.link-aviso a {
  color: var(--amarillo);
  text-decoration: none;
  font-weight: 500;
}

.link-aviso a:hover {
  text-decoration: underline;
}

.footer p {
  margin: 0;
}
</style>