// Configuración de SILVIA - Chatbot MAPFRE
// IMPORTANTE: Este archivo contiene la configuración del chatbot

const CONFIG = {
    // URL del backend (Cloudflare Worker)
    // Cambia esto a tu URL de Cloudflare Worker cuando lo despliegues
    API_URL: 'https://silvia.javierss-usa.workers.dev/chat',

    // Para desarrollo local, puedes usar:
    // API_URL: 'http://localhost:8787/chat',

    // Nombre del agente
    AGENT_NAME: 'SILVIA',

    // Información del agente MAPFRE
    AGENT_INFO: {
        nombre: 'Tu Agente MAPFRE',
        telefono: '918 365 365',
        whatsapp: true
    },

    // Tu número de WhatsApp para recibir leads (formato: código país + número, sin + ni espacios)
    // Ejemplo España: 34612345678
    AGENT_WHATSAPP: '34600000000', // ⚠️ CAMBIA ESTO POR TU NÚMERO REAL

    // Configuración de EmailJS para recibir leads por email
    // Regístrate gratis en https://www.emailjs.com/
    EMAILJS: {
        enabled: true,
        publicKey: 'TU_PUBLIC_KEY',      // ⚠️ CAMBIA ESTO
        serviceId: 'TU_SERVICE_ID',       // ⚠️ CAMBIA ESTO
        templateId: 'TU_TEMPLATE_ID'      // ⚠️ CAMBIA ESTO
    },

    // Mensaje de bienvenida
    WELCOME_MESSAGE: `¡Hola! Soy SILVIA, tu asistente virtual de seguros MAPFRE. 👋

Puedo ayudarte con información sobre:
• 🚗 Seguros de Auto
• 🏠 Seguros de Hogar
• ❤️ Seguros de Vida
• 🏥 Seguros de Salud

También puedo darte presupuestos orientativos. ¿En qué puedo ayudarte hoy?`,

    // Sugerencias rápidas por tipo de seguro
    QUICK_SUGGESTIONS: {
        general: [
            '¿Qué seguros ofrece MAPFRE?',
            '¿Por qué elegir MAPFRE?',
            '¿Cómo puedo contratar?'
        ],
        auto: [
            '¿Cuánto cuesta un seguro a terceros?',
            '¿Qué cubre el todo riesgo?',
            'Quiero un presupuesto de auto'
        ],
        hogar: [
            '¿Qué cubre el seguro de hogar?',
            '¿Cuál es el precio del seguro familiar?',
            'Quiero un presupuesto de hogar'
        ],
        vida: [
            '¿Qué tipos de seguro de vida hay?',
            '¿Cuánto cuesta un seguro de vida?',
            'Quiero proteger a mi familia'
        ],
        salud: [
            '¿Qué modalidades de salud hay?',
            '¿Cuánto cuesta un seguro sin copago?',
            'Comparar opciones de salud'
        ]
    },

    // Palabras clave que activan el modal de leads
    LEAD_TRIGGERS: [
        'presupuesto',
        'precio exacto',
        'contratar',
        'cuánto me costaría',
        'precio personalizado',
        'mi caso',
        'mi situación',
        'calcular precio',
        'cotización',
        'cotizar'
    ],

    // Máximo de mensajes en el historial (para no sobrecargar la API)
    MAX_HISTORY: 10
};

// No modificar - Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
