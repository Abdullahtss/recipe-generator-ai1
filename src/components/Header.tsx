'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors">
          RecipeGenerator
        </Link>
        
        <nav className="flex gap-6">
          <Link 
            href="/input" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === '/input' 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Input
          </Link>
          <Link 
            href="/saved" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === '/saved' 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Saved
          </Link>
          <Link
            href="/login"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === '/login' 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}