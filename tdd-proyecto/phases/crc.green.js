// ============================================================
// FASE VERDE — implementación mínima para pasar los tests
// Copiar este contenido a src/crc.service.js para fase verde
// ============================================================

const _store = [];

function crearCRC(datos) {
  const { nombre, tipo, responsabilidades, colaboradores } = datos;

  if (!nombre) return false;
  if (!['activa', 'pasiva'].includes(tipo)) return false;
  if (!responsabilidades || responsabilidades.length === 0) return false;
  if (new Set(responsabilidades).size !== responsabilidades.length) return false;

  _store.push({ nombre, tipo, responsabilidades, colaboradores: colaboradores || [] });
  return true;
}

function obtenerCRC(nombre) {
  return _store.find(c => c.nombre === nombre) || null;
}

function __clearStore() {
  _store.length = 0;
}

module.exports = { crearCRC, obtenerCRC, __clearStore };
