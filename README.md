# SILVIA - Asistente Virtual de Seguros MAPFRE

Chatbot inteligente para consultas sobre seguros de Auto, Hogar, Vida y Salud de MAPFRE España.

## Características

- Respuestas sobre seguros MAPFRE (Auto, Hogar, Vida, Salud)
- Precios orientativos actualizados 2025
- Comparativa con competidores
- Sistema de captura de leads (nombre + teléfono para WhatsApp)
- Colores corporativos MAPFRE
- Diseño responsive
- Funciona offline con respuestas locales de respaldo

## Demo

[Ver demo en GitHub Pages](https://javierclt.github.io/silv.ia)

## Estructura del Proyecto

```
silv.ia/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos con colores MAPFRE
├── js/
│   ├── app.js              # Lógica del chatbot
│   ├── config.js           # Configuración
│   └── mapfre-knowledge.js # Base de conocimiento
├── worker/
│   ├── index.js            # Cloudflare Worker (backend)
│   └── wrangler.toml       # Config de Cloudflare
├── .env.example            # Ejemplo de variables de entorno
└── README.md               # Este archivo
```

## Instalación

### Paso 1: Desplegar el Frontend (GitHub Pages)

1. Sube este repositorio a GitHub
2. Ve a Settings > Pages
3. Selecciona "Deploy from a branch" > "main" > "/ (root)"
4. Tu sitio estará en: `https://tuusuario.github.io/silv.ia`

### Paso 2: Desplegar el Backend (Cloudflare Workers)

El backend es necesario para conectar con la API de Claude. Cloudflare Workers ofrece 100,000 peticiones/día gratis.

#### Opción A: Desde el Dashboard de Cloudflare (más fácil)

1. Crea una cuenta en [Cloudflare](https://dash.cloudflare.com/sign-up)
2. Ve a **Workers & Pages** > **Create Application** > **Create Worker**
3. Dale un nombre (ej: `silvia-mapfre`)
4. Copia el contenido de `worker/index.js` y pégalo
5. Click en **Deploy**
6. Ve a **Settings** > **Variables and Secrets**
7. Añade una nueva variable:
   - Nombre: `ANTHROPIC_API_KEY`
   - Valor: Tu clave API de Anthropic
   - Tipo: **Secret** (importante para seguridad)
8. Copia la URL de tu worker (ej: `https://silvia-mapfre.tuusuario.workers.dev`)

#### Opción B: Con Wrangler CLI

```bash
# Instalar Wrangler
npm install -g wrangler

# Login en Cloudflare
wrangler login

# Ir al directorio del worker
cd worker

# Configurar el secreto
wrangler secret put ANTHROPIC_API_KEY
# (introduce tu API key cuando te lo pida)

# Desplegar
wrangler deploy
```

### Paso 3: Conectar Frontend con Backend

1. Abre `js/config.js`
2. Cambia `API_URL` por la URL de tu Worker:

```javascript
API_URL: 'https://silvia-mapfre.tuusuario.workers.dev/chat',
```

3. Sube los cambios a GitHub

## Obtener Clave API de Anthropic

1. Ve a [console.anthropic.com](https://console.anthropic.com/)
2. Crea una cuenta o inicia sesión
3. Ve a **API Keys**
4. Click en **Create Key**
5. Copia la clave (empieza por `sk-ant-...`)

**Importante**: La clave tiene coste por uso. Revisa los [precios de Anthropic](https://www.anthropic.com/pricing).

## Personalización

### Cambiar información del agente

Edita `js/config.js`:

```javascript
AGENT_INFO: {
    nombre: 'Tu Nombre',
    telefono: 'Tu teléfono',
    whatsapp: true
}
```

### Añadir más productos/información

Edita `js/mapfre-knowledge.js` para añadir o modificar la base de conocimiento.

### Cambiar colores

Edita las variables CSS en `css/style.css`:

```css
:root {
    --mapfre-red: #DA291C;
    --mapfre-red-dark: #B71C1C;
    /* ... */
}
```

## Sistema de Leads

Los leads capturados se guardan en:
1. **localStorage** del navegador (para demo)
2. Puedes añadir integración con tu CRM modificando la función `handleLeadSubmit` en `app.js`

Para exportar leads del localStorage:
```javascript
console.log(JSON.parse(localStorage.getItem('silvia_leads')));
```

## Desarrollo Local

Para probar localmente:

1. Usa un servidor local (ej: Live Server de VSCode)
2. O ejecuta: `npx serve .`
3. El chatbot funcionará con respuestas locales de respaldo

## Seguridad

- La clave API está protegida en Cloudflare Workers (nunca se expone al cliente)
- El Worker solo acepta peticiones de orígenes autorizados (CORS)
- Los leads se almacenan localmente (añade tu propia integración para producción)

## Limitaciones

- Solo responde sobre seguros MAPFRE España
- Los precios son orientativos (actualizados a 2025)
- Requiere conexión a internet para respuestas de IA (hay respaldo offline)

## Soporte

- Teléfono MAPFRE: 918 365 365
- Email: [tu email]

## Licencia

Proyecto privado para uso comercial de agente exclusiva MAPFRE.

---

Desarrollado con Claude AI
