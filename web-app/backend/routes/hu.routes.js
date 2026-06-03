const express = require('express');
const router = express.Router();
const db = require('../db');

const PUNTOS_FIBONACCI = [1, 2, 3, 5, 8];

router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, puntos } = req.body;

    if (!titulo?.trim())
      return res.status(400).json({ error: 'El título no puede estar vacío' });
    if (!descripcion?.trim())
      return res.status(400).json({ error: 'La descripción no puede estar vacía' });
    if (!PUNTOS_FIBONACCI.includes(Number(puntos)))
      return res.status(400).json({ error: 'Los puntos deben ser valores Fibonacci: 1, 2, 3, 5 u 8' });

    try {
      const [result] = await db.execute(
        'INSERT INTO historias_usuario (titulo, descripcion, puntos) VALUES (?, ?, ?)',
        [titulo.trim(), descripcion.trim(), Number(puntos)]
      );
      res.status(201).json({
        id: result.insertId,
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        puntos: Number(puntos),
      });
    } catch (dbErr) {
      if (dbErr.code === 'ER_DUP_ENTRY')
        return res.status(400).json({ error: 'Ya existe una historia de usuario con ese título' });
      throw dbErr;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM historias_usuario ORDER BY fecha_creacion DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
