import AuthContext from '@/context/AuthContext';
import './globals.css';
import ToasterContext from '@/context/ToasterContext';
export const metadata = {
  title: 'Messenger',
  description: 'Messenger clone with NextJs and Tailwind',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToasterContext />
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
