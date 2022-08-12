import AuthProvider from './providers/Auth';
import Router from './router/Router';
import './styles/globals.css';
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App;
