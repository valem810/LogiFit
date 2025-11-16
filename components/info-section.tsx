import { Card } from "@/components/ui/card"
import { Brain, Dumbbell, Target, Users } from "lucide-react"

export function InfoSection() {
  return (
    <section id="sobre-el-sistema" className="py-24 px-4 bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* System explanation */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Sistema basado en <span className="text-[#8B0000]">conocimiento</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            LOGIFIT utiliza un motor de inferencia y una base de conocimiento estructurada para generar rutinas
            personalizadas sin depender de inteligencia artificial
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-6 hover:border-[#8B0000]/50 transition-all hover:scale-105">
            <Brain className="w-12 h-12 text-[#8B0000] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Motor de inferencia</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Lógica experta que analiza tus objetivos y recomienda ejercicios específicos
            </p>
          </Card>

          <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-6 hover:border-[#8B0000]/50 transition-all hover:scale-105">
            <Dumbbell className="w-12 h-12 text-[#8B0000] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Base de conocimiento</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ejercicios clasificados por grupo muscular y tipo de entrenamiento
            </p>
          </Card>

          <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-6 hover:border-[#8B0000]/50 transition-all hover:scale-105">
            <Target className="w-12 h-12 text-[#8B0000] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Personalización</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Rutinas adaptadas a tu objetivo: hipertrofia o fuerza
            </p>
          </Card>

          <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-6 hover:border-[#8B0000]/50 transition-all hover:scale-105">
            <Users className="w-12 h-12 text-[#8B0000] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Múltiples splits</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Push-Pull-Legs, Full Body, Upper-Lower según tu preferencia
            </p>
          </Card>
        </div>

        {/* Training splits */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Tipos de Split</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-6 hover:border-[#8B0000]/50 transition-all">
              <h4 className="text-xl font-bold text-white mb-3">Push-Pull-Legs</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                División en tres días: empuje, tracción y piernas
              </p>
              <ul className="text-gray-500 text-sm space-y-2">
                <li>• Push: Pecho, hombros, tríceps</li>
                <li>• Pull: Espalda, bíceps</li>
                <li>• Legs: Piernas completas</li>
              </ul>
            </Card>

            <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-6 hover:border-[#8B0000]/50 transition-all">
              <h4 className="text-xl font-bold text-white mb-3">Full Body</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Entrenamiento de cuerpo completo en cada sesión
              </p>
              <ul className="text-gray-500 text-sm space-y-2">
                <li>• Todos los grupos musculares</li>
                <li>• Ideal para principiantes</li>
                <li>• 3-4 días por semana</li>
              </ul>
            </Card>

            <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-6 hover:border-[#8B0000]/50 transition-all">
              <h4 className="text-xl font-bold text-white mb-3">Upper-Lower</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">División entre tren superior e inferior</p>
              <ul className="text-gray-500 text-sm space-y-2">
                <li>• Upper: Torso completo</li>
                <li>• Lower: Piernas completas</li>
                <li>• 4 días por semana</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Training goals */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Objetivos de Entrenamiento</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-8 hover:border-[#8B0000]/50 transition-all">
              <h4 className="text-2xl font-bold text-white mb-3">Hipertrofia</h4>
              <p className="text-gray-400 leading-relaxed">
                Enfocado en el crecimiento muscular con volumen moderado-alto, series de 8-12 repeticiones y descansos
                de 60-90 segundos
              </p>
            </Card>

            <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-8 hover:border-[#8B0000]/50 transition-all">
              <h4 className="text-2xl font-bold text-white mb-3">Fuerza</h4>
              <p className="text-gray-400 leading-relaxed">
                Enfocado en aumentar la fuerza máxima con cargas pesadas, series de 3-6 repeticiones y descansos de 3-5
                minutos
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
