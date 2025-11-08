import './globals.css';

export const metadata = {
  title: 'EtherFi Guardian - Risk Analysis Dashboard',
  description: 'AI-powered risk transparency for liquid restaking protocols',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}