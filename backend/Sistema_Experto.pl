% Briceno Caguado, Luis Gerardo - 219473333
% Miranda Mercado, Valeria - 219416801

% BASE DE CONOCIMIENTO
% Grupos musculares
grupo_muscular(pecho).
grupo_muscular(espalda).
grupo_muscular(hombros).
grupo_muscular(biceps).
grupo_muscular(triceps).
grupo_muscular(cuadriceps).
grupo_muscular(femoral).
grupo_muscular(gluteos).
grupo_muscular(pantorrillas).
grupo_muscular(abdomen).

% Ejercicios: ejercicio(Grupo, Nombre, Tipo)
% PECHO
ejercicio(pecho, press_pecho_maquina, compuesto).
ejercicio(pecho, press_banca_inclinado, compuesto).
ejercicio(pecho, fondos, compuesto).
ejercicio(pecho, mariposa_pec_deck, accesorio).
ejercicio(pecho, cables_cruzados, accesorio).

% ESPALDA
ejercicio(espalda, pullover, accesorio).
ejercicio(espalda, remo_sentado, accesorio).
ejercicio(espalda, jalon_al_pecho, accesorio).
ejercicio(espalda, hiperextension, accesorio).
ejercicio(espalda, dominadas, compuesto).

% HOMBROS
ejercicio(hombros, press_militar, compuesto).
ejercicio(hombros, press_arnold, compuesto).
ejercicio(hombros, elevaciones_laterales, accesorio).
ejercicio(hombros, tiron_a_la_cara, accesorio).
ejercicio(hombros, elevaciones_frontales, accesorio).

% BICEPS
ejercicio(biceps, curl_barra, accesorio).
ejercicio(biceps, dominadas_supinas, compuesto).
ejercicio(biceps, curl_martillo, accesorio).
ejercicio(biceps, curl_concentrado, accesorio).
ejercicio(biceps, curl_predicador, accesorio).

% TRICEPS
ejercicio(triceps, extension_tricep_un_brazo, accesorio).
ejercicio(triceps, maquina_para_fondos, compuesto).
ejercicio(triceps, triceps_polea, accesorio).
ejercicio(triceps, patada_mancuerna, accesorio).
ejercicio(triceps, press_frances, accesorio).

% CUADRICEPS
ejercicio(cuadriceps, sentadilla_bulgara, compuesto).
ejercicio(cuadriceps, sentadilla_hack_maquina, compuesto).
ejercicio(cuadriceps, sentadilla_smith, compuesto).
ejercicio(cuadriceps, step_con_mancuerna, compuesto).
ejercicio(cuadriceps, press_piernas, compuesto).
ejercicio(cuadriceps, extension_pierna, accesorio).

% FEMORAL
ejercicio(femoral, peso_muerto_rumano, compuesto).
ejercicio(femoral, curl_femoral, accesorio).
ejercicio(femoral, buenos_dias, compuesto).
ejercicio(femoral, curl_nordico, accesorio).
ejercicio(femoral, curl_femoral_sentado, accesorio).

% GLÚTEOS
ejercicio(gluteos, hip_thrust, compuesto).
ejercicio(gluteos, puente_gluteo, accesorio).
ejercicio(gluteos, sentadilla_profunda, compuesto).
ejercicio(gluteos, peso_muerto_sumo, compuesto).
ejercicio(gluteos, patada_gluteo, accesorio).

% PANTORRILLAS
ejercicio(pantorrillas, elevaciones_talones, accesorio).
ejercicio(pantorrillas, donkey_raises, accesorio).
ejercicio(pantorrillas, elevaciones_prensa, accesorio).
ejercicio(pantorrillas, saltos_cuerda, accesorio).
ejercicio(pantorrillas, elevaciones_unilateral, accesorio).

% ABDOMEN
ejercicio(abdomen, crunch, accesorio).
ejercicio(abdomen, plancha, accesorio).
ejercicio(abdomen, elevaciones_de_piernas, accesorio).
ejercicio(abdomen, rueda_abdominal, accesorio).
ejercicio(abdomen, crunch_maquina, accesorio).

