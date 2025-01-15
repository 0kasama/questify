import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/context/authContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Questify',
  description: 'Todo List Gamified',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
