<template>
  <div class="xestion-pacientes">
    <h4>🏥 Xestion de pacientes</h4>
    <form @submit.prevent="gardarPaciente">
      <div class="fila">
        <div class="campo campo-dni">
          <label>DNI/CIF:</label>
          <input
            v-model="novoPaciente.dni"
            type="text"
            required
            maxlength="9"
            placeholder="12345678Z"
            style="text-align: center"
            :class="{ 'input-error': erros.dni }"
            @blur="validarCampo('dni')"
          />
          <p class="erro-campo">{{ mensaxes.dni }}</p>
        </div>
        <div class="campo campo-nome">
          <label>Nome:</label>
          <input
            v-model="novoPaciente.nome"
            type="text"
            required
            :class="{ 'input-error': erros.nome }"
            @blur="
              validarCampo('nome');
              capitalizar('nome');
            "
          />
          <p class="erro-campo">{{ mensaxes.nome }}</p>
        </div>
        <div class="campo campo-apelidos">
          <label>Apelidos:</label>
          <input
            v-model="novoPaciente.apelidos"
            type="text"
            required
            :class="{ 'input-error': erros.apelidos }"
            @blur="
              validarCampo('apelidos');
              capitalizar('apelidos');
            "
          />
          <p class="erro-campo">{{ mensaxes.apelidos }}</p>
        </div>
      </div>

      <div class="fila">
        <div class="campo campo-fecha">
          <label>Fecha Nacimiento:</label>
          <input
            v-model="novoPaciente.fecha_nacimiento"
            type="date"
            required
            :class="{ 'input-error': erros.fecha_nacimiento }"
            @blur="validarCampo('fecha_nacimiento')"
          />
          <p class="erro-campo">{{ mensaxes.fecha_nacimiento }}</p>
        </div>
        <div class="campo campo-telefono">
          <label>Telefono:</label>
          <input
            v-model="novoPaciente.telefono"
            type="tel"
            required
            placeholder="981123456"
            :class="{ 'input-error': erros.telefono }"
            @blur="validarCampo('telefono')"
          />
          <p class="erro-campo">{{ mensaxes.telefono }}</p>
        </div>
        <div class="campo campo-correo">
          <label>Correo:</label>
          <input
            v-model="novoPaciente.correo"
            type="email"
            required
            placeholder="exemplo@email.com"
            :class="{ 'input-error': erros.correo }"
            @blur="validarCampo('correo')"
          />
          <p class="erro-campo">{{ mensaxes.correo }}</p>
        </div>
      </div>

      <div class="fila">
        <div class="campo campo-direccion">
          <label>Direccion:</label>
          <input
            v-model="novoPaciente.direccion"
            type="text"
            required
            :class="{ 'input-error': erros.direccion }"
            @blur="validarCampo('direccion')"
          />
          <p class="erro-campo">{{ mensaxes.direccion }}</p>
        </div>
        <div class="campo campo-provincia">
          <label>Provincia:</label>
          <select
            v-model="novoPaciente.provincia"
            required
            :class="{
              'input-error': erros.provincia,
              'placeholder-select': !novoPaciente.provincia,
            }"
            @blur="validarCampo('provincia')"
            @change="cargarMunicipios"
          >
            <option value="" disabled>Selecciona provincia</option>
            <option
              v-for="provincia in provincias"
              :key="provincia.id"
              :value="provincia.id"
            >
              {{ provincia.nm }}
            </option>
          </select>
          <p class="erro-campo">{{ mensaxes.provincia }}</p>
        </div>
        <div class="campo campo-municipio">
          <label>Municipio:</label>
          <select
            v-model="novoPaciente.municipio"
            required
            :class="{
              'input-error': erros.municipio,
              'placeholder-select': !novoPaciente.municipio,
            }"
            @blur="validarCampo('municipio')"
          >
            <option value="" disabled>Selecciona municipio</option>

            <option v-if="!novoPaciente.provincia" value="" disabled>
              Selecciona la provincia primero
            </option>

            <template v-else>
              <option
                v-for="municipio in municipiosFiltrados"
                :key="municipio.id"
                :value="municipio.nm"
              >
                {{ municipio.nm }}
              </option>
            </template>
          </select>
          <p class="erro-campo">{{ mensaxes.municipio }}</p>
        </div>
      </div>

      <button type="submit" class="btn-guardar">Gardar</button>
    </form>

    <h4>📋 Listaxe de pacientes</h4>

    <div class="tabla-contenedor">
      <table v-if="pacientes.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>DNI/CIF</th>
            <th>Nome</th>
            <th>Apelidos</th>
            <th>Fecha Nacimiento</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Direccion</th>
            <th>Municipio</th>
            <th>Provincia</th>
            <th>Accions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, index) in pacientes" :key="index">
            <td>{{ index + 1 }}</td>
            <td style="text-align: center">{{ u.dni }}</td>
            <td>{{ u.nome }}</td>
            <td>{{ u.apelidos }}</td>
            <td style="text-align: center">{{ u.fecha_nacimiento }}</td>
            <td style="text-align: center">{{ u.telefono }}</td>
            <td>{{ u.correo }}</td>
            <td>{{ u.direccion }}</td>
            <td>{{ u.municipio }}</td>
            <td>{{ nombreProvincia(u.provincia) }}</td>
            <td style="text-align: center" class="acciones">
              <button title="Editar" @click="editarPacientes(index)">
                Editar
              </button>
              <button title="Eliminar" @click="eliminarPacientes(index)">
                Borrar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Non hai pacientes cargados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { obtenerProvincias, obtenerMunicipios } from "../api/municipios.js";

