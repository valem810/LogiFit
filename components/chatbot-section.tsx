"use client"

import { Card } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import { Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import type { Ejercicio, DiaRutina, TipoRutina, Objetivo } from "@/lib/types"

interface Message {
  role: "bot" | "user"
  text: string
}

type ConversationState = "initial" | "awaiting_split" | "awaiting_objective" | "completed"

interface ChatbotSectionProps {
  onRoutineGenerated?: (rutina: DiaRutina[], objetivo: Objetivo, tipoRutina: TipoRutina) => void
}

export function ChatbotSection({ onRoutineGenerated }: ChatbotSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "¡Hola! Soy LOGIFIT, tu asistente de entrenamiento. ¿Cuál es tu objetivo principal?",
    },
  ])
  const [showOptions, setShowOptions] = useState(true)
  const [conversationState, setConversationState] = useState<ConversationState>("initial")
  const [objetivo, setObjetivo] = useState<Objetivo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (role: "bot" | "user", text: string) => {
    setMessages((prev) => [...prev, { role, text }])
  }

  const handleOptionSelect = async (option: string) => {
    if (isLoading) return

    addMessage("user", option)
    setShowOptions(false)

    if (conversationState === "initial") {
      // Esperando objetivo
      const selectedObjetivo = option.toLowerCase() as Objetivo
      setObjetivo(selectedObjetivo)
      setConversationState("awaiting_split")
      setTimeout(() => {
        addMessage(
          "bot",
          "Excelente elección. ¿Qué tipo de split prefieres?"
        )
        setShowOptions(true)
      }, 500)
    } else if (conversationState === "awaiting_split") {
      // Esperando tipo de split
      let tipoRutina: TipoRutina

      if (option.includes("Full Body")) {
        tipoRutina = "full_body"
      } else if (option.includes("Push-Pull-Legs")) {
        tipoRutina = "push_pull_legs"
      } else {
        tipoRutina = "upper_lower"
      }

      if (objetivo) {
        setIsLoading(true)
        addMessage("bot", "Perfecto. Generando tu rutina personalizada...")

        try {
          const FLASK_URL = process.env.NEXT_PUBLIC_FLASK_URL || "http://localhost:5000"
          
          const response = await fetch(`${FLASK_URL}/api/generate-routine`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              split: tipoRutina, 
              objetivo: objetivo 
            }),
          })

          if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`)
          }

          const data = await response.json()
          setConversationState("completed")

          setTimeout(() => {
            addMessage(
              "bot",
              "¡Listo! He generado tu rutina personalizada usando el sistema experto en Prolog. Puedes verla en la sección de resultados abajo. ¿Quieres generar otra rutina?"
            )
            if (onRoutineGenerated) {
              onRoutineGenerated(data.rutina, data.objetivo, data.tipoRutina)
            }
            setShowOptions(true)
          }, 1000)
        } catch (error) {
          console.error("[v0] Error generando rutina:", error)
          addMessage("bot", "Hubo un error al generar tu rutina. Asegúrate de que el servidor Flask esté corriendo en http://localhost:5000")
          setConversationState("awaiting_split")
          setShowOptions(true)
        } finally {
          setIsLoading(false)
        }
      }
    } else if (conversationState === "completed") {
      // Rutina completada, preguntar si quiere generar otra
      if (option === "Sí") {
        setConversationState("initial")
        setObjetivo(null)
        setTimeout(() => {
          addMessage(
            "bot",
            "¡Perfecto! Empecemos de nuevo. ¿Cuál es tu objetivo principal?"
          )
          setShowOptions(true)
        }, 500)
      } else {
        setTimeout(() => {
          addMessage("bot", "¡Gracias por usar LOGIFIT! Vuelve cuando quieras una nueva rutina.")
          setShowOptions(false)
        }, 500)
      }
    }
  }

  const getOptions = (): string[] => {
    if (conversationState === "initial") {
      return ["Fuerza", "Hipertrofia"]
    } else if (conversationState === "awaiting_split") {
      return ["Full Body", "Push-Pull-Legs", "Upper-Lower"]
    } else if (conversationState === "completed") {
      return ["Sí", "No"]
    }
    return []
  }

  return (
    <section id="chatbot" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Conversa con <span className="text-[#8B0000]">LOGIFIT</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Nuestro sistema experto en Prolog te guiará para crear la rutina perfecta
          </p>
        </div>

        <Card className="bg-[#0f0f0f] border-[#1a1a1a] overflow-hidden">
          {/* Chat header */}
          <div className="bg-black border-b border-[#1a1a1a] p-4 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#8B0000]" />
              <div className="w-3 h-3 rounded-full bg-[#8B0000]/50" />
              <div className="w-3 h-3 rounded-full bg-[#8B0000]/30" />
            </div>
            <span className="text-white font-semibold">LOGIFIT Chat</span>
          </div>

          {/* Chat messages */}
          <div className="p-6 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user" ? "bg-[#8B0000] text-white" : "bg-[#1a1a1a] text-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] text-gray-200 rounded-lg p-4">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showOptions && !isLoading && (
            <div className="border-t border-[#1a1a1a] p-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {getOptions().map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="bg-[#1a1a1a] hover:bg-[#8B0000] text-white border border-[#2a2a2a] hover:border-[#8B0000] transition-all px-6 py-3"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
