"use client";
import { Montserrat, Work_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="es">
      <body className={workSans.className}>
        <nav className="md:h-screen h-12 w-screen md:w-64 text-[#171725] fixed flex md:flex-col flex-row border-r-1 border-r-[#707070] shadow-[1px_0px_4px_#00000014]">
          <div className="logo p-4 mb-4 hidden md:block">
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
                className={`border-l-4 flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm  font-medium hover:text-[#cdfff9] hover:bg-[#33615b] md:flex-none md:justify-start md:p-2 md:px-3
                ${pathname === link.href ? 'border-[#8aded3] bg-[#eefaf8] text-[#a5e4db]' : 'bg-transparent text-[#171725]'}`}
                >
                <img
                  src={link.icon}
                  alt={`${link.name} icon`}
                  className="w-6 h-6 ml-3"
                />
                <p className="md:block ml-3">{link.name}</p>
              </Link>
            )
          })}
        </nav>
      <main className="md:ml-64 ml-0 p-4">
        {children}
      </main>
      <Toaster />
      </body>
    </html>
  );
}
