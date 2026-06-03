import { useState, useEffect } from 'react';

export default function CRCList() {
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/crc')
      .then(r => r.json())
      .then(data => {
       setTarjetas(Array.isArray(data) ? data : []);
  
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudieron cargar las tarjetas.');
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
        Tarjetas CRC registradas
        <span className="list-count">{tarjetas.length} tarjeta{tarjetas.length !== 1 ? 's' : ''}</span>
      </div>

      {tarjetas.length === 0 ? (
        <div className="table-wrapper">
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <p>No hay tarjetas CRC aún.<br />Crea la primera usando el formulario.</p>
          </div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Responsabilidades</th>
                <th>Colaboradores</th>
              </tr>
            </thead>
            <tbody>
              {tarjetas.map((t, i) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-muted)', width: 36 }}>{i + 1}</td>
                  <td style={{ fontWeight: 500 }}>{t.nombre}</td>
                  <td>
                    <span className={`badge badge-${t.tipo}`}>{t.tipo}</span>
                  </td>
                  <td>
                    {t.responsabilidades.map((r, j) => (
                      <span key={j} className="tag-mini">{r}</span>
                    ))}
                  </td>
                  <td>
                    {t.colaboradores.length === 0 ? (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
                    ) : (
                      t.colaboradores.map((c, j) => (
                        <span key={j} className="tag-mini">{c}</span>
                      ))
                    )}
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
