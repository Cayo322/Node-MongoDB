const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  fecha: Date,
  cliente: {
    codigo: String,
    nombre: String,
    importe: Number,
  },
  items: [
    {
      producto: String,
      descripcion: String,
      punitario: Number,
      cantidad: Number,
      total: Number,
    }
  ],
});

const Venta = mongoose.model('Venta', ventaSchema);

module.exports = Venta;
