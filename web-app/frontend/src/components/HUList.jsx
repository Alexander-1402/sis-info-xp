import { useState, useEffect } from 'react';

export default function HUList() {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/hu')
      .then(r => r.json())
      .then(data => {
        setHistorias(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudieron cargar las historias.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <span className="spinner" style={{ borderTopColor: 'var(--accent)', borderColor: 'var(--border)', width: 24, height: 24 }} />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div>
      <div className="list-header">
        Historias de Usuario registradas
        <span className="list-count">{historias.length} historia{historias.length !== 1 ? 's' : ''}</span>
      </div>

      {historias.length === 0 ? (
        <div className="table-wrapper">
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p>No hay historias de usuario aún.<br />Crea la primera usando el formulario.</p>
          </div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {historias.map((h, i) => (
                <tr key={h.id}>
                  <td style={{ color: 'var(--text-muted)', width: 36 }}>{i + 1}</td>
                  <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{h.titulo}</td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: 320 }}>{h.descripcion}</td>
                  <td>
                    <span className="badge badge-puntos">{h.puntos} pt{h.puntos !== 1 ? 's' : ''}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