const pacientes = ref([]);

const provincias = ref([]);
const municipios = ref([]);

const erros = reactive({
  dni: false,
  nome: false,
  apelidos: false,
  fecha_nacimiento: false,
  telefono: false,
  correo: false,
  direccion: false,
  municipio: false,
  provincia: false,
});

const mensaxes = reactive({
  dni: "",
  nome: "",
  apelidos: "",
  fecha_nacimiento: "",
  telefono: "",
  correo: "",
  direccion: "",
  municipio: "",
  provincia: "",
});

const novoPaciente = reactive({
  dni: "",
  nome: "",
  apelidos: "",
  fecha_nacimiento: "",
  telefono: "",
  correo: "",
  direccion: "",
  municipio: "",
  provincia: "",
});

// Municipios filtrados por provincia seleccionada
const municipiosFiltrados = computed(() => {
  if (!novoPaciente.provincia) return [];
  return municipios.value.filter((m) =>
    m.id.startsWith(novoPaciente.provincia),
  );
});

// Nombre de provincia a partir de su id (para la tabla)
function nombreProvincia(idProvincia) {
  const p = provincias.value.find((p) => p.id === idProvincia);
  return p ? p.nm : idProvincia;
}

// Al cambiar provincia, reseteamos el municipio
async function cargarMunicipios() {
  // Limpiamos el municipio seleccionado y su posible error
  novoPaciente.municipio = "";
  erros.municipio = false;
  mensaxes.municipio = "";

  if (novoPaciente.provincia === "") {
    municipios.value = [];
    return;
  }

  try {
    municipios.value = await obtenerMunicipios(novoPaciente.provincia);
  } catch (error) {
    console.error("Erro ao cargar os municipios:", error);
    municipios.value = [];
  }
}

onMounted(async () => {
  // Paciente de ejemplo
  pacientes.value = [
    {
      dni: "12345678Z",
      nome: "Usuario",
      apelidos: "Apelidos",
      fecha_nacimiento: "2000-01-01",
      telefono: "981123456",
      correo: "usuario@email.com",
      direccion: "Rua da Camelias, 1",
      municipio: "Santiago de Compostela",
      provincia: "15",
    },
  ];

  // Cargamos provincias desde la API (con try/catch para que no rompa si falla)
  try {
    provincias.value = await obtenerProvincias();
    console.log("Provincias cargadas:", provincias.value.length);
  } catch (error) {
    console.error("Erro ao cargar as provincias:", error);
  }
});

function validarDni(dni) {
  if (!dni) return false;
  const valor = dni.toUpperCase().trim();
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  if (/^[0-9]{8}[A-Z]$/.test(valor)) {
    return valor[8] === letras[parseInt(valor.slice(0, 8), 10) % 23];
  }
  if (/^[XYZ][0-9]{7}[A-Z]$/.test(valor)) {
    const pre = { X: "0", Y: "1", Z: "2" }[valor[0]];
    return valor[8] === letras[parseInt(pre + valor.slice(1, 8), 10) % 23];
  }
  if (/^[ABCDEFGHJNPQRSUVW][0-9]{7}[0-9A-J]$/.test(valor)) return true;
  return false;
}

