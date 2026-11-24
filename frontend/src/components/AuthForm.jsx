import { useState } from 'react';
import { login, register } from '../api';

export default function AuthForm({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'register') await register(form);
      const { token } = await login({ email: form.email, password: form.password });
      onLogin(token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h2>{mode === 'login' ? 'Connexion' : 'Créer un compte'}</h2>
      {mode === 'register' && (
        <input name="name" placeholder="Nom" value={form.name} onChange={change} required />
      )}
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
      <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={change} required />
      {error && <p className="error">{error}</p>}
      <button type="submit">{mode === 'login' ? 'Se connecter' : "S'inscrire"}</button>
      <button type="button" className="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Pas de compte ? Créer un compte' : 'Déjà un compte ? Se connecter'}
      </button>
    </form>
  );
}
