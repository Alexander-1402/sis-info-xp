const { crearCRC, obtenerCRC, __clearStore } = require('../src/crc.service');

describe('CRC Service', () => {
  beforeEach(() => {
    __clearStore();
  });

  test('T1 — retorna false si nombre está vacío', () => {
    const resultado = crearCRC({
      nombre: '',
      tipo: 'activa',
      responsabilidades: ['Gestionar pedidos'],
      colaboradores: [],
    });
    expect(resultado).toBe(false);
  });

  test('T2 — retorna false si tipo no es activa ni pasiva', () => {
    const resultado = crearCRC({
      nombre: 'Clase Pedido',
      tipo: 'invalido',
      responsabilidades: ['Gestionar pedidos'],
      colaboradores: [],
    });
    expect(resultado).toBe(false);
  });

  test('T3 — retorna false si responsabilidades está vacío', () => {
    const resultado = crearCRC({
      nombre: 'Clase Pedido',
      tipo: 'activa',
      responsabilidades: [],
      colaboradores: [],
    });
    expect(resultado).toBe(false);
  });

  test('T4 — retorna false si hay responsabilidades duplicadas', () => {
    const resultado = crearCRC({
      nombre: 'Clase Pedido',
      tipo: 'activa',
      responsabilidades: ['Gestionar pedidos', 'Gestionar pedidos'],
      colaboradores: [],
    });
    expect(resultado).toBe(false);
  });

  test('T5 — retorna true si colaboradores está vacío (clase independiente válida)', () => {
    const resultado = crearCRC({
      nombre: 'ClaseIndependiente',
      tipo: 'activa',
      responsabilidades: ['Calcular total'],
      colaboradores: [],
    });
    expect(resultado).toBe(true);
  });

  test('T6 — retorna true con todos los datos válidos', () => {
    const resultado = crearCRC({
      nombre: 'Clase Factura',
      tipo: 'pasiva',
      responsabilidades: ['Almacenar datos', 'Calcular impuesto'],
      colaboradores: ['Clase Cliente', 'Clase Producto'],
    });
    expect(resultado).toBe(true);
  });

  test('T7 — obtenerCRC retorna el objeto guardado tras crearCRC', () => {
    crearCRC({
      nombre: 'Clase Inventario',
      tipo: 'activa',
      responsabilidades: ['Controlar stock'],
      colaboradores: ['Clase Producto'],
    });
    const resultado = obtenerCRC('Clase Inventario');
    expect(resultado).not.toBeNull();
    expect(resultado.nombre).toBe('Clase Inventario');
    expect(resultado.tipo).toBe('activa');
  });
});
