import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import WelcomeContent from './welcome/WelcomeContent';
import LoginContent from './login/LoginContent';

function App() {
  return (
    <div style={{ minHeight: "100%" }}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeContent />} />
          <Route path="/login" element={<LoginContent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
