// Todo el texto de la página, en los dos idiomas. Los números salen del CV y
// de los repos (69 tests en QaTest, 22 pruebas de Postman, 139 E2E en MojonApp,
// 52 pruebas y US$ 0,0015 por mensaje en el bot).

export type Idioma = "es" | "en";

const GITHUB = "https://github.com/matitrova";

export const ENLACES = {
  email: "mailto:matitrova13@gmail.com",
  linkedin: "https://www.linkedin.com/in/matias-trovato",
  github: GITHUB,
};

export const HERRAMIENTAS = [
  "Python", "Pytest", "Playwright", "Postman", "Newman", "SQL Server", "Jira",
  "Git", "GitHub Actions", "JavaScript", "React", "Flask", "Firebase", "Claude API",
];

export const TEXTOS = {
  es: {
    menu: { proyectos: "Proyectos", experiencia: "Experiencia", herramientas: "Herramientas", contacto: "Contacto" },
    cambiarIdioma: "English",
    portada: {
      nombre: "Matías Trovato",
      bajada: "QA Engineer · IA aplicada",
      bajar: "Bajá para entrar",
      lugar: "Merlo, San Luis · Trabajo remoto",
      frase: "Pruebo, automatizo y construyo",
      giros: ["software que no se rompe", "productos con IA", "páginas que venden"],
      resumen:
        "Cuatro años como único responsable de la calidad de una plataforma de facturación en producción. Hoy además construyo productos con IA: una app para inmobiliarias y un bot que agenda turnos solo.",
      verProyectos: "Ver proyectos",
      escribime: "Escribime",
    },
    proyectos: {
      titulo: "Proyectos",
      bajada: "Cosas que hice, publiqué y probé de punta a punta.",
      items: [
        {
          heading: "MojonApp",
          paragraph:
            "Visor de lotes para una inmobiliaria de las sierras de San Luis: mapa satelital, catastro y gestión de corredores. La hice, la publiqué y la mantengo solo.",
          list: [
            "139 pruebas end-to-end con Pytest y Playwright, en GitHub Actions",
            "Dos funciones de IA sobre la API de Claude, con sus propios tests",
            "Base de pruebas separada de producción, después de un incidente real",
          ],
          link: { href: `${GITHUB}/mojonapp`, text: "Ver el código" },
          visual: "mojonapp",
        },
        {
          heading: "Bot de turnos por WhatsApp",
          paragraph:
            "Lee la charla entre un lavadero y sus clientes y, cuando acuerdan día y hora, agenda el turno en Google Calendar. No le contesta a nadie: trabaja en silencio.",
          list: [
            "Una sola llamada al modelo por tanda de mensajes: US$ 0,0015 por mensaje",
            "52 pruebas: 38 del servidor y 14 conversaciones, 9 sacadas de charlas reales",
            "Los permisos viven en el código, no en el prompt",
          ],
          link: { href: `${GITHUB}/bot-turnos-whatsapp`, text: "Ver el código" },
          visual: "bot",
        },
        {
          heading: "Páginas para negocios",
          paragraph:
            "Landings a medida para comercios. AutoShine, un lavadero de Merlo, recibe pedidos de turno por WhatsApp desde su página.",
          list: [
            "Diseño a partir del Instagram real del negocio",
            "Un formulario que arma el mensaje de WhatsApp",
            "¿Querés una para tu negocio? Escribime",
          ],
          link: { href: "#contacto", text: "Pedí la tuya" },
          visual: "paginas",
        },
        {
          heading: "QA y automatización",
          paragraph:
            "Siete suites sobre interfaces y APIs distintas, y la automatización del alta de abonados en el sistema real de ISPBoss.",
          list: [
            "69 pruebas en Pytest y Playwright con Page Object Model",
            "22 pruebas de API en Postman, corriendo con Newman en CI",
            "Validación de datos con consultas a SQL Server",
          ],
          link: { href: `${GITHUB}/QaTest`, text: "Ver el código" },
          visual: "qa",
        },
      ],
    },
    experiencia: {
      titulo: "Experiencia",
      items: [
        {
          fecha: "2026",
          puesto: "Productos propios",
          lugar: "MojonApp · Bot de turnos",
          texto: "Diseño, desarrollo, pruebas y publicación, sin equipo: del primer commit a producción.",
        },
        {
          fecha: "2022 — 2026",
          puesto: "Responsable de QA, Soporte y Capacitación",
          lugar: "CHRS Software · ISPBoss",
          texto:
            "Único responsable de la calidad de una plataforma de facturación para proveedores de internet: casos de prueba priorizados por riesgo, regresión y carga en cada release, defectos en Jira y datos validados en SQL Server.",
        },
        {
          fecha: "2021 — 2022",
          puesto: "QA Tester",
          lugar: "Bixe App",
          texto: "Testing exploratorio de las apps de pasajero y de conductor en Android e iOS, antes de las primeras versiones públicas.",
        },
      ],
    },
    herramientas: { titulo: "Herramientas" },
    contacto: {
      titulo: "¿Hablamos?",
      texto: "Busco trabajo remoto en QA, automatización o desarrollo con IA. También hago páginas para negocios.",
      email: "Mandame un mail",
      pie: "Hecho con React, GSAP y Framer Motion.",
    },
  },
  en: {
    menu: { proyectos: "Projects", experiencia: "Experience", herramientas: "Stack", contacto: "Contact" },
    cambiarIdioma: "Español",
    portada: {
      nombre: "Matías Trovato",
      bajada: "QA Engineer · Applied AI",
      bajar: "Scroll to enter",
      lugar: "Merlo, San Luis, Argentina · Remote",
      frase: "I test, automate and build",
      giros: ["software that doesn't break", "AI-powered products", "websites that sell"],
      resumen:
        "Four years as the sole person responsible for quality on a production billing platform. Now I also build AI products: an app for real estate agencies and a bot that books appointments on its own.",
      verProyectos: "See projects",
      escribime: "Get in touch",
    },
    proyectos: {
      titulo: "Projects",
      bajada: "Things I built, shipped and tested end to end.",
      items: [
        {
          heading: "MojonApp",
          paragraph:
            "Lot viewer for a real estate agency in the San Luis hills: satellite map, cadastre and broker management. Built, shipped and maintained solo.",
          list: [
            "139 end-to-end tests with Pytest and Playwright, on GitHub Actions",
            "Two AI features on the Claude API, with their own tests",
            "Test database kept apart from production, after a real incident",
          ],
          link: { href: `${GITHUB}/mojonapp`, text: "See the code" },
          visual: "mojonapp",
        },
        {
          heading: "WhatsApp booking bot",
          paragraph:
            "Reads the chat between a car wash and its customers and, once they agree on a day and time, books it in Google Calendar. It never replies to anyone: it works silently.",
          list: [
            "A single model call per batch of messages: US$0.0015 per message",
            "52 tests: 38 for the server and 14 conversations, 9 taken from real chats",
            "Permissions live in the code, not in the prompt",
          ],
          link: { href: `${GITHUB}/bot-turnos-whatsapp`, text: "See the code" },
          visual: "bot",
        },
        {
          heading: "Websites for local businesses",
          paragraph:
            "Custom landing pages for small businesses. AutoShine, a car wash in Merlo, gets booking requests on WhatsApp straight from its page.",
          list: [
            "Designed from the business's real Instagram",
            "A form that writes the WhatsApp message for the customer",
            "Want one for your business? Get in touch",
          ],
          link: { href: "#contacto", text: "Get yours" },
          visual: "paginas",
        },
        {
          heading: "QA and automation",
          paragraph:
            "Seven suites across different interfaces and APIs, plus automated subscriber registration on ISPBoss's real system.",
          list: [
            "69 tests in Pytest and Playwright with the Page Object Model",
            "22 API tests in Postman, running with Newman in CI",
            "Data validation with SQL Server queries",
          ],
          link: { href: `${GITHUB}/QaTest`, text: "See the code" },
          visual: "qa",
        },
      ],
    },
    experiencia: {
      titulo: "Experience",
      items: [
        {
          fecha: "2026",
          puesto: "Own products",
          lugar: "MojonApp · Booking bot",
          texto: "Design, development, testing and release with no team: from the first commit to production.",
        },
        {
          fecha: "2022 — 2026",
          puesto: "QA, Support and Training Lead",
          lugar: "CHRS Software · ISPBoss",
          texto:
            "Sole person responsible for quality on a billing platform for internet providers: risk-based test cases, regression and load testing on every release, defects in Jira and data validated in SQL Server.",
        },
        {
          fecha: "2021 — 2022",
          puesto: "QA Tester",
          lugar: "Bixe App",
          texto: "Exploratory testing of the passenger and driver apps on Android and iOS, before the first public releases.",
        },
      ],
    },
    herramientas: { titulo: "Stack" },
    contacto: {
      titulo: "Let's talk",
      texto: "I'm looking for remote work in QA, automation or AI development. I also build websites for businesses.",
      email: "Send me an email",
      pie: "Built with React, GSAP and Framer Motion.",
    },
  },
} as const;

export type Textos = (typeof TEXTOS)[Idioma];
