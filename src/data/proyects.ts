import Image_Locator_Demo from '../../public/image_locator_demo.webp';
import  Clean_Imports_Demo from '../../public/clean_imports_demo.gif';
export const proyects  = [
    {
      image: Clean_Imports_Demo ,
      name: "Clean Imports extension",
      description: "Esta extensión para Visual Studio Code permite limpiar automáticamente los imports no utilizados en archivos TypeScript y JavaScript. Mejora la legibilidad del código, mantiene los archivos limpios y ayuda a evitar dependencias innecesarias. Con un solo clic o comando, detecta y elimina los import no usados, facilitando el mantenimiento del código en proyectos grandes o pequeños.",
      technologies: ["Node js", "Typescript","VSCode Extension API", "vscode-test"],
      demo_url: "https://marketplace.visualstudio.com/items?itemName=Alvinferdev.Clean-Imports",
      github_url: "https://github.com/Alvinferdeveloper/unused-imports-extension"
    },
    {
      image: Image_Locator_Demo ,
      name: "Image Locator",
      description: "Esta herramienta web permite a los usuarios obtener la ubicación geográfica donde fue tomada una imagen, analizando los metadatos (EXIF) que contiene. Es útil para fotógrafos, periodistas o cualquier persona interesada en rastrear el origen geográfico de una fotografía.",
      technologies: ["Next js", "Tailwind", "Typescript"],
      demo_url: "https://image-locator.vercel.app",
      github_url: "https://github.com/Alvinferdeveloper/image-locator"
    }
  ]