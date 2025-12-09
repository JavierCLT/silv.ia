// SILVIA - Chatbot MAPFRE
// Aplicación principal

class SilviaChat {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.leadModal = document.getElementById('leadModal');
        this.leadForm = document.getElementById('leadForm');
        this.closeModalBtn = document.getElementById('closeModal');
        this.successMessage = document.getElementById('successMessage');
        this.insuranceButtons = document.querySelectorAll('.insurance-btn');

        this.currentInsuranceType = 'auto';
        this.conversationHistory = [];
        this.leads = [];
        this.isTyping = false;

        this.init();
    }

    init() {
        // Event listeners
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Botones de tipo de seguro
        this.insuranceButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectInsuranceType(btn));
        });

        // Modal de leads
        this.closeModalBtn.addEventListener('click', () => this.hideLeadModal());
        this.leadForm.addEventListener('submit', (e) => this.handleLeadSubmit(e));
        this.leadModal.addEventListener('click', (e) => {
            if (e.target === this.leadModal) this.hideLeadModal();
        });

        // Mostrar mensaje de bienvenida
        this.showWelcomeMessage();
    }

    selectInsuranceType(btn) {
        this.insuranceButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentInsuranceType = btn.dataset.type;

        // Mostrar sugerencias para este tipo
        this.showSuggestions();
    }

    showWelcomeMessage() {
        this.addMessage(CONFIG.WELCOME_MESSAGE, 'bot');
        this.showSuggestions();
    }

    showSuggestions() {
        const suggestions = CONFIG.QUICK_SUGGESTIONS[this.currentInsuranceType];
        if (!suggestions) return;

        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'quick-actions';

        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.textContent = suggestion;
            btn.addEventListener('click', () => {
                this.userInput.value = suggestion;
                this.sendMessage();
            });
            suggestionsContainer.appendChild(btn);
        });

        this.chatMessages.appendChild(suggestionsContainer);
        this.scrollToBottom();
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        if (type === 'bot') {
            const nameSpan = document.createElement('div');
            nameSpan.className = 'bot-name';
            nameSpan.textContent = CONFIG.AGENT_NAME;
            messageDiv.appendChild(nameSpan);
        }

        // Formatear el contenido (convertir markdown básico)
        const formattedContent = this.formatMessage(content);
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = formattedContent;
        messageDiv.appendChild(contentDiv);

        this.chatMessages.appendChild(messageDiv);

        // Scroll al inicio del nuevo mensaje (no al final)
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    formatMessage(content) {
        // Convertir markdown básico a HTML
        let formatted = content
            // Negrita
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Cursiva
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Saltos de línea
            .replace(/\n/g, '<br>')
            // Listas con viñetas
            .replace(/^[•\-]\s(.+)/gm, '<li>$1</li>')
            // Precios destacados
            .replace(/(\d+€\/(?:año|mes))/g, '<strong style="color: #DA291C;">$1</strong>');

        // Envolver listas
        if (formatted.includes('<li>')) {
            formatted = formatted.replace(/(<li>.*<\/li>)+/g, '<ul class="message-list">$&</ul>');
        }

        return formatted;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message || this.isTyping) return;

        // Añadir mensaje del usuario
        this.addMessage(message, 'user');
        this.userInput.value = '';

        // Guardar en historial
        this.conversationHistory.push({
            role: 'user',
            content: message
        });

        // Limitar historial
        if (this.conversationHistory.length > CONFIG.MAX_HISTORY * 2) {
            this.conversationHistory = this.conversationHistory.slice(-CONFIG.MAX_HISTORY * 2);
        }

        // Verificar si debe mostrar modal de leads
        if (this.shouldShowLeadModal(message)) {
            this.showLeadModal();
        }

        // Mostrar indicador de escritura
        this.isTyping = true;
        this.sendBtn.classList.add('loading');
        this.sendBtn.disabled = true;
        this.showTypingIndicator();

        try {
            const response = await this.callAPI(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');

            // Guardar respuesta en historial
            this.conversationHistory.push({
                role: 'assistant',
                content: response
            });

        } catch (error) {
            this.hideTypingIndicator();
            console.error('Error:', error);
            this.addMessage('Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo o llámanos al 918 365 365.', 'bot');
        } finally {
            this.isTyping = false;
            this.sendBtn.classList.remove('loading');
            this.sendBtn.disabled = false;
            this.userInput.focus();
        }
    }

    async callAPI(userMessage) {
        // Construir el contexto con la base de conocimiento
        const systemPrompt = this.buildSystemPrompt();

        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage,
                    history: this.conversationHistory.slice(-CONFIG.MAX_HISTORY * 2),
                    insuranceType: this.currentInsuranceType,
                    systemPrompt: systemPrompt
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response || data.message || 'Lo siento, no pude procesar tu solicitud.';

        } catch (error) {
            console.error('API Error:', error);

            // Si el backend no está disponible, usar respuesta local
            return this.getLocalResponse(userMessage);
        }
    }

    buildSystemPrompt() {
        return `Eres SILVIA, la asistente virtual de seguros MAPFRE España. Eres una agente exclusiva de MAPFRE.

REGLAS IMPORTANTES:
1. SOLO puedes responder preguntas sobre seguros (auto, hogar, vida, salud) de MAPFRE España.
2. Si te preguntan sobre otros temas que NO sean seguros, responde amablemente que solo puedes ayudar con temas de seguros.
3. Tus respuestas deben ser BREVES pero eficaces (máximo 3-4 párrafos cortos).
4. Usa la información de la base de conocimiento de MAPFRE para responder con precisión.
5. Cuando hables de precios, aclara que son ORIENTATIVOS y que para un presupuesto personalizado deben dejar sus datos.
6. Sé amable y profesional, usando un tono cercano pero profesional.
7. Cuando sea apropiado, anima al usuario a dejar su nombre y teléfono para contacto por WhatsApp.
8. Solo habla del mercado de seguros de ESPAÑA, legislación española y competidores españoles.
9. Puedes comparar MAPFRE con competidores, pero siempre destacando las ventajas de MAPFRE.
10. Si preguntan por un presupuesto exacto, indica que necesitas sus datos de contacto para darlo.

INFORMACIÓN CLAVE DE MAPFRE:
- Teléfono atención: 918 365 365
- Es la 2ª aseguradora más grande de España
- Más de 90 años de experiencia
- Asistencia 24/7

El usuario está consultando sobre: ${this.currentInsuranceType === 'general' ? 'seguros en general' : 'seguro de ' + this.currentInsuranceType}

BASE DE CONOCIMIENTO:
${JSON.stringify(MAPFRE_KNOWLEDGE, null, 2)}`;
    }

    getLocalResponse(userMessage) {
        // Respuestas locales de respaldo cuando el API no está disponible
        const msg = userMessage.toLowerCase();

        // Detectar intención básica
        if (msg.includes('precio') || msg.includes('cuánto') || msg.includes('cuesta') || msg.includes('presupuesto')) {
            return this.getPriceResponse();
        }

        if (msg.includes('cobertura') || msg.includes('cubre') || msg.includes('incluye')) {
            return this.getCoverageResponse();
        }

        if (msg.includes('contratar') || msg.includes('cómo')) {
            return `Para contratar tu seguro MAPFRE tienes varias opciones:

• **Online**: En mapfre.es puedes calcular y contratar 24/7
• **Teléfono**: Llámanos al 918 365 365
• **Presencial**: Visita cualquier oficina MAPFRE

¿Te gustaría que te contactemos por WhatsApp para darte un presupuesto personalizado? Solo necesito tu nombre y teléfono.`;
        }

        if (msg.includes('ventaja') || msg.includes('por qué') || msg.includes('elegir')) {
            return `**¿Por qué elegir MAPFRE?**

• 2ª aseguradora más grande de España
• Más de 90 años de experiencia
• Presencia en más de 40 países
• Asistencia 24/7
• Amplia red de oficinas y talleres
• Descuentos por combinar seguros

¿En qué tipo de seguro estás interesado?`;
        }

        // Respuesta genérica
        return `Gracias por tu consulta sobre seguros. Como asistente de MAPFRE, puedo ayudarte con información sobre:

• 🚗 Seguros de Auto (desde 219€/año)
• 🏠 Seguros de Hogar (desde 120€/año)
• ❤️ Seguros de Vida (desde 80€/año)
• 🏥 Seguros de Salud (desde 15€/mes)

¿Sobre cuál te gustaría saber más?`;
    }

    getPriceResponse() {
        const type = this.currentInsuranceType;
        const prices = {
            auto: `**Precios orientativos de Seguro de Auto MAPFRE:**

• Terceros Básico: desde **219€/año**
• Terceros Ampliado: desde **280€/año**
• Todo Riesgo con franquicia: desde **335€/año**
• Todo Riesgo sin franquicia: desde **450€/año**

El precio final depende de tu edad, vehículo, historial y código postal.

*¿Quieres un presupuesto exacto? Déjame tu nombre y teléfono y te contactamos por WhatsApp.*`,
            hogar: `**Precios orientativos de Seguro de Hogar MAPFRE:**

• Hogar Tú Eliges (básico): desde **100€/año**
• Hogar Familiar: desde **250€/año**
• Hogar Platino (premium): desde **400€/año**

El precio varía según los m², ubicación, año de construcción y coberturas.

*¿Quieres un presupuesto personalizado? Déjame tu nombre y teléfono.*`,
            vida: `**Precios orientativos de Seguro de Vida MAPFRE:**

• Confianza Vida: desde **80€/año**
• CreciVida: desde **100€/año**
• Familife: desde **90€/año**

Ejemplo: persona de 40 años con 50.000€ de capital: aprox. 138€/año.

*Para un precio exacto necesito algunos datos. ¿Te contactamos por WhatsApp?*`,
            salud: `**Precios orientativos de Seguro de Salud MAPFRE:**

• Salud Elección (básica): desde **15€/mes**
• Salud Plus (con copago): desde **54€/mes**
• Salud Supra (sin copago): desde **63€/mes**
• Reembolso: desde **89€/mes**

Ahora hay hasta **5 meses gratis** en algunos planes.

*¿Quieres que te calculemos el precio exacto? Déjame tus datos.*`,
            general: `**Precios orientativos MAPFRE 2025:**

• 🚗 Auto: desde **219€/año**
• 🏠 Hogar: desde **120€/año**
• ❤️ Vida: desde **80€/año**
• 🏥 Salud: desde **15€/mes**

Selecciona el tipo de seguro arriba para más detalles.

*Para un presupuesto personalizado, déjame tu nombre y teléfono.*`
        };

        return prices[type] || prices.general;
    }

    getCoverageResponse() {
        const type = this.currentInsuranceType;
        const coverages = {
            auto: `**Coberturas del Seguro de Auto MAPFRE:**

**Terceros Básico:**
• Responsabilidad Civil
• Defensa jurídica
• Asistencia desde km 0
• Seguro del conductor

**Terceros Ampliado (añade):**
• Rotura de lunas
• Incendio y robo
• Daños por robo

**Todo Riesgo (añade):**
• Daños propios
• Libre elección de taller
• Valor a nuevo 2 años

¿Cuál se adapta mejor a tu vehículo?`,
            hogar: `**Coberturas del Seguro de Hogar MAPFRE:**

**Básicas:**
• Incendio y explosión
• Daños por agua
• Responsabilidad civil
• Robo

**Hogar Familiar (añade):**
• Fenómenos atmosféricos
• Daños eléctricos
• Rotura de cristales
• Servicio de bricolaje

**Platino (añade):**
• Todo Riesgo Accidental
• Objetos de valor hasta 12.000€
• Daños estéticos hasta 6.000€

¿Qué nivel de protección buscas?`,
            vida: `**Coberturas del Seguro de Vida MAPFRE:**

**Coberturas básicas:**
• Fallecimiento por cualquier causa
• Invalidez permanente y absoluta

**Opcionales:**
• Doble capital por accidente
• Enfermedades graves
• Cáncer de mama (15.000€)
• Dependencia

**Servicios incluidos:**
• Telemedicina 24/7
• Videoconsultas
• Asistencia informática

Capital asegurable: de 25.000€ a 1.000.000€`,
            salud: `**Coberturas del Seguro de Salud MAPFRE:**

**Elección (básica):**
• Medicina general
• Pediatría
• Urgencias

**Plus / Supra (añaden):**
• Hospitalización
• Especialistas
• Pruebas diagnósticas
• Reproducción asistida

**Servicios incluidos:**
• Telemedicina 24h
• App de salud
• Segunda opinión médica
• Orientación psicológica

**Dental opcional:** 8,34€/mes (menores de 15 gratis)`,
            general: `MAPFRE ofrece coberturas completas en todos sus seguros:

• 🚗 **Auto**: desde responsabilidad civil hasta todo riesgo
• 🏠 **Hogar**: protección del continente, contenido y RC
• ❤️ **Vida**: fallecimiento, invalidez y enfermedades graves
• 🏥 **Salud**: desde básica hasta reembolso premium

Selecciona el tipo de seguro arriba para ver las coberturas detalladas.`
        };

        return coverages[type] || coverages.general;
    }

    shouldShowLeadModal(message) {
        const msg = message.toLowerCase();
        return CONFIG.LEAD_TRIGGERS.some(trigger => msg.includes(trigger));
    }

    showLeadModal() {
        const insuranceLabels = {
            general: 'Seguros MAPFRE',
            auto: 'Seguro de Auto',
            hogar: 'Seguro de Hogar',
            vida: 'Seguro de Vida',
            salud: 'Seguro de Salud'
        };

        document.getElementById('leadInsurance').value = insuranceLabels[this.currentInsuranceType];
        this.leadModal.classList.add('active');
        this.successMessage.style.display = 'none';
        this.leadForm.style.display = 'block';
        document.getElementById('leadName').focus();
    }

    hideLeadModal() {
        this.leadModal.classList.remove('active');
    }

    handleLeadSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('leadName').value.trim();
        const phone = document.getElementById('leadPhone').value.trim();
        const insurance = document.getElementById('leadInsurance').value;

        if (!name || !phone) return;

        // Guardar lead
        const lead = {
            name,
            phone,
            insurance,
            timestamp: new Date().toISOString(),
            conversationHistory: [...this.conversationHistory]
        };

        this.leads.push(lead);

        // Guardar en localStorage
        this.saveLeads();

        // Enviar lead por email
        this.sendLeadByEmail(lead);

        // Mostrar mensaje de éxito
        this.leadForm.style.display = 'none';
        this.successMessage.style.display = 'flex';

        // Añadir mensaje en el chat
        setTimeout(() => {
            this.hideLeadModal();
            this.addMessage(`¡Perfecto ${name}! 🎉 Hemos registrado tu solicitud. Te contactaremos pronto por WhatsApp al ${phone} para darte un presupuesto personalizado de ${insurance}.

Mientras tanto, ¿hay algo más en lo que pueda ayudarte?`, 'bot');
        }, 2000);

        // Limpiar formulario
        this.leadForm.reset();
    }

    sendLeadByEmail(lead) {
        // Verificar si EmailJS está configurado
        if (!CONFIG.EMAILJS || !CONFIG.EMAILJS.enabled) {
            console.log('EmailJS no configurado, lead guardado solo en localStorage');
            return;
        }

        // Inicializar EmailJS
        emailjs.init(CONFIG.EMAILJS.publicKey);

        // Preparar datos para el email
        const templateParams = {
            lead_name: lead.name,
            lead_phone: lead.phone,
            lead_insurance: lead.insurance,
            lead_date: new Date().toLocaleString('es-ES'),
            conversation_summary: this.getConversationSummary()
        };

        // Enviar email
        emailjs.send(
            CONFIG.EMAILJS.serviceId,
            CONFIG.EMAILJS.templateId,
            templateParams
        ).then(
            (response) => {
                console.log('Lead enviado por email correctamente', response);
            },
            (error) => {
                console.error('Error al enviar lead por email:', error);
            }
        );
    }

    getConversationSummary() {
        // Obtener últimos mensajes relevantes
        const lastMessages = this.conversationHistory.slice(-6);
        if (lastMessages.length === 0) return 'Sin conversación previa';

        return lastMessages
            .map(msg => `${msg.role === 'user' ? '👤' : '🤖'} ${msg.content.substring(0, 100)}...`)
            .join('\n');
    }

    saveLeads() {
        try {
            localStorage.setItem('silvia_leads', JSON.stringify(this.leads));
        } catch (e) {
            console.log('No se pudo guardar en localStorage');
        }
    }

    loadLeads() {
        try {
            const saved = localStorage.getItem('silvia_leads');
            if (saved) {
                this.leads = JSON.parse(saved);
            }
        } catch (e) {
            console.log('No se pudo cargar de localStorage');
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.silviaChat = new SilviaChat();
});
