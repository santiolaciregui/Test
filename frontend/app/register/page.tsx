'use client'
import { useState, FormEvent } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('Todos los campos son requeridos');
      return;
    }
    try {
      await api.post('/auth/register', { name, email, password });
      router.push('/login');
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Error al registrar usuario');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Registro</h1>
        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="border p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Contraseña</label>
            <input
              type="password"
              className="border p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2">Registrarse</button>
        </form>
      </div>
    </Layout>
  );
}