import Navbar from "@/component/Navbar";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Navbar/>
            {children}
    </main>
  );
}
