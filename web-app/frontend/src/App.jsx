import { useState } from 'react';
import CRCForm from './components/CRCForm';
import CRCList from './components/CRCList';
import HUForm from './components/HUForm';
import HUList from './components/HUList';

export default function App() {
  const [tab, setTab] = useState('crc');
  const [crcKey, setCrcKey] = useState(0);
  const [huKey, setHuKey] = useState(0);

  return (
    <div className="app">
      <header className="header">
        <h1>SIS-INFO</h1>
        <p className="header-subtitle">Gestión de Tarjetas CRC e Historias de Usuario — XP + TDD</p>
      </header>

      <nav className="nav">
        <button
          className={`nav-tab ${tab === 'crc' ? 'active' : ''}`}
          onClick={() => setTab('crc')}
        >
          Tarjetas CRC
        </button>
        <button
          className={`nav-tab ${tab === 'hu' ? 'active' : ''}`}
          onClick={() => setTab('hu')}
        >
          Historias de Usuario
        </button>
      </nav>

      <main className="main">
        {tab === 'crc' && (
          <div className="module">
            <CRCForm onCreated={() => setCrcKey(k => k + 1)} />
            <CRCList key={crcKey} />
          </div>
        )}
        {tab === 'hu' && (
          <div className="module">
            <HUForm onCreated={() => setHuKey(k => k + 1)} />
            <HUList key={huKey} />
          </div>
        )}
      </main>
    </div>
  );
}
