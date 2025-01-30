import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}