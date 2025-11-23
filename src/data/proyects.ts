import Image_Locator_Demo from '../../public/image_locator_demo.webp';
import Clean_Imports_Demo from '../../public/clean_imports_demo.gif';
import WebConsoleDemo from '../../public/web_terminal.gif';
import SUMMA_Demo from '../../public/summa_demo.gif';
export const proyects = [
  {
    image: Clean_Imports_Demo,
    name: "Clean Imports extension",
    description: "Esta extensión para Visual Studio Code permite limpiar automáticamente los imports no utilizados en archivos TypeScript y JavaScript. Mejora la legibilidad del código, mantiene los archivos limpios y ayuda a evitar dependencias innecesarias. Con un solo clic o comando, detecta y elimina los import no usados, facilitando el mantenimiento del código en proyectos grandes o pequeños.",
    technologies: ["Node js", "Typescript", "VSCode Extension API", "vscode-test"],
    demo_url: "https://marketplace.visualstudio.com/items?itemName=Alvinferdev.RemoveUnusedImports",
    github_url: "https://github.com/Alvinferdeveloper/unused-imports-extension"
  },
  {
    image: SUMMA_Demo,
    name: "SUMMA",
    description: "SUMMA es un portal web de empleo diseñado para promover la inclusión laboral mediante una experiencia totalmente accesible y apoyada por inteligencia artificial. El sistema permite a las empresas publicar ofertas adaptadas a personas con discapacidad y ofrece a los candidatos herramientas avanzadas para encontrar oportunidades que realmente se ajusten a sus habilidades.",
    technologies: ["Go", "Gin", "Typescript", "Next js", "Tailwind", "PostgreSQL", "RabbitMQ", "Redis", "Web socket"],
    github_url: "https://github.com/Alvinferdeveloper/summa-backend"
  },
  {
    image: WebConsoleDemo,
    name: "Web Console",
    description: "Este proyecto es un simulador de terminal web creado para ayudar a las personas que están aprendiendo Linux o que desean mejorar sus habilidades en la línea de comandos. Ofrece una experiencia interactiva que imita el funcionamiento de una terminal real, permitiendo navegar por un sistema de archivos, gestionar carpetas y archivos, y ejecutar comandos como si se estuviera en un entorno real.El sistema mantiene un entorno persistente, de modo que los cambios realizados por el usuario se conservan entre sesiones, brindando una experiencia continua de práctica y aprendizaje.",
    technologies: ["Next js", "Typescript", "Tailwind", "Prisma", "MySQL"],
    demo_url: "https://web-console-ten.vercel.app/",
    github_url: "https://github.com/Alvinferdeveloper/WEB_CONSOLE"
  },
  {
    image: Image_Locator_Demo,
    name: "Image Locator",
    description: "Esta herramienta web permite a los usuarios obtener la ubicación geográfica donde fue tomada una imagen, analizando los metadatos (EXIF) que contiene. Es útil para fotógrafos, periodistas o cualquier persona interesada en rastrear el origen geográfico de una fotografía.",
    technologies: ["Next js", "Tailwind", "Typescript"],
    demo_url: "https://image-locator.vercel.app",
    github_url: "https://github.com/Alvinferdeveloper/image-locator"
  }
]