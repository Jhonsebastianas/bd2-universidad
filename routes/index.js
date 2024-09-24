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

// Crear un nuevo producto
router.post("/guardar", async (req, res) => {
    try {
        const { nombre, precio } = req.body;
        
        if (!nombre || typeof nombre !== 'string') {
            return res.status(400).json({error: 'El campo "nombre" es obligatorio y debe ser cadena de texto'});
        }

        if (precio == null || typeof precio !== 'number') {
            return res.status(400).json({error: 'El campo "precio" es obligatorio y debe ser númerico'});
        }

        const nuevoProducto = new ModelTienda({ nombre, precio });
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        console.error('Error al crear el producto', error);
        res.status(500).json({error: 'Hubo un problema al crear el producto.'});
    }
});

// Actualizar un producto existente
router.put("/actualizar/:id", async (req, res) => {
    try {
        const { nombre, precio } = req.body;

        if (!nombre || typeof nombre !== 'string') {
            return res.status(400).json({error: 'El campo "nombre" es obligatorio y debe ser cadena de texto'});
        }

        if (precio == null || typeof precio !== 'number') {
            return res.status(400).json({error: 'El campo "precio" es obligatorio y debe ser númerico'});
        }

        const productoActualizado = await ModelTienda.findByIdAndUpdate(
            req.params.id,
            { nombre, precio },
            { new: true } // Retorna el documento actualizado
        );

        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error('Error al actualizar el producto', error);
        res.status(500).json({error: 'Hubo un problema al actualizar el producto.'});
    }
});

// Eliminar un producto
router.delete("/eliminar/:id", async (req, res) => {
    try {
        const productoEliminado = await ModelTienda.findByIdAndDelete(req.params.id);

        if (!productoEliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el producto', error);
        res.status(500).json({error: 'Hubo un problema al eliminar el producto.'});
    }
});



module.exports = router;