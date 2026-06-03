import { useState } from 'react';

export default function CRCForm({ onCreated }) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('activa');
  const [responsabilidades, setResponsabilidades] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [inputResp, setInputResp] = useState('');
  const [inputColab, setInputColab] = useState('');
  const [loading, setLoading] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const agregarResp = () => {
    const val = inputResp.trim();
    if (!val) return;
    if (responsabilidades.includes(val)) {
      setAlerta({ tipo: 'error', texto: 'Esa responsabilidad ya fue agregada.' });
      return;
    }
    setResponsabilidades([...responsabilidades, val]);
    setInputResp('');
  };

  const agregarColab = () => {
    const val = inputColab.trim();
    if (!val || colaboradores.includes(val)) return;
    setColaboradores([...colaboradores, val]);
    setInputColab('');
  };

  const handleKeyResp = (e) => { if (e.key === 'Enter') { e.preventDefault(); agregarResp(); } };
  const handleKeyColab = (e) => { if (e.key === 'Enter') { e.preventDefault(); agregarColab(); } };

  const resetForm = () => {
    setNombre('');
    setTipo('activa');
    setResponsabilidades([]);
    setColaboradores([]);
    setInputResp('');
    setInputColab('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta(null);
    setLoading(true);

    try {
      const res = await fetch('/api/crc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, tipo, responsabilidades, colaboradores }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAlerta({ tipo: 'error', texto: data.error });
      } else {
        setAlerta({ tipo: 'success', texto: `Tarjeta CRC "${data.nombre}" creada correctamente.` });
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
        <span className="card-title-icon">📋</span>
        Nueva Tarjeta CRC
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nombre de la clase</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ej: Clase Factura"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tipo</label>
          <select
            className="form-input"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
          >
            <option value="activa">Activa — inicia interacciones</option>
            <option value="pasiva">Pasiva — responde a solicitudes</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Responsabilidades</label>
          <div className="tag-input-row">
            <input
              className="form-input"
              type="text"
              placeholder="Agregar responsabilidad..."
              value={inputResp}
              onChange={e => setInputResp(e.target.value)}
              onKeyDown={handleKeyResp}
            />
            <button type="button" className="btn btn-secondary" onClick={agregarResp}>
              + Agregar
            </button>
          </div>
          {responsabilidades.length > 0 && (
            <div className="tag-list">
              {responsabilidades.map((r, i) => (
                <span key={i} className="tag-item">
                  {r}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => setResponsabilidades(responsabilidades.filter((_, j) => j !== i))}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Colaboradores <span>(opcional — vacío si es clase independiente)</span>
          </label>
          <div className="tag-input-row">
            <input
              className="form-input"
              type="text"
              placeholder="Agregar colaborador..."
              value={inputColab}
              onChange={e => setInputColab(e.target.value)}
              onKeyDown={handleKeyColab}
            />
            <button type="button" className="btn btn-secondary" onClick={agregarColab}>
              + Agregar
            </button>
          </div>
          {colaboradores.length > 0 && (
            <div className="tag-list">
              {colaboradores.map((c, i) => (
                <span key={i} className="tag-item">
                  {c}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => setColaboradores(colaboradores.filter((_, j) => j !== i))}
                    title="Eliminar"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="spinner" /> : null}
          {loading ? 'Guardando...' : 'Crear Tarjeta CRC'}
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
