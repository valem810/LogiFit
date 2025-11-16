import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center px-4 pt-16">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/5 via-black to-black" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Entrena con <span className="text-[#8B0000]">lógica</span>,
          <br />
          no con suerte
        </h1>

        <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Rutinas de entrenamiento personalizadas generadas por un sistema experto basado en conocimiento
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#chatbot">
            <Button
              size="lg"
              className="bg-[#8B0000] hover:bg-[#6B0000] text-white px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
            >
              Probar el chatbot
            </Button>
          </Link>
          <Link href="#sobre-el-sistema">
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-white hover:bg-white/5 px-8 py-6 text-lg font-semibold bg-transparent"
            >
              Conocer más
            </Button>
          </Link>
        </div>

        {/* Decorative dots */}
        <div className="mt-20 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse delay-100" />
          <div className="w-2 h-2 rounded-full bg-[#8B0000] animate-pulse delay-200" />
        </div>
      </div>
    </section>
  )
}
