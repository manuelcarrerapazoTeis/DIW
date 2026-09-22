<template>
  <nav class="navbar">
    <div class="logo">
      Sanidad Teis
    </div>

    <button
      class="hamburger"
      @click="isOpen = !isOpen"
    >
      ☰
    </button>

    <ul :class="['menu', { open: isOpen }]">
      <li>
        <RouterLink to="/">
          Inicio
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/xestion-pacientes">
          Xestion de Pacientes
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/sobrenos">
          Sobre nós
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue"
const isOpen = ref(false)
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  background: var(--verde-principal);
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.logo {
  font-weight: bold;
  font-size: 1.15rem;
  letter-spacing: 0.5px;
}

.menu {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding-bottom: 3px;
  transition: color 0.2s;
}

.menu a:hover {
  color: var(--amarillo);
}

.menu a.router-link-active {
  border-bottom: 0.2rem solid var(--amarillo);
}

.hamburger {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .menu {
    display: none;
    position: absolute;
    top: 55px;
    right: 0;
    flex-direction: column;
    background: var(--verde-principal);
    padding: 1rem 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  .menu.open {
    display: flex;
  }
}
</style>