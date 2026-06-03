import { useState } from 'react';

const PUNTOS = [1, 2, 3, 5, 8];

export default function HUForm({ onCreated }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [puntos, setPuntos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const resetForm = () => {
    setTitulo('');
    setDescripcion('');
    setPuntos(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta(null);
    setLoading(true);

    try {
      const res = await fetch('/api/hu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descripcion, puntos }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAlerta({ tipo: 'error', texto: data.error });
      } else {
        setAlerta({ tipo: 'success', texto: `Historia "${data.titulo}" creada correctamente.` });
        resetForm();
        onCreated();
      }
    } catch {
      setAlerta({ tipo: 'error', texto: 'No se pudo conectar con el servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-title">
        <span className="card-title-icon">📝</span>
        Nueva Historia de Usuario
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Título</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ej: HU-001 Iniciar sesión"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-input"
            placeholder="Como [usuario] quiero [acción] para [beneficio]..."
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Puntos de historia <span>(Fibonacci)</span></label>
          <div className="puntos-group">
            {PUNTOS.map(p => (
              <label key={p} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                  type="radio"
                  className="puntos-option"
                  name="puntos"
                  value={p}
                  checked={puntos === p}
                  onChange={() => setPuntos(p)}
                />
                <span className="puntos-label">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="spinner" /> : null}
          {loading ? 'Guardando...' : 'Crear Historia de Usuario'}
        </button>

        {alerta && (
          <div className={`alert alert-${alerta.tipo}`}>
            {alerta.tipo === 'success' ? '✓' : '✕'} {alerta.texto}
          </div>
        )}
      </form>
    </div>
  );
}
