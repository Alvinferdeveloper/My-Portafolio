interface Project {
  name: string;
  image: string;
  technologies: string[];
  github_url: string;
  demo_url?: string;
  es: { description: string };
  en: { description: string };
}

export const proyects: Project[] = [
  {
    name: "Estudia",
    image: "/estudia_demo.gif",
    technologies: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "Tailwind CSS",
      "Typeorm",
      "PostgreSQL",
      "Supabase",
      "Better Auth",
      "Vercel AI SDK",
      "TanStack Query",
    ],
    github_url: "https://github.com/Alvinferdeveloper/estudia-frontend",
    es: {
      description:
        "Estudia es un ecosistema de aprendizaje inteligente diseñado para optimizar el rendimiento académico de alto nivel. Mediante el uso de inteligencia artificial, la plataforma transforma documentos estáticos en herramientas dinámicas, permitiendo la generación automatizada de notas críticas, exámenes personalizados y retroalimentación analítica en tiempo real.",
    },
    en: {
      description:
        "Estudia is an intelligent learning ecosystem designed to optimize high-level academic performance. Using artificial intelligence, the platform turns static documents into dynamic tools, enabling automated generation of critical notes, personalized exams and real-time analytical feedback.",
    },
  },
  {
    name: "CROMO FC",
    image: "/cromo_demo.gif",
    technologies: ["Next js", "Typescript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    github_url: "https://github.com/Alvinferdeveloper/CROMO-FC.git",
    demo_url: "https://cromofc.vercel.app/",
    es: {
      description:
        "Cromo FC es la plataforma social definitiva para coleccionistas de cromos del Mundial 2026. Nuestra aplicación conecta a personas de todo el mundo para facilitar el intercambio de cromos de forma segura y eficiente. A través de un mercado visual y geolocalizado, los usuarios pueden gestionar su inventario, publicar sus repetidos y encontrar exactamente las cartas que les faltan mediante un sistema inteligente de coincidencias en tiempo real.",
    },
    en: {
      description:
        "Cromo FC is the ultimate social platform for World Cup 2026 sticker collectors. The app connects people from all over the world to enable safe, efficient sticker trading. Through a visual, geolocated marketplace, users can manage their inventory, list their duplicates, and find exactly the stickers they're missing via a real-time smart matching system.",
    },
  },
  {
    name: "ChatHub",
    image: "/chathub_demo.gif",
    technologies: [
      "Next js",
      "Typescript",
      "Tailwind",
      "Prisma",
      "MySQL",
      "Socket.io",
      "Node js",
      "Redis",
      "Supabase",
    ],
    github_url: "https://github.com/Alvinferdeveloper/random-chat-next",
    es: {
      description:
        "ChatHub es una red social diseñada para conectar personas a través de salas de discusión basadas en intereses comunes. Mediante un sistema de scoring por actividad y una arquitectura segura con URLs pre-firmadas, garantizamos interacciones dinámicas y conversaciones genuinamente espontáneas en tiempo real.",
    },
    en: {
      description:
        "ChatHub is a social network designed to connect people through discussion rooms based on shared interests. Using an activity-scoring system and a secure architecture with pre-signed URLs, it guarantees dynamic interactions and genuinely spontaneous real-time conversations.",
    },
  },
  {
    name: "Clean Imports extension",
    image: "/clean_imports_demo.gif",
    technologies: ["Node js", "Typescript", "VSCode Extension API", "vscode-test"],
    demo_url:
      "https://marketplace.visualstudio.com/items?itemName=Alvinferdev.RemoveUnusedImports",
    github_url: "https://github.com/Alvinferdeveloper/unused-imports-extension",
    es: {
      description:
        "Esta extensión para Visual Studio Code permite limpiar automáticamente los imports no utilizados en archivos TypeScript y JavaScript. Mejora la legibilidad del código, mantiene los archivos limpios y ayuda a evitar dependencias innecesarias. Con un solo clic o comando, detecta y elimina los imports no usados, facilitando el mantenimiento del código en proyectos grandes o pequeños.",
    },
    en: {
      description:
        "This Visual Studio Code extension automatically cleans up unused imports in TypeScript and JavaScript files. It improves code readability, keeps files clean and helps avoid unnecessary dependencies. With a single click or command, it detects and removes unused imports, making code maintenance easier in projects of any size.",
    },
  },
  {
    name: "SUMMA",
    image: "/summa_demo.gif",
    technologies: [
      "Go",
      "Gin",
      "Typescript",
      "Next js",
      "Tailwind",
      "PostgreSQL",
      "RabbitMQ",
      "Redis",
      "Web socket",
    ],
    github_url: "https://github.com/Alvinferdeveloper/summa-backend",
    es: {
      description:
        "SUMMA es un portal web de empleo diseñado para promover la inclusión laboral mediante una experiencia totalmente accesible y apoyada por inteligencia artificial. El sistema permite a las empresas publicar ofertas adaptadas a personas con discapacidad y ofrece a los candidatos herramientas avanzadas para encontrar oportunidades que realmente se ajusten a sus habilidades.",
    },
    en: {
      description:
        "SUMMA is a job-search web portal designed to promote workplace inclusion through a fully accessible, AI-supported experience. The system lets companies publish job offers tailored for people with disabilities and gives candidates advanced tools to find opportunities that truly match their skills.",
    },
  },
  {
    name: "Web Console",
    image: "/web_terminal.gif",
    technologies: ["Next js", "Typescript", "Tailwind", "Prisma", "MySQL"],
    demo_url: "https://web-console-ten.vercel.app/",
    github_url: "https://github.com/Alvinferdeveloper/WEB_CONSOLE",
    es: {
      description:
        "Este proyecto es un simulador de terminal web creado para ayudar a las personas que están aprendiendo Linux o que desean mejorar sus habilidades en la línea de comandos. Ofrece una experiencia interactiva que imita el funcionamiento de una terminal real, permitiendo navegar por un sistema de archivos, gestionar carpetas y archivos, y ejecutar comandos como si se estuviera en un entorno real. El sistema mantiene un entorno persistente, de modo que los cambios realizados por el usuario se conservan entre sesiones, brindando una experiencia continua de práctica y aprendizaje.",
    },
    en: {
      description:
        "This project is a web terminal simulator built to help people learning Linux or wanting to improve their command-line skills. It offers an interactive experience that mimics a real terminal, allowing users to navigate a file system, manage folders and files, and run commands as if in a real environment. The system keeps a persistent environment, so changes made by the user are preserved between sessions, providing a continuous practice and learning experience.",
    },
  },
  {
    name: "Web Chat",
    image: "/web_chat_demo.gif",
    technologies: ["Next js", "Typescript", "Tailwind", "Supabase", "PostgreSQL", "PayPal"],
    github_url: "https://github.com/Alvinferdeveloper/web-chat",
    es: {
      description:
        "Web Chat es una herramienta que permite ingresar una o varias URLs, extraer automáticamente su contenido y conversar con él mediante un modelo de lenguaje (LLM). El usuario puede hacer preguntas, resumir información y ampliar el contexto agregando nuevas páginas durante la conversación. El sistema integra pagos con PayPal para acceder a funciones avanzadas.",
    },
    en: {
      description:
        "Web Chat is a tool that lets you enter one or more URLs, automatically extract their content, and chat with it through a language model (LLM). Users can ask questions, summarize information, and expand the context by adding new pages during the conversation. The system integrates PayPal payments to unlock advanced features.",
    },
  },
  {
    name: "Bodegas Inventory",
    image: "/bodegas_demo.gif",
    technologies: ["Next js", "Typescript", "Tailwind", "Prisma", "MySQL"],
    github_url: "https://github.com/Alvinferdeveloper/construction_inventory",
    es: {
      description:
        "Plataforma web diseñada para gestionar múltiples bodegas y los materiales asociados dentro de una empresa de construcción. Permite registrar entradas y salidas de materiales, asignar bodegueros responsables de aprobar movimientos y mantener un control preciso del inventario en tiempo real. El sistema centraliza toda la información, mejora la trazabilidad de recursos y optimiza la administración logística de las bodegas.",
    },
    en: {
      description:
        "A web platform designed to manage multiple warehouses and their associated materials within a construction company. It allows recording material inflows/outflows, assigning warehouse keepers responsible for approving movements, and keeping precise real-time inventory control. The system centralizes all information, improves resource traceability, and optimizes warehouse logistics management.",
    },
  },
  {
    name: "Image Locator",
    image: "/image_locator_demo.webp",
    technologies: ["Next js", "Tailwind", "Typescript"],
    demo_url: "https://image-locator.vercel.app",
    github_url: "https://github.com/Alvinferdeveloper/image-locator",
    es: {
      description:
        "Esta herramienta web permite a los usuarios obtener la ubicación geográfica donde fue tomada una imagen, analizando los metadatos (EXIF) que contiene. Es útil para fotógrafos, periodistas o cualquier persona interesada en rastrear el origen geográfico de una fotografía.",
    },
    en: {
      description:
        "This web tool lets users find the geographic location where an image was taken by analyzing its EXIF metadata. It's useful for photographers, journalists, or anyone interested in tracing the geographic origin of a photo.",
    },
  },
];
