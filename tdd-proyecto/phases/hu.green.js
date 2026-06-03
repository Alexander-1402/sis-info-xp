// ============================================================
// FASE VERDE — implementación mínima para pasar los tests
// Copiar este contenido a src/historiaUsuario.service.js
// ============================================================

const _store = [];
const PUNTOS_VALIDOS = [1, 2, 3, 5, 8];

function crearHU(datos) {
  const { titulo, descripcion, puntos } = datos;

  if (!titulo) return false;
  if (!descripcion) return false;
  if (!PUNTOS_VALIDOS.includes(puntos)) return false;
  if (_store.some(h => h.titulo === titulo)) return false;

  _store.push({ titulo, descripcion, puntos });
  return true;
}

function obtenerHU(titulo) {
  return _store.find(h => h.titulo === titulo) || null;
}

function __clearStore() {
  _store.length = 0;
}

module.exports = { crearHU, obtenerHU, __clearStore };
