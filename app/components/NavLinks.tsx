"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={`${link.href === currentPath ? "text-zinc-900" : "nav-link"}`}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
