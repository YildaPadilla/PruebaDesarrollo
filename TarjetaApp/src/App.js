import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListarTarjetas  from './Components/ListarTarjetas';
import AgregarTarjeta  from './Components/AgregarTarjeta';
function App() {
  return (
    <div>
      <Router>
        <ul>
          <li><a class="active" href="/">Home</a></li>
          <li><a href=""><Link to="/ListarTarjetas">Listar Tarjetas</Link></a></li> 
          <li><a href=""><Link to="/AgregarTarjeta">Agregar Tarjeta</Link></a></li> 
        </ul>
        
        <Routes>
          <Route exact path="/ListarTarjetas" element={<ListarTarjetas />} />
          <Route exact path="/AgregarTarjeta" element={<AgregarTarjeta />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
