const { crearHU, obtenerHU, __clearStore } = require('../src/historiaUsuario.service');

describe('Historia de Usuario Service', () => {
  beforeEach(() => {
    __clearStore();
  });

  test('T1 — retorna false si título está vacío', () => {
    const resultado = crearHU({
      titulo: '',
      descripcion: 'Como usuario quiero iniciar sesión',
      puntos: 3,
    });
    expect(resultado).toBe(false);
  });

  test('T2 — retorna false si descripción está vacía', () => {
    const resultado = crearHU({
      titulo: 'HU-001 Login',
      descripcion: '',
      puntos: 3,
    });
    expect(resultado).toBe(false);
  });

  test('T3 — retorna false si puntos es 0', () => {
    const resultado = crearHU({
      titulo: 'HU-002 Registro',
      descripcion: 'Como usuario quiero registrarme',
      puntos: 0,
    });
    expect(resultado).toBe(false);
  });

  test('T4 — retorna false si puntos no pertenece a Fibonacci [1,2,3,5,8]', () => {
    const resultado = crearHU({
      titulo: 'HU-003 Perfil',
      descripcion: 'Como usuario quiero editar mi perfil',
      puntos: 4,
    });
    expect(resultado).toBe(false);
  });

  test('T5 — retorna false si el título está duplicado', () => {
    crearHU({
      titulo: 'HU-DUPLICADO',
      descripcion: 'Primera historia',
      puntos: 2,
    });
    const resultado = crearHU({
      titulo: 'HU-DUPLICADO',
      descripcion: 'Segunda historia con mismo título',
      puntos: 5,
    });
    expect(resultado).toBe(false);
  });

  test('T6 — retorna true con todos los datos válidos', () => {
    const resultado = crearHU({
      titulo: 'HU-005 Carrito',
      descripcion: 'Como usuario quiero agregar productos al carrito de compras',
      puntos: 5,
    });
    expect(resultado).toBe(true);
  });

  test('T7 — obtenerHU retorna el objeto guardado tras crearHU', () => {
    crearHU({
      titulo: 'HU-006 Pago',
      descripcion: 'Como usuario quiero realizar el pago en línea',
      puntos: 8,
    });
    const resultado = obtenerHU('HU-006 Pago');
    expect(resultado).not.toBeNull();
    expect(resultado.titulo).toBe('HU-006 Pago');
    expect(resultado.puntos).toBe(8);
  });
});
