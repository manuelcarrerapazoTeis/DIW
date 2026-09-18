<template>
  <div class="xestion-pacientes">
    <h4>Xestion de pacientes</h4>
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
          <p class="erro-campo">
            {{ mensaxes.dni }}
          </p>
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
          <p class="erro-campo">
            {{ mensaxes.nome }}
          </p>
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
          <p class="erro-campo">
            {{ mensaxes.apelidos }}
          </p>
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
          <p class="erro-campo">
            {{ mensaxes.fecha_nacimiento }}
          </p>
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
          <p class="erro-campo">
            {{ mensaxes.telefono }}
          </p>
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
          <p class="erro-campo">
            {{ mensaxes.correo }}
          </p>
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
          <p class="erro-campo">
            {{ mensaxes.direccion }}
          </p>
        </div>
        <div class="campo campo-municipio">
          <label>Municipio:</label>
          <input
            v-model="novoPaciente.municipio"
            type="text"
            required
            :class="{ 'input-error': erros.municipio }"
            @blur="validarCampo('municipio')"
          />
          <p class="erro-campo">
            {{ mensaxes.municipio }}
          </p>
        </div>
        <div class="campo campo-provincia">
          <label>Provincia:</label>
          <select
            v-model="novoPaciente.provincia"
            required
            :class="{ 'input-error': erros.provincia }"
            @blur="validarCampo('provincia')"
          >
            <option value="" disabled>Selecciona provincia</option>
            <option
              v-for="provincia in provincias"
              :key="provincia.id"
              :value="provincia.id"
            >
              {{ provincia.nombre }}
            </option>
          </select>
          <p class="erro-campo">
            {{ mensaxes.provincia }}
          </p>
        </div>
      </div>

      <button type="submit" class="btn-guardar">Gardar</button>
    </form>

    <h4>Listaxe de pacientes</h4>

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
            <td>{{ u.provincia }}</td>
            <td style="text-align: center" class="acciones">
              <button @click="editarUsuario(index)" title="Editar">
                Editar
              </button>
              <button @click="eliminarUsuario(index)" title="Eliminar">
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
import { ref, reactive, onMounted } from "vue";

const pacientes = ref([]);
const provincias = ref([]);

// Erros (true/false para pintar el input de rosa)
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

// Mensaxes de erro (texto que se muestra debajo del campo)
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

onMounted(() => {
  pacientes.value = [
    {
      dni: "A000000C",
      nome: "Soldaduras SL",
      apelidos: "-",
      fecha_nacimiento: "2000-01-01",
      telefono: "981123456",
      correo: "soldadura@email.com",
      direccion: "Rua da Industria, 1",
      municipio: "Santiago",
      provincia: "A Coruña",
    },
  ];

  provincias.value = [
    { id: "1", nombre: "A Coruña" },
    { id: "2", nombre: "Lugo" },
    { id: "3", nombre: "Ourense" },
    { id: "4", nombre: "Pontevedra" },
  ];

});

// Valida DNI (letra real), NIE y CIF (formato basico)
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

// Poner la primera letra de cada palabra en mayuscula
function capitalizar(campo) {
  const v = novoPaciente[campo];
  if (!v) return;
  novoPaciente[campo] = v
    .toLowerCase()
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

// Valida un campo concreto y guarda el mensaje de error si lo hay
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

// Valida todos los campos y guarda si todo esta correcto
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

function eliminarUsuario(index) {
  pacientes.value.splice(index, 1);
}

function editarUsuario(index) {
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
  background: white;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

/* Cada campo: label + input en la misma linea, mensaje debajo */
/* height fija para que todos midan lo mismo y no se descuadren */
.campo {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  height: 3.2rem;
  overflow: hidden;
}

/* El mensaje se pone debajo, ocupando el ancho completo */
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
  flex: 3;
}
.campo-municipio {
  flex: 2;
}
.campo-provincia {
  flex: 1.8;
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
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0;
  box-sizing: border-box;
}

/* Fondo rosa para los inputs con error */
.input-error {
  background-color: #ffd6e0 !important;
  border: 1px solid #ff4d6d !important;
}

.btn-guardar {
  background-color: #39af49;
  color: white;
  border: none;
  padding: 0.5rem 2rem;
  cursor: pointer;
  margin: 0 auto;
  display: block;
  font-size: 1rem;
}

.btn-guardar:hover {
  background-color: #24a84cdc;
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
  border: 1px solid #ddd;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
  white-space: nowrap;
}

th {
  text-align: center;
  background-color: #f8f9fa;
}

h4 {
  margin-bottom: 1rem;
  font-weight: 600;
  background-color: #34a33a;
  color: white;
  padding: 0.5rem;
}

.acciones button {
  background: none;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 0.7rem;
  margin: 0 0.2rem;
  padding: 0.2rem 0.4rem;
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
