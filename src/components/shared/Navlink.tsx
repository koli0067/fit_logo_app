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
      className={`px-5 py-2 rounded-full transition-all inline-block ${
        isActive
          ? "bg-[#18220f] text-[#c2f800] font-semibold"
          : "text-white hover:bg-[#18220f]/80 hover:text-[#c2f800]"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navlink;