import './globals.css';
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
      <body>{children}</body>
    </html>
  );
}
