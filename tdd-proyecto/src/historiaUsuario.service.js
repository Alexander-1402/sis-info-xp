const _store = [];
const PUNTOS_FIBONACCI = [1, 2, 3, 5, 8];

function _validarDatos({ titulo, descripcion, puntos }) {
  if (!titulo?.trim()) return 'El título no puede estar vacío';
  if (!descripcion?.trim()) return 'La descripción no puede estar vacía';
  if (!PUNTOS_FIBONACCI.includes(puntos))
    return `Los puntos deben ser valores Fibonacci: ${PUNTOS_FIBONACCI.join(', ')}`;
  if (_store.some(h => h.titulo === titulo)) return 'Ya existe una historia con ese título';
  return null;
}

function crearHU(datos) {
  if (_validarDatos(datos)) return false;
  const { titulo, descripcion, puntos } = datos;
  _store.push({ titulo: titulo.trim(), descripcion: descripcion.trim(), puntos });
  return true;
}

function obtenerHU(titulo) {
  return _store.find(h => h.titulo === titulo) ?? null;
}

function __clearStore() {
  _store.length = 0;
}

module.exports = { crearHU, obtenerHU, __clearStore };