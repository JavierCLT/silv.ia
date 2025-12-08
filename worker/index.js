/**
 * SILVIA - Cloudflare Worker Backend
 * Proxy para la API de Claude (Anthropic)
 *
 * INSTRUCCIONES DE DESPLIEGUE:
 * 1. Crea una cuenta en Cloudflare (gratis)
 * 2. Ve a Workers & Pages > Create Application > Create Worker
 * 3. Pega este código
 * 4. En Settings > Variables, añade: ANTHROPIC_API_KEY = tu_clave_api
 * 5. Despliega y copia la URL del worker
 * 6. Actualiza CONFIG.API_URL en js/config.js con tu URL
 */

// Configuración
const ALLOWED_ORIGINS = [
    'https://javierclt.github.io',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:5500', // Live Server VSCode
    'null' // Para archivos locales
];

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-5-20250929';
const MAX_TOKENS = 1024;

// Headers CORS
function getCorsHeaders(origin) {
    const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    return {
        'Access-Control-Allow-Origin': allowedOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    };
}

// Manejar peticiones
export default {
    async fetch(request, env, ctx) {
        const origin = request.headers.get('Origin') || '';
        const corsHeaders = getCorsHeaders(origin);

        // Manejar preflight CORS
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // Solo permitir POST para /chat
        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        try {
            const body = await request.json();
            const { message, history, insuranceType, systemPrompt } = body;

            if (!message) {
                return new Response(JSON.stringify({ error: 'Message is required' }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            // Verificar que existe la API key
            if (!env.ANTHROPIC_API_KEY) {
                return new Response(JSON.stringify({
                    error: 'API key not configured',
                    response: getFallbackResponse(message, insuranceType)
                }), {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            // Construir mensajes para Claude
            const messages = buildMessages(history, message);

            // Llamar a la API de Claude
            const claudeResponse = await fetch(ANTHROPIC_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': env.ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: MODEL,
                    max_tokens: MAX_TOKENS,
                    system: systemPrompt || getDefaultSystemPrompt(insuranceType),
                    messages: messages
                })
            });

            if (!claudeResponse.ok) {
                const errorText = await claudeResponse.text();
                console.error('Claude API error:', errorText);
                return new Response(JSON.stringify({
                    error: 'API error',
                    response: getFallbackResponse(message, insuranceType)
                }), {
                    status: 200,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            const claudeData = await claudeResponse.json();
            const responseText = claudeData.content?.[0]?.text || 'Lo siento, no pude procesar tu solicitud.';

            return new Response(JSON.stringify({ response: responseText }), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });

        } catch (error) {
            console.error('Worker error:', error);
            return new Response(JSON.stringify({
                error: 'Internal server error',
                message: error.message
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }
};

function buildMessages(history, currentMessage) {
    const messages = [];

    // Añadir historial si existe
    if (history && Array.isArray(history)) {
        for (const msg of history.slice(-10)) { // Últimos 10 mensajes
            if (msg.role === 'user' || msg.role === 'assistant') {
                messages.push({
                    role: msg.role,
                    content: msg.content
                });
            }
        }
    }

    // Añadir mensaje actual
    messages.push({
        role: 'user',
        content: currentMessage
    });

    return messages;
}

function getDefaultSystemPrompt(insuranceType) {
    return `Eres SILVIA, la asistente virtual de seguros MAPFRE España. Eres una agente exclusiva de MAPFRE.

REGLAS IMPORTANTES:
1. SOLO puedes responder preguntas sobre seguros (auto, hogar, vida, salud) de MAPFRE España.
2. Si te preguntan sobre otros temas que NO sean seguros, responde amablemente que solo puedes ayudar con temas de seguros.
3. Tus respuestas deben ser BREVES pero eficaces (máximo 3-4 párrafos cortos).
4. Cuando hables de precios, aclara que son ORIENTATIVOS y que para un presupuesto personalizado deben dejar sus datos.
5. Sé amable y profesional, usando un tono cercano pero profesional.
6. Cuando sea apropiado, anima al usuario a dejar su nombre y teléfono para contacto por WhatsApp.
7. Solo habla del mercado de seguros de ESPAÑA, legislación española y competidores españoles.
8. Puedes comparar MAPFRE con competidores, pero siempre destacando las ventajas de MAPFRE.

INFORMACIÓN CLAVE:
- Teléfono atención: 918 365 365
- MAPFRE es la 2ª aseguradora más grande de España
- Más de 90 años de experiencia
- Asistencia 24/7

PRECIOS ORIENTATIVOS 2025:
- Auto Terceros: desde 219€/año
- Auto Todo Riesgo: desde 335€/año
- Hogar: desde 120€/año
- Vida: desde 80€/año
- Salud: desde 15€/mes

El usuario consulta sobre: ${insuranceType || 'seguros en general'}`;
}

function getFallbackResponse(message, insuranceType) {
    const msg = message.toLowerCase();

    if (msg.includes('precio') || msg.includes('cuánto') || msg.includes('cuesta')) {
        const prices = {
            auto: 'El seguro de Auto MAPFRE tiene precios desde 219€/año (terceros) hasta 450€/año (todo riesgo). El precio exacto depende de tu perfil. ¿Te gustaría un presupuesto personalizado?',
            hogar: 'El seguro de Hogar MAPFRE tiene precios desde 120€/año. Depende de los m², ubicación y coberturas. ¿Quieres que te calculemos un presupuesto?',
            vida: 'El seguro de Vida MAPFRE tiene precios desde 80€/año. Depende de tu edad y el capital deseado. ¿Te damos un presupuesto personalizado?',
            salud: 'El seguro de Salud MAPFRE tiene precios desde 15€/mes (con copago) a 63€/mes (sin copago). Ahora hay hasta 5 meses gratis. ¿Te interesa más información?'
        };
        return prices[insuranceType] || 'MAPFRE ofrece seguros desde 80€/año (vida), 120€/año (hogar), 219€/año (auto) y 15€/mes (salud). ¿Sobre cuál quieres más información?';
    }

    if (msg.includes('cobertura') || msg.includes('incluye') || msg.includes('cubre')) {
        return 'Los seguros MAPFRE incluyen amplias coberturas adaptadas a tus necesidades. Desde responsabilidad civil básica hasta todo riesgo. ¿Qué tipo de seguro te interesa: auto, hogar, vida o salud?';
    }

    return 'Gracias por tu consulta. Como asistente de MAPFRE, puedo ayudarte con seguros de Auto, Hogar, Vida y Salud. ¿En cuál estás interesado?';
}
