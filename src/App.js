import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FootballLineup from './components/FootballLineup';

function App() {
  return (
    <div className="App">
      <div className="container-fluid py-4">
        <h1 className="text-center mb-4 text-white">Football Team Lineup</h1>
        <FootballLineup />
      </div>
      
     </div>
  );
}

export default App;
