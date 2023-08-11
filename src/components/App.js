import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import WelcomeContent from './welcome/WelcomeContent';
import LoginContent from './login/LoginContent';
import SignUpContent from "./signup/SignUpContent";
import { AuthProvider } from "./AuthProvider";
import SearchContent from "./search/SearchContent";
import AuthorContent from "./author/AuthorContent";

function App() {
  return (
    <div style={{ minHeight: "100%" }}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomeContent />} />
            <Route path="/login" element={<LoginContent />} />
            <Route path="/signup" element={<SignUpContent />} />
            <Route path="/search" element={<SearchContent />} />
            <Route path="/author/:author" element={<AuthorContent />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