function capitalizar(campo) {
  const v = novoPaciente[campo];
  if (!v) return;
  novoPaciente[campo] = v
    .toLowerCase()
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function validarCampo(campo) {
  const v = novoPaciente[campo];
  let msg = "";

  if (campo === "dni") {
    if (!v) msg = "DNI/CIF obligatorio.";
    else if (!validarDni(v)) msg = "DNI/CIF non valido.";
  } else if (campo === "nome") {
    if (!v || !v.trim()) msg = "Nome obrigatorio.";
  } else if (campo === "apelidos") {
    if (!v || !v.trim()) msg = "Apelidos obrigatorios.";
  } else if (campo === "fecha_nacimiento") {
    if (!v) msg = "Data obrigatoria.";
  } else if (campo === "telefono") {
    if (!v) msg = "Telefono obrigatorio.";
    else if (!/^[0-9]{9}$/.test(v)) msg = "Telefono: 9 digitos.";
  } else if (campo === "correo") {
    if (!v) msg = "Correo obrigatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = "Correo non valido.";
  } else if (campo === "direccion") {
    if (!v || !v.trim()) msg = "Direccion obrigatoria.";
  } else if (campo === "municipio") {
    if (!v || !v.trim()) msg = "Municipio obrigatorio.";
  } else if (campo === "provincia") {
    if (!v) msg = "Provincia obrigatoria.";
  }

  mensaxes[campo] = msg;
  erros[campo] = msg !== "";
}

function gardarPaciente() {
  const campos = [
    "dni",
    "nome",
    "apelidos",
    "fecha_nacimiento",
    "telefono",
    "correo",
    "direccion",
    "municipio",
    "provincia",
  ];
  campos.forEach(validarCampo);
  if (campos.some((c) => erros[c])) return;

  pacientes.value.push({ ...novoPaciente });
  Object.assign(novoPaciente, {
    dni: "",
    nome: "",
    apelidos: "",
    fecha_nacimiento: "",
    telefono: "",
    correo: "",
    direccion: "",
    municipio: "",
    provincia: "",
  });
  campos.forEach((c) => {
    erros[c] = false;
    mensaxes[c] = "";
  });
}

function eliminarPacientes(index) {
  pacientes.value.splice(index, 1);
}

function editarPacientes(index) {
  Object.assign(novoPaciente, pacientes.value[index]);
  Object.keys(erros).forEach((k) => {
    erros[k] = false;
    mensaxes[k] = "";
  });
}
</script>

<style scoped>
.xestion-pacientes {
  width: 100%;
  background: rgba(255, 255, 255, 0);
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.fila {
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: flex-start;
}

.campo {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  height: 3.6rem;
  overflow: visible;
}

.erro-campo {
  flex-basis: 100%;
  color: #d6336c;
  font-size: 0.72rem;
  font-style: italic;
  margin: 0;
  padding-left: 80px;
  line-height: 1;
  height: 0.9rem;
}

.campo-dni {
  flex: 1;
}
.campo-nome {
  flex: 2;
}
.campo-apelidos {
  flex: 2;
}
.campo-fecha {
  flex: 1.5;
}
.campo-telefono {
  flex: 1.5;
}
.campo-correo {
  flex: 2;
}
.campo-direccion {
  flex: 2.9;
}
.campo-municipio {
  flex: 2;
}
.campo-provincia {
  flex: 2;
}

.campo label {
  min-width: 80px;
  font-weight: bold;
  font-size: 0.9rem;
}

.campo select,
.campo input {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gris-borde);
  border-radius: 0;
  box-sizing: border-box;
  font-size: 0.9rem;
  color: var(--gris-texto);
}

.campo select:focus,
.campo input:focus {
  outline: none;
  border-color: var(--verde-principal);
  box-shadow: 0 0 0 2px rgba(76, 161, 54, 0.15);
}

.placeholder-select {
  color: #333 !important;
  background-color: #e9e9e9 !important;
  -webkit-text-fill-color: #333;
}

.input-error,
.input-error.placeholder-select {
  color: #d6336c !important;
  -webkit-text-fill-color: #d6336c !important;
  background-color: #ffd6e0 !important;
  border: 1px solid #ff4d6d !important;
}

.btn-guardar {
  background-color: var(--verde-principal);
  color: white;
  border: none;
  padding: 0.6rem 2.2rem;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  font-size: 1rem;
  border-radius: 3px;
  transition: background 0.2s;
}

.btn-guardar:hover {
  background-color: var(--verde-oscuro);
}

.tabla-contenedor {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  margin-top: 1rem;
  font-size: 0.75rem;
  border: 1px solid var(--gris-borde);
  border-radius: 3px;
  overflow: hidden;
}

th,
td {
  border: 1px solid var(--gris-borde);
  padding: 0.5rem;
  text-align: left;
  white-space: nowrap;
}

th {
  text-align: center;
  background-color: var(--verde-claro);
  color: var(--verde-oscuro);
}

h4 {
  margin-bottom: 1rem;
  font-weight: 600;
  background-color: var(--verde-principal);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 3px;
}

.acciones button {
  background: none;
  border: 1px solid var(--verde-principal);
  color: var(--verde-principal);
  cursor: pointer;
  font-size: 0.7rem;
  margin: 0 0.2rem;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  transition: all 0.2s;
}

.acciones button:hover {
  background: var(--verde-principal);
  color: white;
}

@media (max-width: 1200px) {
  .fila {
    flex-wrap: wrap;
  }
  .campo {
    flex: 1 1 45%;
  }
  .campo-direccion,
  .campo-municipio {
    flex: 1 1 100%;
  }
}

@media (max-width: 768px) {
  .xestion-pacientes {
    padding: 1rem;
  }
  .fila {
    flex-direction: column;
    gap: 0.5rem;
  }
  .campo {
    flex: 1 1 100%;
    height: auto;
    min-height: 3.2rem;
  }
  .erro-campo {
    padding-left: 0;
  }
}
</style>
