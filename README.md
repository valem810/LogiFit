# LOGIFIT - Sistema Experto de Rutinas de Entrenamiento

LOGIFIT es un generador inteligente de rutinas de entrenamiento que utiliza un sistema experto basado en Prolog para crear programas personalizados según tus objetivos y preferencias.

## Características

- **Sistema Experto en Prolog**: Motor de inferencia que genera rutinas basadas en reglas de entrenamiento
- **Múltiples Splits**: Full Body, Push-Pull-Legs, y Upper-Lower
- **Objetivos Personalizados**: Fuerza o Hipertrofia
- **Interfaz Conversacional**: Chatbot interactivo con selección por botones
- **Recomendaciones Detalladas**: Series, repeticiones y porcentaje de peso según objetivo

## Requisitos Previos

### Backend (Flask + Prolog)

1. **Python 3.8+**
2. **SWI-Prolog**
   - Windows: [Descargar](https://www.swi-prolog.org/download/stable)
   - macOS: `brew install swi-prolog`
   - Linux: `sudo apt-get install swi-prolog`

### Frontend (Next.js)

1. **Node.js 18+**

## Instalación

### 1. Instalar dependencias del frontend

\`\`\`bash
npm install
\`\`\`

### 2. Instalar dependencias del backend

\`\`\`bash
pip install -r backend/requirements.txt
\`\`\`

## Ejecución

### 1. Iniciar el servidor Flask (Backend)

\`\`\`bash
python backend/app.py
\`\`\`

El servidor Flask se ejecutará en `http://localhost:5000`

### 2. Iniciar el servidor Next.js (Frontend)

En otra terminal:

\`\`\`bash
npm run dev
\`\`\`

El sitio estará disponible en `http://localhost:3000`

## Estructura del Proyecto

\`\`\`
logifit/
├── app/
│   ├── page.tsx              # Página principal
│   └── layout.tsx            # Layout global
├── components/
│   ├── navbar.tsx            # Barra de navegación
│   ├── hero.tsx              # Sección hero
│   ├── info-section.tsx      # Información del sistema
│   ├── chatbot-section.tsx   # Chatbot interactivo
│   ├── routine-display.tsx   # Visualización de rutinas
│   └── footer.tsx            # Pie de página
├── scripts/
│   ├── sistema_experto.pl    # Motor Prolog
│   ├── flask_server.py       # API Flask
│   ├── requirements.txt      # Dependencias Python
│   └── FLASK_SETUP.md       # Guía de instalación
└── public/
    └── logo.png              # Logo LOGIFIT
\`\`\`

## Cómo Funciona

1. **Base de Conocimiento**: El archivo `sistema_experto.pl` contiene:
   - Grupos musculares
   - Ejercicios clasificados por tipo (compuesto/accesorio)
   - Definición de splits de entrenamiento
   - Reglas de generación de rutinas

2. **Motor de Inferencia**: El sistema Prolog:
   - Selecciona ejercicios aleatoriamente según el grupo muscular
   - Aplica restricciones de tipo de ejercicio
   - Genera rutinas completas según el split seleccionado

3. **API Flask**: Interfaz entre Prolog y el frontend:
   - Recibe solicitudes del chatbot
   - Ejecuta consultas Prolog usando PySwip
   - Formatea y devuelve las rutinas generadas

4. **Frontend Next.js**: Interfaz de usuario moderna:
   - Chatbot con botones de selección
   - Visualización detallada de rutinas
   - Diseño responsivo y minimalista

## API Endpoints

### POST /api/generate-routine

Genera una rutina personalizada.

**Request:**
\`\`\`json
{
  "tipoRutina": "full_body | upper_lower | push_pull_legs",
  "objetivo": "fuerza | hipertrofia"
}
\`\`\`

**Response:**
\`\`\`json
{
  "rutina": [
    {
      "dia": "Full Body",
      "ejercicios": [
        {
          "nombre": "Press Pecho Máquina",
          "tipo": "compuesto",
          "reps": "8-12 repeticiones",
          "peso": "65-75% del peso máximo"
        }
      ]
    }
  ],
  "objetivo": "hipertrofia",
  "tipoRutina": "full_body"
}
\`\`\`

## Tecnologías

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Flask, PySwip
- **Sistema Experto**: SWI-Prolog
- **UI Components**: shadcn/ui

## Autores

- Briceño Caguado, Luis Gerardo - 219473333
- Miranda Mercado, Valeria - 219416801

## Licencia

MIT
\`\`\`
