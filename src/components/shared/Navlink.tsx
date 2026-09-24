"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const Navlink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-colors hover:text-[#c2f800] ${
        isActive
          ? "font-semibold text-[#c2f800]"
          : "text-white"
      }`}
    >
      {children} 
    </Link>
  );
};

export default Navlink;