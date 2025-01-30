'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/app/components/Layout';
import api from '@/app/services/api';

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setErrorMsg('Título y contenido son requeridos');
      return;
    }
    try {
      await api.post('/posts', { title, content });
      router.push('/');
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Error al crear publicación');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Nueva Publicación</h1>
        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block mb-1">Título</label>
            <input
              type="text"
              className="border p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1">Contenido</label>
            <textarea
              className="border p-2 w-full"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2">Publicar</button>
        </form>
      </div>
    </Layout>
  );
}