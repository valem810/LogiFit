"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import type { Ejercicio, DiaRutina, TipoRutina, Objetivo } from "@/lib/types"

interface RoutineDisplayProps {
  rutina: DiaRutina[] | null
  objetivo: Objetivo | null
  tipoRutina: TipoRutina | null
}

export function RoutineDisplay({ rutina, objetivo, tipoRutina }: RoutineDisplayProps) {
  if (!rutina || !objetivo || !tipoRutina) {
    return (
      <section className="py-24 px-4 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Tu rutina <span className="text-[#8B0000]">personalizada</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Usa el chatbot arriba para generar tu rutina personalizada
            </p>
          </div>
        </div>
      </section>
    )
  }

  const formatearObjetivo = (obj: Objetivo) =>
    obj === "fuerza" ? "Fuerza" : "Hipertrofia"

  const formatearTipoRutina = (tipo: TipoRutina) => {
    if (tipo === "full_body") return "Full Body"
    if (tipo === "upper_lower") return "Upper-Lower"
    return "Push-Pull-Legs"
  }

  // Una sola función que crea la frase final
  const getDescripcionEjercicio = (ej: Ejercicio, objetivo: Objetivo) => {
    const reps = objetivo === "fuerza" ? "4–6 repeticiones" : "8–12 repeticiones"
    const porcentaje = objetivo === "fuerza" ? "80–90% del peso máximo" : "65–75% del peso máximo"

    return `${ej.nombre} (${ej.tipo}): ${reps}, ${porcentaje}`
  }

  return (
    <section id="rutina" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="max-w-5xl mx-auto">
        {/* TITULO */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Tu rutina <span className="text-[#8B0000]">personalizada</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Generada por el sistema experto en Prolog
          </p>
        </div>

        <Card className="bg-[#0f0f0f] border-[#1a1a1a] p-8">
          
          {/* INFO GENERAL */}
          <div className="mb-6 pb-6 border-b border-[#1a1a1a]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-[#8B0000]" />
              <span className="text-white font-semibold">
                Objetivo: {formatearObjetivo(objetivo)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-10 text-[#8B0000]" />
              <span className="text-white font-semibold">
                Split: {formatearTipoRutina(tipoRutina)}
              </span>
            </div>
          </div>

          {/* DIAS */}
          <div className="space-y-10">
            {rutina.map((dia, index) => (
              <div key={index}>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Día {index + 1} - {dia.dia}
                </h3>

                <ul className="space-y-4">
                  {dia.ejercicios.map((ej, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 text-lg leading-relaxed">
                      <span className="text-[#8B0000] text-xl shrink-0">•</span>
                      <span>{getDescripcionEjercicio(ej, objetivo)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* NOTA */}
          <div className="mt-10 pt-6 border-t border-[#1a1a1a]">
            <p className="text-sm text-gray-500 leading-relaxed">
              <strong className="text-gray-400">Nota:</strong>{" "}
              {objetivo === "fuerza"
                ? "Descansa 3–5 minutos entre series de ejercicios principales."
                : "Descansa 60–90 segundos entre series y enfócate en la técnica."}

              {tipoRutina === "upper_lower" &&
                " Puedes repetir este split dos veces por semana."}
            </p>
          </div>
        </Card>
      </div>
    </section>
  )
}
