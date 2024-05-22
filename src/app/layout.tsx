"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });
const links = [
  { 
    name: 'Dashboard', 
    href: '/dashboard'
  },
  {
    name: 'Usuarios',
    href: '/users'
  },
];



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
      <nav className="h-screen w-64 text-[#171725] fixed flex flex-col border-r-2 border-r-[#00000014]">
      <div className="logo p-4 mb-4">
          <img 
            src='/img/logo.jpg'
            alt="Logo" 
            className="w-full h-auto"
          />
        </div>
      {links.map((link) => {
        return (
          <Link
          key={link.name}
          href={link.href}
          className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:text-[#cdfff9] hover:bg-[#33615b] md:flex-none md:justify-start md:p-2 md:px-3
          ${pathname === link.href ? 'bg-[#61A89F] text-[#cdfff9]' : 'text-gray-900'}`}
          >
          <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
      </nav>
      <main className="ml-64 p-4">
      {children}
      </main>
      </body>
    </html>
  );
}
