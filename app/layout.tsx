import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LOGIFIT - Entrena con lógica, no con suerte",
  description:
    "Sistema experto de generación de rutinas de entrenamiento personalizadas basado en conocimiento",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
