import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      > 
        <main className="h-[85vh] w-full">
          <Navbar/>
          {children}
          <p className="text-gray-400 text-xl text-center">©2025 AstrosphereTeams</p>
        </main>
      </body>
    </html>
  );
}
