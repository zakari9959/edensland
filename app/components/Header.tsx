import Link from "next/link";
import React from "react";

interface Page {
  path: string;
  title: string;
}

export default function Header(): JSX.Element {
  const title: string = "Eden's Land";
  const pages: Page[] = [
    { path: "/", title: "Home" },
    { path: "/about", title: "About" },
    { path: "/contact", title: "Contact" },
    // Add more pages here if needed
  ];

  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          {pages.map((page) => (
            <li key={page.path}>
              <Link href={page.path}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}