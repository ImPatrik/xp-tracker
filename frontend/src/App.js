import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import XP from './pages/XP';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-background">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/xp" element={<XP />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
