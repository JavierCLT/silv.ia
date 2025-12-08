// Base de conocimiento MAPFRE España - Seguros Auto, Hogar, Vida y Salud
// Actualizado: 2025

const MAPFRE_KNOWLEDGE = {
    empresa: {
        nombre: "MAPFRE",
        descripcion: "MAPFRE es la segunda compañía aseguradora más grande de España por volumen de primas. Fundada en 1933, tiene presencia en más de 40 países.",
        telefono_atencion: "918 365 365",
        telefono_siniestros_personas: "915 811 823",
        telefono_siniestros_autos: "915 811 818",
        web: "www.mapfre.es",
        colores_corporativos: {
            rojo: "#DA291C",
            blanco: "#FFFFFF",
            gris: "#333333"
        }
    },

    seguros: {
        auto: {
            nombre: "Seguros de Coche",
            descripcion: "MAPFRE ofrece seguros de automóvil para cada tipo de conductor, con hasta un 45% de descuento y asistencia desde el kilómetro 0.",
            modalidades: {
                terceros_basico: {
                    nombre: "Terceros Básico",
                    precio_desde: "219€/año",
                    recomendado_para: "Coches con más de 10 años y uso ocasional",
                    coberturas: [
                        "Responsabilidad Civil obligatoria y voluntaria",
                        "Defensa jurídica y reclamación de daños",
                        "Asistencia en viaje desde km 0",
                        "Seguro del conductor (fallecimiento e invalidez)"
                    ]
                },
                terceros_ampliado: {
                    nombre: "Terceros Ampliado",
                    precio_desde: "280€/año",
                    recomendado_para: "Coches de 6-10 años con uso regular",
                    coberturas: [
                        "Todo lo del Terceros Básico",
                        "Rotura de lunas",
                        "Incendio",
                        "Robo total y parcial",
                        "Daños por robo",
                        "Fenómenos atmosféricos (opcional)"
                    ]
                },
                todo_riesgo_franquicia: {
                    nombre: "Todo Riesgo con Franquicia",
                    precio_desde: "335€/año",
                    recomendado_para: "Coches de 3-6 años",
                    coberturas: [
                        "Todo lo del Terceros Ampliado",
                        "Daños propios del vehículo",
                        "Libre elección de taller",
                        "Fenómenos atmosféricos incluidos",
                        "Colisión con animales",
                        "Valor a nuevo durante 2 años",
                        "Franquicia elegible: 100€ a 900€"
                    ]
                },
                todo_riesgo: {
                    nombre: "Todo Riesgo sin Franquicia",
                    precio_desde: "450€/año",
                    recomendado_para: "Coches nuevos o de menos de 3 años",
                    coberturas: [
                        "Todas las coberturas sin franquicia",
                        "Daños propios completos",
                        "Libre elección de taller",
                        "Valor a nuevo durante 2 años",
                        "Vehículo de sustitución",
                        "Asistencia premium"
                    ]
                }
            },
            ventajas_exclusivas: [
                "Asistencia en carretera desde km 0",
                "Grúa el mismo día hasta 150 km",
                "Pérdida de llaves cubierta",
                "Falta de combustible cubierta",
                "Pinchazos de rueda cubiertos",
                "Talleres distinguidos con servicios gratuitos",
                "Revisión gratuita de niveles, luces y neumáticos",
                "ITV gratuita en grandes reparaciones",
                "Limpieza del vehículo tras reparación"
            ],
            factores_precio: [
                "Edad del conductor (menores de 25 años pagan más)",
                "Antigüedad del carnet de conducir",
                "Modelo y año del vehículo",
                "Historial de siniestralidad",
                "Código postal de residencia",
                "Uso del vehículo (particular o profesional)",
                "Kilómetros anuales estimados"
            ]
        },

        hogar: {
            nombre: "Seguros de Hogar",
            descripcion: "MAPFRE ofrece coberturas flexibles para tu hogar, asistencia 24 horas y contratación 100% online desde 120€ al año.",
            modalidades: {
                tu_eliges: {
                    nombre: "Hogar Tú Eliges",
                    precio_desde: "100€/año",
                    recomendado_para: "Viviendas de bajo valor que necesitan protección básica",
                    coberturas: [
                        "Incendio y explosión",
                        "Asistencia urgente básica",
                        "Responsabilidad civil básica",
                        "Daños por agua (opcional)",
                        "Robo (opcional)"
                    ]
                },
                familiar: {
                    nombre: "Hogar Familiar",
                    precio_desde: "250€/año",
                    recomendado_para: "Todo tipo de familias y viviendas, residencia habitual o vacaciones",
                    coberturas: [
                        "Incendio y explosión",
                        "Daños por agua",
                        "Fenómenos atmosféricos",
                        "Rotura de cristales",
                        "Responsabilidad civil completa",
                        "Pérdida de alimentos refrigerados",
                        "Daños eléctricos",
                        "Robo y expoliación",
                        "Extravío de llaves",
                        "Atraco fuera del hogar",
                        "Asistencia en el hogar 24h",
                        "Asistencia informática",
                        "Servicio de bricolaje",
                        "Daños estéticos hasta 1.500€"
                    ]
                },
                platino: {
                    nombre: "Hogar Platino",
                    precio_desde: "400€/año",
                    recomendado_para: "Propietarios con bienes de alto valor que desean máxima protección",
                    coberturas: [
                        "Todo lo del Hogar Familiar",
                        "Todo Riesgo Accidental (franquicia 100€)",
                        "Objetos especiales hasta 12.000€/objeto",
                        "Mayor cobertura en vehículos/embarcaciones",
                        "Propiedades de terceros",
                        "Dinero y tarjetas de crédito",
                        "Más intervenciones de bricolaje",
                        "Mayor asistencia sanitaria urgente",
                        "Gastos de alojamiento por inhabitabilidad",
                        "Daños estéticos hasta 6.000€"
                    ]
                }
            },
            coberturas_opcionales: [
                "Joyas y objetos de valor",
                "Animales de compañía",
                "Todo riesgo tecnológico",
                "Asistencia familiar ampliada",
                "Jardines y zonas exteriores"
            ],
            factores_precio: [
                "Metros cuadrados de la vivienda",
                "Año de construcción",
                "Tipo de vivienda (piso, chalet, adosado)",
                "Ubicación (ciudad y código postal)",
                "Medidas de seguridad (alarma, puerta blindada)",
                "Valor del contenido",
                "Uso (habitual, vacacional, alquiler)"
            ]
        },

        vida: {
            nombre: "Seguros de Vida",
            descripcion: "MAPFRE ofrece seguros de vida desde 80€ al año, con coberturas flexibles para proteger a tu familia.",
            modalidades: {
                confianza_vida: {
                    nombre: "Confianza Vida",
                    precio_desde: "80€/año",
                    recomendado_para: "Familias que buscan protección económica ante fallecimiento o invalidez",
                    coberturas: [
                        "Fallecimiento por cualquier causa",
                        "Invalidez permanente y absoluta",
                        "Fallecimiento por accidente (opcional)",
                        "Gran invalidez (opcional)",
                        "Asistencia informática remota gratuita",
                        "Telemedicina 24/7 incluida",
                        "Chat y videoconsultas médicas"
                    ]
                },
                crecivida: {
                    nombre: "CreciVida (Temporal Renovable)",
                    precio_desde: "100€/año",
                    recomendado_para: "Personas que quieren que su capital crezca con el tiempo",
                    coberturas: [
                        "Capital asegurado de 25.000€ a 1.000.000€",
                        "Incremento anual del capital del 1,5%",
                        "Fallecimiento por cualquier causa",
                        "Invalidez permanente y absoluta",
                        "Doble capital por accidente (opcional)",
                        "Cobertura de cáncer de mama: 15.000€ (opcional)",
                        "Dependencia (opcional)"
                    ]
                },
                familife: {
                    nombre: "Familife",
                    precio_desde: "90€/año",
                    recomendado_para: "Familias con hijos menores de edad",
                    coberturas: [
                        "Fallecimiento por cualquier causa",
                        "Enfermedades graves de hijos (1-17 años)",
                        "Cáncer infantil",
                        "Parálisis de extremidades",
                        "Meningitis bacteriana",
                        "Quemaduras graves"
                    ]
                },
                amortizacion_hipoteca: {
                    nombre: "Vida Amortización de Hipoteca",
                    precio_desde: "Variable según hipoteca",
                    recomendado_para: "Titulares de hipotecas que quieren proteger a su familia",
                    coberturas: [
                        "Cubre el saldo pendiente de la hipoteca",
                        "Fallecimiento",
                        "Incapacidad permanente",
                        "Protección para los herederos"
                    ]
                }
            },
            coberturas_adicionales: {
                fallecimiento_accidental: "Doble capital si el fallecimiento es por accidente",
                invalidez_accidente: "Doble capital si la invalidez es por accidente",
                cancer_mama: "Capital fijo de 15.000€ por diagnóstico",
                enfermedades_graves: "Adelanto de capital por enfermedades graves"
            },
            informacion_importante: [
                "Se requiere cuestionario de salud para contratar",
                "Contratación posible hasta los 65 años",
                "Sin edad de salida (cobertura de por vida)",
                "Aumento de capital sin coste en eventos especiales (nacimiento, matrimonio)"
            ],
            factores_precio: [
                "Edad del asegurado",
                "Capital de indemnización deseado",
                "Profesión del asegurado",
                "Estado de salud y enfermedades preexistentes",
                "Hábitos (fumador/no fumador)",
                "Coberturas adicionales contratadas"
            ],
            ejemplo_precio: "Para una persona de 40 años, con 50.000€ de capital por fallecimiento e invalidez: aproximadamente 138€/año"
        },

        salud: {
            nombre: "Seguros de Salud",
            descripcion: "MAPFRE ofrece seguros de salud desde 18€ al mes, con opciones con y sin copago, y hasta un 28% de descuento.",
            modalidades: {
                eleccion: {
                    nombre: "Salud Elección (Básica)",
                    precio_desde: "15€/mes",
                    recomendado_para: "Quienes buscan cobertura básica sin hospitalización",
                    coberturas: [
                        "Medicina general",
                        "Pediatría",
                        "Urgencias con copago",
                        "Consultas de especialistas con descuento",
                        "Pruebas diagnósticas con descuento"
                    ],
                    copago: "Sí, copago en servicios"
                },
                plus: {
                    nombre: "Salud Plus (Con copago reducido)",
                    precio_desde: "54€/mes",
                    recomendado_para: "Quienes necesitan asistencia hospitalaria a precio reducido",
                    coberturas: [
                        "Asistencia hospitalaria completa",
                        "Asistencia especializada",
                        "Pruebas diagnósticas",
                        "Reproducción asistida",
                        "Adopción nacional",
                        "Urgencias",
                        "Sin copago en Centros Médicos MAPFRE"
                    ],
                    copago: "Copago reducido (exento en Centros MAPFRE)"
                },
                supra: {
                    nombre: "Salud Supra (Sin copago)",
                    precio_desde: "63€/mes",
                    recomendado_para: "Quienes desean cobertura completa sin copagos",
                    coberturas: [
                        "Asistencia médica completa sin copago",
                        "Hospitalización",
                        "Especialistas",
                        "Pruebas diagnósticas",
                        "Reproducción asistida",
                        "Red hospitalaria de EEUU",
                        "Urgencias en el extranjero hasta 12.000€"
                    ],
                    copago: "No"
                },
                reembolso: {
                    nombre: "Reembolso de Gastos Médicos",
                    precio_desde: "89€/mes",
                    recomendado_para: "Quienes quieren libertad total de elección de médico",
                    coberturas: [
                        "Libre elección de médico y hospital",
                        "Reembolso del 80-90% de gastos",
                        "Hasta 250.000€ en gastos hospitalarios",
                        "Cobertura mundial"
                    ],
                    copago: "No (sistema de reembolso)"
                },
                elite: {
                    nombre: "Reembolso Salud Élite",
                    precio_desde: "150€/mes",
                    recomendado_para: "Cobertura premium mundial sin límites prácticos",
                    coberturas: [
                        "Todo lo del Reembolso",
                        "Hasta 1.500.000€ en gastos médicos",
                        "Cualquier centro del mundo",
                        "Servicios premium"
                    ],
                    copago: "No"
                }
            },
            cobertura_dental: {
                precio: "8,34€/mes adicionales",
                nota: "Menores de 15 años gratis",
                servicios: [
                    "Revisiones y limpiezas",
                    "Empastes",
                    "Extracciones",
                    "Endodoncias con descuento",
                    "Ortodoncia con descuento"
                ]
            },
            servicios_incluidos: [
                "Orientación pediátrica 24h",
                "Orientación psicológica",
                "Telemedicina y videoconsultas",
                "Ecografía 4D",
                "Segunda opinión médica",
                "App de salud MAPFRE"
            ],
            periodos_carencia: {
                general: "La mayoría sin carencia",
                psicologia: "6 meses",
                reproduccion_asistida: "12 meses",
                hospitalizacion: "6 meses en algunos casos"
            },
            informacion_copagos: "El copago es una pequeña cantidad (1€ a 100€) que se abona al usar ciertos servicios. Se suma a la prima del mes siguiente. Sin copago en Centros Médicos MAPFRE."
        }
    },

    competidores: {
        allianz: {
            nombre: "Allianz",
            descripcion: "Número uno a nivel internacional, quinta en España por cuota de mercado.",
            fortalezas: ["Solidez financiera", "Amplia gama de coberturas", "Seguros RC adaptables"],
            debilidades: ["Peores valoraciones en seguros de hogar"],
            comparativa_mapfre: "MAPFRE ofrece mejor servicio post-siniestro y red de talleres más amplia"
        },
        axa: {
            nombre: "AXA",
            descripcion: "Mejor compañía internacional según Interbrand. Tercera en Forbes.",
            fortalezas: ["Agentes muy preparados", "Seguros de vida y ahorro competitivos", "Gestión de multas incluida"],
            debilidades: ["Atención vía call center", "Quejas en gestión de incidencias"],
            comparativa_mapfre: "MAPFRE tiene mejor atención presencial y más oficinas en España"
        },
        mutua_madrilena: {
            nombre: "Mutua Madrileña",
            descripcion: "Una de las tres líderes en España junto con VidaCaixa y MAPFRE.",
            fortalezas: ["Coberturas extensas", "Buena relación calidad-precio", "Buen servicio"],
            debilidades: ["Menos presencia fuera de Madrid"],
            comparativa_mapfre: "MAPFRE tiene mayor presencia nacional y más variedad de productos"
        },
        zurich: {
            nombre: "Zurich",
            descripcion: "Destaca por sus soluciones digitales.",
            fortalezas: ["Contratación 100% online", "Innovación digital", "Zurich Klinc muy competitivo"],
            debilidades: ["Menos oficinas físicas"],
            comparativa_mapfre: "MAPFRE combina digital y presencial, con más puntos de atención"
        },
        linea_directa: {
            nombre: "Línea Directa",
            descripcion: "Aseguradora low cost online.",
            fortalezas: ["Precios muy ajustados", "Proceso 100% online", "Rapidez en contratación"],
            debilidades: ["Coberturas más limitadas", "Solo atención telefónica"],
            comparativa_mapfre: "MAPFRE ofrece más coberturas, talleres propios y atención presencial"
        },
        sanitas: {
            nombre: "Sanitas",
            descripcion: "Especialista en seguros de salud.",
            fortalezas: ["Red médica muy amplia", "Especialización en salud", "Buenos hospitales propios"],
            debilidades: ["No ofrece otros tipos de seguros"],
            comparativa_mapfre: "MAPFRE ofrece un paquete integral (auto+hogar+vida+salud) con descuentos"
        },
        adeslas: {
            nombre: "Adeslas",
            descripcion: "Líder en seguros de salud en España.",
            fortalezas: ["Mayor red de cuadro médico", "Excelente reputación en salud"],
            debilidades: ["Solo seguros de salud"],
            comparativa_mapfre: "MAPFRE permite combinar seguros con descuentos y es más versátil"
        }
    },

    informacion_legal_espana: {
        seguro_obligatorio_auto: "El seguro de responsabilidad civil para vehículos es obligatorio en España según la Ley sobre Responsabilidad Civil y Seguro en la Circulación de Vehículos a Motor.",
        dgsfp: "La Dirección General de Seguros y Fondos de Pensiones (DGSFP) es el organismo regulador de los seguros en España.",
        derechos_asegurado: [
            "Derecho a recibir información clara antes de contratar",
            "Periodo de reflexión de 14 días para desistir",
            "Derecho a conocer las exclusiones de la póliza",
            "Reclamaciones ante el Servicio de Atención al Cliente",
            "Recurso al Defensor del Asegurado"
        ],
        iva_seguros: "Los seguros están exentos de IVA en España",
        impuesto_primas: "Se aplica el Impuesto sobre Primas de Seguros (IPS) del 8% en la mayoría de seguros"
    },

    estadisticas_espana: {
        mercado: "España es el sexto mercado asegurador de Europa",
        penetracion: "La penetración del seguro en España es de aproximadamente el 5% del PIB",
        hogar: "Solo el 75% de los hogares españoles tienen seguro de hogar",
        auto: "Más del 99% de los vehículos en España tienen seguro obligatorio",
        salud: "Más de 11 millones de españoles tienen seguro de salud privado",
        vida: "El 35% de los españoles tiene algún tipo de seguro de vida"
    },

    preguntas_frecuentes: {
        general: [
            {
                pregunta: "¿Por qué elegir MAPFRE?",
                respuesta: "MAPFRE es la segunda aseguradora más grande de España, con más de 90 años de experiencia, presencia en más de 40 países, solvencia garantizada, amplia red de oficinas y talleres, y atención 24/7."
            },
            {
                pregunta: "¿Cómo puedo contratar un seguro?",
                respuesta: "Puedes contratar online en mapfre.es, llamando al 918 365 365, o visitando cualquier oficina MAPFRE. También puedo ayudarte a calcular un presupuesto orientativo."
            },
            {
                pregunta: "¿Puedo combinar varios seguros?",
                respuesta: "Sí, MAPFRE ofrece descuentos por tener varios seguros contratados. Puedes ahorrar hasta un 20% combinando auto, hogar, vida y salud."
            }
        ]
    },

    promociones_actuales: {
        salud: "Hasta 28% de descuento y 5 meses gratis",
        viaje: "10% de descuento",
        auto: "Hasta 45% de descuento",
        hogar: "Servicio de manitas incluido"
    }
};

// Exportar para uso en el chatbot
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MAPFRE_KNOWLEDGE;
}
