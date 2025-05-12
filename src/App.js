import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FootballLineup from './components/FootballLineup';
import VS from './components/VS/VS';
import { useState, useEffect } from 'react';

function App() {
  const [mode, setMode] = useState('default');

  useEffect(() => {
    // Get the mode from URL parameters
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get('mode');
    setMode(urlMode || 'default');
  }, []);

  return (
    <div className="App">
      <div className="container-fluid py-4">
        <h1 className="text-center mb-4 text-white">Football Team Lineup</h1>
        {mode === 'vs' ? <VS /> : <FootballLineup />}
      </div>
    </div>
  );
}

export default App;
