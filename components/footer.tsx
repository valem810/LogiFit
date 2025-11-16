import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#1a1a1a] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">LOGIFIT</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#8B0000]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#8B0000]" />
                <div className="w-3 h-3 rounded-full bg-[#8B0000]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sistema experto de generación de rutinas de entrenamiento basado en conocimiento
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#sobre-el-sistema" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Sobre el sistema
                </Link>
              </li>
              <li>
                <Link href="#chatbot" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Chatbot
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@logifit.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1a1a1a] text-center">
          <p className="text-gray-500 text-sm">© 2025 LOGIFIT. Prototipo académico - Sistema basado en conocimiento</p>
        </div>
      </div>
    </footer>
  )
}
