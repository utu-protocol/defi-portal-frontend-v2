import { useEffect } from 'react';
import { EVENT_UTU_CONFIG, SDK_ENV } from './Config';
import AuthProvider from './providers/Auth';
import Router from './router/Router';
import './styles/globals.css';
function App() {
  useEffect(() => {
    console.log('SDK_ENV', SDK_ENV);
    if (SDK_ENV === 'production') {
      window.dispatchEvent(new CustomEvent(EVENT_UTU_CONFIG, {
        detail: {
          production: true,
        }
      }));
    }
  }, [])
  return (
    <AuthProvider>
      <div className="App">
        <Router />
      </div>
    </AuthProvider>
  );
}

export default App;
