const express = require('express');
const router = express.Router();
const db = require('../db');

const TIPOS_VALIDOS = ['activa', 'pasiva'];

router.post('/', async (req, res) => {
  try {
    const { nombre, tipo, responsabilidades, colaboradores = [] } = req.body;

    if (!nombre?.trim())
      return res.status(400).json({ error: 'El nombre no puede estar vacío' });
    if (!TIPOS_VALIDOS.includes(tipo))
      return res.status(400).json({ error: 'El tipo debe ser "activa" o "pasiva"' });
    if (!Array.isArray(responsabilidades) || responsabilidades.length === 0)
      return res.status(400).json({ error: 'Debe tener al menos una responsabilidad' });
    if (new Set(responsabilidades).size !== responsabilidades.length)
      return res.status(400).json({ error: 'Las responsabilidades no pueden estar duplicadas' });

    const [result] = await db.execute(
      'INSERT INTO tarjetas_crc (nombre, tipo, responsabilidades, colaboradores) VALUES (?, ?, ?, ?)',
      [nombre.trim(), tipo, JSON.stringify(responsabilidades), JSON.stringify(colaboradores)]
    );

    res.status(201).json({
      id: result.insertId,
      nombre: nombre.trim(),
      tipo,
      responsabilidades,
      colaboradores,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM tarjetas_crc ORDER BY fecha_creacion DESC'
    );
    const parseJSON = (val, fallback = []) => {
      if (val == null) return fallback;
      if (typeof val !== 'string') return val;
      return JSON.parse(val);
    };
    const tarjetas = rows.map(row => ({
      ...row,
      responsabilidades: parseJSON(row.responsabilidades),
      colaboradores: parseJSON(row.colaboradores),
    }));
    res.json(tarjetas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
