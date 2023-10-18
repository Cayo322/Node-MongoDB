const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  descripcion: String,
  categoria: String,
  stock: Number,
  marca: String,
  punitario: Number,
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
