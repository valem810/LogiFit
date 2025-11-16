"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { InfoSection } from "@/components/info-section"
import { ChatbotSection } from "@/components/chatbot-section"
import { RoutineDisplay } from "@/components/routine-display"
import { Footer } from "@/components/footer"
import { useState } from "react"
import type { DiaRutina, Objetivo, TipoRutina } from "@/lib/types"

export default function Home() {
  const [rutina, setRutina] = useState<DiaRutina[] | null>(null)
  const [objetivo, setObjetivo] = useState<Objetivo | null>(null)
  const [tipoRutina, setTipoRutina] = useState<TipoRutina | null>(null)

  const handleRoutineGenerated = (newRutina: DiaRutina[], newObjetivo: Objetivo, newTipoRutina: TipoRutina) => {
    setRutina(newRutina)
    setObjetivo(newObjetivo)
    setTipoRutina(newTipoRutina)
    
    // Scroll to routine section
    setTimeout(() => {
      document.getElementById("rutina")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <InfoSection />
      <ChatbotSection onRoutineGenerated={handleRoutineGenerated} />
      <RoutineDisplay rutina={rutina} objetivo={objetivo} tipoRutina={tipoRutina} />
      <Footer />
    </div>
  )
}
