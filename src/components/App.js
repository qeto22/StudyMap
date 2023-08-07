import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import WelcomeContent from './welcome/WelcomeContent';
import LoginContent from './login/LoginContent';
import { AuthProvider } from "./AuthProvider";
import SearchContent from "./search/SearchContent";

function App() {
  return (
    <div style={{ minHeight: "100%" }}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomeContent />} />
            <Route path="/login" element={<LoginContent />} />
            <Route path="/search" element={<SearchContent />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
