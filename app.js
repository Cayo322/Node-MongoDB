// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Cliente = require('./models/cliente');
const Producto = require('./models/producto'); // Agregar esta línea

const app = express();
const PORT = 3000;

// Configuración de Mongoose
mongoose.connect('mongodb://localhost:27017/tienda', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error de conexión a MongoDB:', error);
});

app.get('/', (req, res) => {
    res.render('index');
  });

// Configuración de Express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.get('/mostrar-clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.render('mostrarClientes', { clientes });
  } catch (error) {
    console.error('Error al recuperar clientes:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/agregar-cliente', (req, res) => {
  res.render('agregarCliente');
});

app.post('/guardar-cliente', async (req, res) => {
  const { nombre, correo, dni } = req.body;

  try {
    const nuevoCliente = new Cliente({
      nombre,
      correo,
      dni
    });

    await nuevoCliente.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error al guardar el cliente:', error);
    res.status(500).send('Error interno del servidor');
  }
});
app.get('/mostrar-productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.render('mostrarProductos', { productos });
  } catch (error) {
    console.error('Error al recuperar productos:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/agregar-producto', (req, res) => {
  res.render('agregarProducto');
});

app.post('/guardar-producto', async (req, res) => {
  const { descripcion, categoria, stock, marca, punitario } = req.body;

  try {
    const nuevoProducto = new Producto({
      descripcion,
      categoria,
      stock,
      marca,
      punitario
    });

    await nuevoProducto.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    res.status(500).send('Error interno del servidor');
  }
});
app.get('/buscar-productos', async (req, res) => {
  try {
    // Obtener la cadena de búsqueda del parámetro "busqueda" en la consulta
    const busqueda = req.query.busqueda || '';

    // Utilizar expresiones regulares para hacer la búsqueda insensible a mayúsculas
    const regex = new RegExp(busqueda, 'i');

    // Realizar la consulta en la base de datos
    const productos = await Producto.find({
      $or: [
        { descripcion: { $regex: regex } },
        { categoria: { $regex: regex } },
        // Agrega más campos según tus necesidades de búsqueda
      ]
    });

    // Renderizar la vista mostrarProductos con los productos filtrados
    res.render('mostrarProductos', { productos });
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).send('Error interno del servidor');
  }
});
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
