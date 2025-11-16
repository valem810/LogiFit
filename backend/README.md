# LOGIFIT Backend - Flask + Prolog

Backend del sistema LOGIFIT que utiliza Flask y Prolog para generar rutinas de entrenamiento personalizadas.

## Instalación

### Requisitos Previos

1. **Python 3.8+**
2. **SWI-Prolog instalado en tu sistema**
   - **Windows**: Descargar de https://www.swi-prolog.org/download/stable
   - **macOS**: `brew install swi-prolog`
   - **Linux**: `sudo apt-get install swi-prolog`

### Pasos de Instalación

1. Navega a la carpeta backend:
\`\`\`bash
cd backend
\`\`\`

2. Crea un entorno virtual (opcional pero recomendado):
\`\`\`bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
\`\`\`

3. Instala las dependencias:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Ejecución

1. Asegúrate de estar en la carpeta `backend`
2. Ejecuta el servidor Flask:
\`\`\`bash
python app.py
\`\`\`

3. El servidor estará disponible en `http://localhost:5000`

## Endpoints

### POST /api/generate-routine
Genera una rutina de entrenamiento basada en los parámetros dados.

**Request Body:**
\`\`\`json
{
  "split": "full_body",  // o "upper_lower" o "push_pull_legs"
  "objetivo": "fuerza"   // o "hipertrofia"
}
\`\`\`

**Response:**
\`\`\`json
{
  "rutina": [
    {
      "dia": "full_body",
      "ejercicios": [
        {
          "nombre": "press_pecho_máquina",
          "tipo": "compuesto",
          "reps": "4-6 repeticiones",
          "peso": "A determinar"
        }
      ]
    }
  ],
  "objetivo": "fuerza",
  "tipoRutina": "full_body"
}
\`\`\`

### GET /health
Verifica que el servidor está funcionando correctamente.

## Arquitectura

- `app.py`: Servidor Flask con los endpoints
- `Sistema_Experto.pl`: Base de conocimiento en Prolog con ejercicios y lógica de generación
- PySwip: Librería que conecta Python con SWI-Prolog

## Troubleshooting

**Error: "No se pudo conectar a Prolog"**
- Verifica que SWI-Prolog esté instalado correctamente
- Asegúrate de que el archivo `Sistema_Experto.pl` esté en la misma carpeta que `app.py`

**Error de CORS**
- El servidor ya incluye `flask-cors` configurado para desarrollo
- Para producción, ajusta los orígenes permitidos en `app.py`
