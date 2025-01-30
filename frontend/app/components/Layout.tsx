'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>
          Blog
        </h1>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => router.push('/')}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Inicio
              </button>
              <button
                onClick={() => router.push('/new-post')}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Nueva Publicación
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}