'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/services/api';
import Layout from '@/app/components/Layout';

interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
  created_at: string;
}

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        console.log('API Response:', response.data);
        setPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setErrorMsg('Error fetching posts. Please try again.');
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserId(res.data.user.id);
        })
        .catch(() => setUserId(null));
    }
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) return;
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error eliminando publicación:', error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Publicaciones</h1>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md p-4 mb-4 rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            {userId !== null && userId === post.user_id && (
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => router.push(`/edit-post/${post.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No hay publicaciones aún.</p>
      )}
    </Layout>
  );
}