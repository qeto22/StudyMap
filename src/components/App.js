import './App.css';
import NavigationBar from './navbar/NavigationBar';
import WelcomeContent from './welcome/WelcomeContent';

function App() {
  return (
    <div style={{minHeight: "100%"}}>
      <NavigationBar />
      <WelcomeContent />
    </div>
  );
}

export default App;
