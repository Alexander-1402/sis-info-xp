// ============================================================
// FASE REFACTOR — misma lógica, código limpio y mantenible
// Copiar este contenido a src/crc.service.js para fase refactor
// ============================================================

const _store = [];
const TIPOS_VALIDOS = ['activa', 'pasiva'];

function _validarDatos({ nombre, tipo, responsabilidades }) {
  if (!nombre?.trim()) return 'El nombre no puede estar vacío';
  if (!TIPOS_VALIDOS.includes(tipo)) return 'El tipo debe ser "activa" o "pasiva"';
  if (!responsabilidades?.length) return 'Debe tener al menos una responsabilidad';
  if (new Set(responsabilidades).size !== responsabilidades.length)
    return 'Las responsabilidades no pueden estar duplicadas';
  return null;
}

function crearCRC(datos) {
  if (_validarDatos(datos)) return false;
  const { nombre, tipo, responsabilidades, colaboradores = [] } = datos;
  _store.push({ nombre: nombre.trim(), tipo, responsabilidades, colaboradores });
  return true;
}

function obtenerCRC(nombre) {
  return _store.find(c => c.nombre === nombre) ?? null;
}

function __clearStore() {
  _store.length = 0;
}

module.exports = { crearCRC, obtenerCRC, __clearStore };
