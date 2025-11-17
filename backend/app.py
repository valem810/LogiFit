from pyswip import Prolog
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)  # Permitir CORS para desarrollo

prolog = Prolog()
prolog_loaded = False

# Cargar el archivo Prolog
try:
    # Determinar la ruta absoluta al archivo Prolog junto al script
    prolog_file = Path(__file__).resolve().parent / "Sistema_Experto.pl"
    prolog_path = str(prolog_file).replace("\\", "/")
    prolog.consult(prolog_path)
    prolog_loaded = True
    print("✓ Prolog cargado correctamente.")
except Exception as e:
    prolog_loaded = False
    print(f"✗ Error al cargar Prolog: {e}")


@app.route("/api/generate-routine", methods=["POST"])
def generate_routine():
    try:
        if not prolog_loaded:
            return jsonify({"error": "Sistema experto Prolog no cargado"}), 500
        data = request.get_json()
        split = data.get("split", "").strip().lower()
        objetivo = data.get("objetivo", "").strip().lower()

        if not split or not objetivo:
            return jsonify({"error": "Faltan datos (split u objetivo)"}), 400

        query = f"rutina_json({split}, {objetivo}, X)"
        resultado = list(prolog.query(query))

        if not resultado:
            return jsonify({"error": "No se encontró rutina"}), 404

        rutina_datos = resultado[0]["X"]

        print("\n========== DEBUG RAW ==========")
        print(rutina_datos)
        print("================================\n")

        # Confirmamos que es una lista de strings
        if not isinstance(rutina_datos, list):
            return jsonify({"error": "Respuesta inesperada del sistema experto"}), 500

        dias_formateados = []

        for dia_str in rutina_datos:

            # Asegurar conversión a string
            dia_str = str(dia_str).strip()

            #OBTENER NOMBRE DEL DÍA
            try:
                nombre_dia = dia_str.split("json(", 1)[1].split(",", 1)[0].strip()
            except:
                nombre_dia = "desconocido"

            # EXTRAER LISTA DE EJERCICIOS
            try:
                ejercicios_raw = dia_str.split("[", 1)[1].rsplit("]", 1)[0]
            except:
                ejercicios_raw = ""

            # Separamos por "json(" pero ignoramos vacíos
            ejercicios_textos = [
                x.strip() for x in ejercicios_raw.split("json(") if x.strip()
            ]

            ejercicios = []


            # PROCESAR CADA EJERCICIO
            for ej in ejercicios_textos:

                ej = ej.rstrip(")").strip()
                partes = [p.strip() for p in ej.split(",")]

                if len(partes) < 3:
                    continue

                nombre = partes[0]
                tipo = partes[1]
                reps = partes[2].replace("b'", "").replace("'", "")

                ejercicios.append({
                    "nombre": nombre,
                    "tipo": tipo,
                    "reps": reps,
                    "peso": "A determinar"
                })

            # AGREGAR DÍA FORMATEADO
            dias_formateados.append({
                "dia": nombre_dia,
                "ejercicios": ejercicios
            })

        return jsonify({
            "rutina": dias_formateados,
            "objetivo": objetivo,
            "tipoRutina": split
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": str(e)}), 500



@app.route("/health", methods=["GET"])
def health():
    """Endpoint para verificar que el servidor está funcionando"""
    return jsonify({
        "status": "ok",
        "message": "Flask funcionando",
        "prolog_loaded": prolog_loaded
    })


if __name__ == "__main__":
    # Leer configuración desde variables de entorno
    port = int(os.getenv("PORT", 5000))
    debug_env = os.getenv("FLASK_DEBUG", "1")
    debug = debug_env not in ("0", "false", "False")
    host = os.getenv("HOST", "0.0.0.0")

    app.run(host=host, port=port, debug=debug)
