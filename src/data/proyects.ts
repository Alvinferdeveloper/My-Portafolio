import Portfolio from '../../public/portfolio.webp';
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
      image: Portfolio ,
      name: "Portfolio",
      description: "Portafilio desarrollado para mostrar mis habilidades y experiencia como desarrollador de software, utilizando tecnologias modernas y buenas practicas de desarrollo Portafilio desarrollado para mostrar mis habilidades y experiencia como desarrollador de software, utilizando tecnologias modernas y buenas practicas de desarrollo",
      technologies: ["React", "Astro", "Tailwind", "Typescript","React", "Astro", "Tailwind", "Typescript", "Astro", "Tailwind", "Typescript"],
      demo_url: "https://github.com/alvinfer67/portfolio",
      github_url: "https://github.com/alvinfer67/portfolio"
    }
  ]