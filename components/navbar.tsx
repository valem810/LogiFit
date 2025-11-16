"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="LOGIFIT"
              width={180}
              height={60}
              className="h-10 w-auto transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#inicio" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Inicio
            </Link>
            <Link
              href="#sobre-el-sistema"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Sobre el sistema
            </Link>
            <Link href="#chatbot" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Chatbot
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#1a1a1a]">
            <div className="flex flex-col gap-4">
              <Link
                href="#inicio"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="#sobre-el-sistema"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Sobre el sistema
              </Link>
              <Link
                href="#chatbot"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Chatbot
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
