const { crearHU, obtenerHU, __clearStore } = require('../src/historiaUsuario.service');

describe('Historia de Usuario Service', () => {
  beforeEach(() => { __clearStore(); });

  test('T1 — retorna false si título está vacío', () => {
    expect(crearHU({ titulo: '', descripcion: 'Desc', puntos: 3 })).toBe(false);
  });
  test('T2 — retorna false si descripción está vacía', () => {
    expect(crearHU({ titulo: 'HU válida', descripcion: '', puntos: 5 })).toBe(false);
  });
  test('T3 — retorna false si puntos es 0', () => {
    expect(crearHU({ titulo: 'HU válida', descripcion: 'Desc', puntos: 0 })).toBe(false);
  });
  test('T4 — retorna false si puntos no pertenece a Fibonacci [1,2,3,5,8]', () => {
    expect(crearHU({ titulo: 'HU válida', descripcion: 'Desc', puntos: 4 })).toBe(false);
  });
  test('T5 — retorna false si el título está duplicado', () => {
    crearHU({ titulo: 'HU duplicada', descripcion: 'Desc', puntos: 2 });
    expect(crearHU({ titulo: 'HU duplicada', descripcion: 'Desc2', puntos: 1 })).toBe(false);
  });
  test('T6 — retorna true con todos los datos válidos', () => {
    expect(crearHU({ titulo: 'HU-006 Pago', descripcion: 'Desc', puntos: 5 })).toBe(true);
  });
  test('T7 — obtenerHU retorna el objeto guardado tras crearHU', () => {
    crearHU({ titulo: 'HU-006 Pago', descripcion: 'Desc', puntos: 8 });
    expect(obtenerHU('HU-006 Pago')).not.toBeNull();
  });
});