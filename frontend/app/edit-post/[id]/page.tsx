'use client'

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/app/components/Layout';
import api from '@/app/services/api';

export default function EditPost() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setErrorMsg('Título y contenido son requeridos');
      return;
    }
    try {
      await api.put(`/posts/${id}`, { title, content });
      router.push('/');
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Error al actualizar publicación');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Editar Publicación</h1>
        {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
        <form onSubmit={handleUpdate} className="space-y-4">
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
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2">Actualizar</button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}