% DEFINICIÓN DE LOS SPLITS
% Full Body
rutina(full_body, [pecho, espalda, cuadriceps, hombros, biceps, triceps, abdomen],
        [compuesto, accesorio, compuesto, _, accesorio, _, _]).

% Upper-Lower
rutina(upper, [pecho, pecho, espalda, espalda, hombros, biceps, triceps],
        [compuesto, accesorio, compuesto, accesorio, _, _, _]).
rutina(lower, [cuadriceps, cuadriceps, femoral, gluteos, pantorrillas],
        [compuesto, accesorio, _, compuesto, _]).

% Push-Pull-Legs
rutina(push, [pecho, pecho, hombros, hombros, triceps],
        [compuesto, accesorio, compuesto, accesorio, _]).
rutina(pull, [espalda, espalda, biceps, abdomen],
        [compuesto, accesorio, accesorio, _]).
rutina(legs, [cuadriceps, cuadriceps, femoral, gluteos, pantorrillas],
        [compuesto, accesorio, accesorio, compuesto, _]).

% MOTOR DE INFERENCIA
selecciona_ejercicio(Grupo, Ejercicio, Tipo) :-
    findall((X,Tipo), ejercicio(Grupo,X,Tipo), Lista),
    random_member((Ejercicio,Tipo), Lista).

ejercicios_por_grupos([], [], []).
ejercicios_por_grupos([Grupo|Gs], [Ejercicio|Es], [Tipo|Ts]) :-
   selecciona_ejercicio(Grupo, Ejercicio, Tipo),
   ejercicios_por_grupos(Gs, Es, Ts).

% GENERA RUTINA SEGÚN EL TIPO DE SPLIT
genera_rutina(full_body, [Dia]) :-
    rutina(full_body, Grupos, Tipo),
    ejercicios_por_grupos(Grupos, Ejercicios, Tipo),
    Dia = dia(full_body, Ejercicios, Tipo).

genera_rutina(upper_lower, [Dia1, Dia2]) :-
    rutina(upper, GruposUpper, TipoU),
    rutina(lower, GruposLower, TipoL),
    ejercicios_por_grupos(GruposUpper, EjerciciosU, TipoU),
    ejercicios_por_grupos(GruposLower, EjerciciosL, TipoL),
    Dia1 = dia(upper, EjerciciosU, TipoU),
    Dia2 = dia(lower, EjerciciosL, TipoL).

genera_rutina(push_pull_legs, [DiaPush, DiaPull, DiaLegs]) :-
    rutina(push, GruposPush, TipoP),
    rutina(pull, GruposPull, TipoPU),
    rutina(legs, GruposLegs, TipoL),
    ejercicios_por_grupos(GruposPush, EjerciciosPush, TipoP),
    ejercicios_por_grupos(GruposPull, EjerciciosPull, TipoPU),
    ejercicios_por_grupos(GruposLegs, EjerciciosLegs, TipoL),
    DiaPush = dia(push, EjerciciosPush, TipoP),
    DiaPull = dia(pull, EjerciciosPull, TipoPU),
    DiaLegs = dia(legs, EjerciciosLegs, TipoL).

% -------------------------
% ADAPTACIÓN PARA FLASK
% -------------------------

% Repeticiones según objetivo
reps_por_objetivo(fuerza, "4-6 repeticiones").
reps_por_objetivo(hipertrofia, "8-12 repeticiones").

% Convertir rutina a JSON-like
rutina_json(TipoSplit, Objetivo, Resultado) :-
    genera_rutina(TipoSplit, Dias),
    rutina_a_json(Dias, Objetivo, Resultado).

rutina_a_json([], _, []).
rutina_a_json([dia(Nombre, Ejercicios, Tipos)|Resto], Objetivo,
              [json(Nombre, ListaEjercicios)|JsonResto]) :-
    ejercicios_a_json(Ejercicios, Tipos, Objetivo, ListaEjercicios),
    rutina_a_json(Resto, Objetivo, JsonResto).

ejercicios_a_json([], [], _, []).
ejercicios_a_json([E|Es], [T|Ts], Objetivo,
                  [json(E, T, Reps)|Resto]) :-
    reps_por_objetivo(Objetivo, Reps),
    ejercicios_a_json(Es, Ts, Objetivo, Resto).