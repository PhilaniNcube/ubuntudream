import Navbar from '@/components/Navbar';
import './globals.css'

export const metadata = {
  title: "Ubuntu Dream",
  description:
    "Discover Ubuntu Dream, a cutting-edge AI art generation application that transforms your creative visions into stunning digital masterpieces. Experience the future of art and unlock limitless possibilities with artificial intelligence. Try it now!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
