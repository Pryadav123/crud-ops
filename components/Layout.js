import Link from "next/link";
import { useState } from "react";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-lg font-bold">CRUD App</h1>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/options" className="hover:underline">Options</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav menu */}
        {menuOpen && (
          <nav className="bg-blue-700 md:hidden px-4 py-2 space-y-2">
            <Link href="/" className="block hover:underline">Home</Link>
            <Link href="/about" className="block hover:underline">About</Link>
            <Link href="/contact" className="block hover:underline">Contact</Link>
            <Link href="/options" className="block hover:underline">Options</Link>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow pt-20 container mx-auto px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-4 text-center">
        &copy; {new Date().getFullYear()} CRUD App. All rights reserved.
      </footer>
    </div>
  );
}
