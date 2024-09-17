const mongoose = require('mongoose');

const tiendaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    precio: {
        type: Number,
        required: true,
    },
});

const ModelTienda = mongoose.model('productos', tiendaSchema);

module.exports = ModelTienda;