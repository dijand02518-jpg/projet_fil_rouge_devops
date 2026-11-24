import { useState } from 'react';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (t) => {
    localStorage.setItem('token', t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="container">
      <h1>Mon espace</h1>
      {token ? <Profile onLogout={handleLogout} /> : <AuthForm onLogin={handleLogin} />}
    </div>
  );
}
