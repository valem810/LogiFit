# LOGIFIT - Generador Inteligente de Rutinas de Entrenamiento

LOGIFIT es una aplicación que genera rutinas de entrenamiento personalizadas usando un sistema experto (SWI-Prolog) y una API en Flask, con una interfaz moderna en Next.js.

Objetivo: permitir a usuarios obtener programas de entrenamiento (Full Body, Push-Pull-Legs, Upper-Lower) adaptados a su objetivo (fuerza o hipertrofia), seleccionando ejercicios, series y repeticiones según reglas y restricciones definidas en la base de conocimiento Prolog.

## Características

- **Sistema Experto en Prolog**: Motor de inferencia que genera rutinas basadas en reglas de entrenamiento
- **Múltiples Splits**: Full Body, Push-Pull-Legs y Upper-Lower
- **Objetivos Personalizados**: Fuerza o Hipertrofia
- **Interfaz Conversacional**: Chatbot interactivo con selección por botones
- **Recomendaciones Detalladas**: Series, repeticiones y porcentajes de carga según objetivo

## Requisitos Previos

### Backend (Flask + Prolog)

1. **Python 3.8+**
2. **SWI-Prolog**
   - Windows: descargar desde https://www.swi-prolog.org/download/stable
   - macOS: `brew install swi-prolog`
   - Linux: `sudo apt-get install swi-prolog`

### Frontend (Next.js)

1. **Node.js 18+**

## Instalación y ejecución (resumen)

Importante: únicamente el primer bloque de comandos está etiquetado como `bash` en este archivo. Después de ejecutar ese comando inicial, abre dos consolas separadas (una para el frontend y otra para el backend) y ejecuta los comandos restantes tal como aparecen (sin el prefijo `bash`). En Windows usa PowerShell o CMD; en macOS/Linux usa tu terminal habitual.

### 1) Preparar dependencias (ejecutar desde la raíz del proyecto)

```bash
npm install
```

> Nota: el bloque anterior está etiquetado `bash` — es el único bloque con esa etiqueta. A continuación abre dos consolas separadas y sigue los pasos para frontend y backend.

### 2) Opciones para ejecutar (script automático o manual)

Puedes iniciar el proyecto de dos maneras: usando el script PowerShell que abre dos ventanas (backend y frontend) o iniciando ambos servicios manualmente en dos consolas separadas.

**a) Usar el script (Windows PowerShell)**

Desde la raíz del proyecto ejecuta:

```powershell
.\scripts\start-dev.ps1
```

Este script abrirá dos ventanas de PowerShell nuevas:
- Una para el backend que ejecuta `python app.py` desde la carpeta `backend`
- Otra para el frontend que ejecuta `npm run dev` desde la raíz del repo

Requisitos para que el script funcione correctamente:
- Tener `python` y `npm` disponibles en `PATH`.
- Ejecutar PowerShell con la política de ejecución que permita scripts. Si la ejecución está bloqueada, puedes ejecutar el script temporalmente con:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-dev.ps1
```

**b) Iniciar manualmente en dos consolas (método detallado)**

Consola A — Backend (API Flask):

```powershell
pip install -r backend/requirements.txt
cd backend
python app.py
```

El backend quedará disponible en `http://localhost:5000`.

Consola B — Frontend (Next.js):

```powershell
cd <ruta-a-la-raiz-del-proyecto>  # si no estás ya en la raíz
npm install   # si no instalaste dependencias previamente
npm run dev
```

El frontend quedará disponible en `http://localhost:3000`.

Si prefieres usar CMD en lugar de PowerShell, los comandos de Python y npm son los mismos; omite las invocaciones específicas de PowerShell.

## Cómo funciona (resumen)

1. **Base de conocimiento (Prolog)**: `Sistema_Experto.pl` contiene ejercicios, grupos musculares, splits y reglas que definen cómo se generan las rutinas.

2. **Motor de inferencia**: Prolog aplica las reglas y restricciones para seleccionar ejercicios y formar los días de entrenamiento según el split y objetivo.

3. **API Flask**: `backend/app.py` actúa como puente entre el frontend y Prolog (usa PySwip para ejecutar consultas y devuelve JSON con la rutina).

4. **Frontend Next.js**: Interfaz que permite al usuario seleccionar opciones (split, objetivo) vía chatbot y muestra la rutina generada.

## API Endpoints

### POST /api/generate-routine

Genera una rutina personalizada.

**Request:**
```
{
  "tipoRutina": "full_body | upper_lower | push_pull_legs",
  "objetivo": "fuerza | hipertrofia"
}
```

**Response:**
```
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
```

## Tecnologías

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Flask, PySwip
- **Sistema Experto**: SWI-Prolog
- **UI Components**: shadcn/ui

## Autores

- Briceño Caguado, Luis Gerardo - 219473333
- Miranda Mercado, Valeria - 219416801

## Licencia

MIT

