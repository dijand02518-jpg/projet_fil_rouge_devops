import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../api';

export default function Profile({ onLogout }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getProfile()
      .then((p) => setForm({ name: p.name, email: p.email, password: '' }))
      .catch((err) => {
        setError(err.message);
        onLogout();
      });
  }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const p = await updateProfile(form);
      setForm({ name: p.name, email: p.email, password: '' });
      setMessage('Profil mis à jour');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <h2>Mon profil</h2>
      <input name="name" placeholder="Nom" value={form.name} onChange={change} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
      <input name="password" type="password" placeholder="Nouveau mot de passe (facultatif)" value={form.password} onChange={change} />
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <button type="submit">Enregistrer</button>
      <button type="button" className="link" onClick={onLogout}>Se déconnecter</button>
    </form>
  );
}
