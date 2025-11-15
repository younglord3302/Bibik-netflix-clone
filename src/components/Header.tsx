'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/browse" className="text-gray-300 hover:text-white transition-colors">
            Browse
          </Link>
          <Link href="/mylist" className="text-gray-300 hover:text-white transition-colors">
            My List
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          <Link href="/profile">
            <UserIcon className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          </Link>
        </div>
      </div>
    </header>
  )
}
