"use client";

import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const NavBarLink = ({ link }: { link: { label: string; href: string } }) => {
  const currentPath = usePathname();

  return (
    <Link
      className={classNames({
        "text-zinc-900": link.href === currentPath,
        "text-zinc-500": link.href !== currentPath,
        "hover:text-zinc-900 transition-colors": true,
      })}
      href={link.href}
    >
      {link.label}
    </Link>
  );
};

export default NavBarLink;
