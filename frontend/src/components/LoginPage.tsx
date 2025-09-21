import React, { useState } from 'react';
import { login, getCurrentUser } from '../services/api';

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [status, setStatus] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      const me = await getCurrentUser();
      setStatus(`Logged in as ${me.username}`);
    } catch {
      setStatus('Login failed');
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 480 }}>
      <h2 className="mb-3">Login</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input name="username" className="form-control" onChange={onChange} value={form.username} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" onChange={onChange} value={form.password} />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
      {status && <div className="alert alert-info mt-3">{status}</div>}
    </div>
  );
};

export default LoginPage;