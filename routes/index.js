const express = require('express');
const ModelTienda = require('../models/producto');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const productos = await ModelTienda.find();
        res.status(200).json(productos);   
    } catch (error) {
        console.error('Error al optener los productos', error);
        res.status(500).json({error: 'Hubo un problema al obtener los productos.'})
    }
})

module.exports = router;