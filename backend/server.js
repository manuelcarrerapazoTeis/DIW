import express from 'express'
import fs from 'fs'
import cors from 'cors' //Evita bloqueo entre servidores

// Creamos la aplicación Express
const app = express()
app.use(cors()) 

// Ruta de la API para obtener provincias y municipios
app.get('/api/municipios', (req, res) => {
    console.log("Petición recibida")

    // Leemos el archivo JSON
    const datos = fs.readFileSync(
        './backend/data/municipios.json',
        'utf8'
    )

    // Convertimos el contenido del archivo JSON a un objeto JavaScript
    const datosJson = JSON.parse(datos)

    // Enviamos los datos como respuesta al cliente
    res.json(datosJson)
})

// Iniciamos el servidor en el puerto indicado
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
