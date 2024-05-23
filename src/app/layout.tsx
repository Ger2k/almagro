"use client";
import { Montserrat, Work_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from "next/image";

const montserrat = Montserrat({ subsets: ["latin"] });
const workSans = Work_Sans({ subsets: ["latin"] });
const links = [
  { 
    name: 'Dashboard', 
    href: '/dashboard',
    icon: '/icons/home.svg' 
  },
  {
    name: 'Usuarios',
    href: '/users',
    icon: '/icons/users.svg' 
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
      <body className={montserrat.className}>
        <nav className="h-screen w-64 text-[#171725] fixed flex flex-col border-r-2 border-r-[#00000014]">
          <div className="logo p-4 mb-4">
              <Image
                width={222} 
                height={100}
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
              className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:text-[#cdfff9] hover:bg-[#33615b] md:flex-none md:justify-start md:p-2 md:px-3
              ${pathname === link.href ? 'bg-[#84d4c9] text-black-400' : 'bg-gray-50 text-gray-900'}`}
              >
              <img
                src={link.icon}
                alt={`${link.name} icon`}
                className="w-6 h-6"
              />
              <p className= {`${workSans.className} hidden md:block`}>{link.name}</p>
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
