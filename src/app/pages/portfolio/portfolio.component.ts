import { Component, type OnInit, HostListener, type ElementRef, ViewChild } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-portfolio",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent implements OnInit {
  @ViewChild("heroTitle", { static: false }) heroTitle!: ElementRef

  // Datos del portfolio
  personalInfo = {
    name: "Juan Jesús López Solano",
    title: "Desarrollador de Aplicaciones Multiplataforma",
    email: "lopezsolanojuanjesus@gmail.com",
    phone: "+34 687 985 680",
    location: "Montemayor, Córdoba",
    linkedin: "https://www.linkedin.com/in/juan-j%C3%A9sus-l%C3%B3pez-solano-5b0133232/",
    github: "https://github.com/WaShIsTyLee",
  }

  aboutMe = `
    Soy Juan Jesús, desarrollador de aplicaciones multiplataforma formado en el IES Francisco de los Ríos.
    Me apasiona la tecnología, el desarrollo de software y aprender nuevas herramientas para seguir creciendo profesionalmente.
    Cuento con conocimientos en desarrollo web, aplicaciones móviles e integración de sistemas.
  `

  experience = [
    {
      position: "Prácticas - Desarrollador Odoo",
      company: "Josmar Inda Group",
      period: "Febrero 2025 - Junio 2025",
      description: `Prácticas realizadas durante 3 meses como parte del ciclo formativo en desarrollo de software.
Participación en proyectos de desarrollo y personalización del sistema ERP Odoo.
Colaboración en la implementación de módulos, automatización de procesos empresariales y mejora de funcionalidades.
Uso de tecnologías como Python, XML y PostgreSQL, así como herramientas de control de versiones como Git.`
    },
    {
      position: "Proyectos personales",
      company: "GitHub",
      period: "2023 - 2025",
      description: `Desarrollo de varios proyectos individuales y en equipo aplicando distintas tecnologías.
Repositorio de proyectos: https://github.com/WaShIsTyLee
Tecnologías utilizadas:
- Backend: Java, Spring Boot, Hibernate
- Frontend: Angular, Ionic
- ERP: Odoo (módulos personalizados en Python y XML)
- Otros: PostgreSQL, Git, MySQL`
    }
  ]

  education = [
    {
      degree: "Desarrollador de Aplicaciones Multiplataforma (DAM)",
      institution: "IES Francisco de los Ríos",
      period: "2023-2025",
      description: "Formación en desarrollo web, móvil y backend con prácticas en herramientas modernas."
    },
    {
      degree: "Bachillerato de Ciencias de la Salud",
      institution: "IES Francisco de los Ríos",
      period: "2017-2019",
      description: ""
    }
  ]


  projects = [
    {
      name: "Gestión de Contactos y Documentos con Odoo",
      description: "Módulo personalizado para Odoo para gestionar contactos, farmacéuticos, y documentos.",
      technologies: ["Odoo", "Python", "PostgreSQL"],
      link: "https://github.com/WaShIsTyLee/IndaColegiados",
    },
    {
      name: "App móvil para el control de Parkings",
      description: "Aplicación móvil desarrollada con Ionic y Angular para gestionar plazas de aparcamiento, incluyendo reservas, disponibilidad y administración de usuarios.",
      technologies: ["Ionic", "Angular", "TypeScript"],
      link: "https://github.com/WaShIsTyLee/TFG-Frontend",
    }

  ]

  skills = [
    "Java", "MySQL", "CSS", "SpringBoot", "Odoo", "Bootstrap",
    "Ionic", "Python", "XML", "Angular", "GitHub", "TypeScript",
    "Hibernate", "HTML"
  ]

  languages = [
    { name: "Español", level: "Nativo" },
    { name: "Francés", level: "B1" },
    { name: "Inglés", level: "B2" }
  ]



  // Variables para efectos visuales
  mouseX = 0
  mouseY = 0
  isScrolling = false
  currentSection = "home"
  typedText = ""
  fullText = "Creando experiencias digitales eficientes con código claro y pasión por la tecnología"
  typeIndex = 0

  ngOnInit() {
    this.initializeAnimations()
    this.startTypingEffect()
    this.observeSections()
    this.createFloatingParticles()
  }

  startTypingEffect() {
    const typeSpeed = 80
    const eraseSpeed = 40
    const pauseTime = 3000

    const type = () => {
      if (this.typeIndex < this.fullText.length) {
        this.typedText += this.fullText.charAt(this.typeIndex)
        this.typeIndex++
        setTimeout(type, typeSpeed)
      } else {
        setTimeout(erase, pauseTime)
      }
    }

    const erase = () => {
      if (this.typeIndex > 0) {
        this.typedText = this.fullText.substring(0, this.typeIndex - 1)
        this.typeIndex--
        setTimeout(erase, eraseSpeed)
      } else {
        setTimeout(type, 1000)
      }
    }

    type()
  }

  createFloatingParticles() {
    const particlesContainer = document.querySelector(".particles-container")
    if (!particlesContainer) return

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.className = "floating-particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 20 + "s"
      particle.style.animationDuration = Math.random() * 10 + 10 + "s"
      particlesContainer.appendChild(particle)
    }
  }

  observeSections() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            this.currentSection = entry.target.id
          }
        })
      },
      { threshold: 0.3 },
    )

    document.querySelectorAll(".section").forEach((section) => {
      observer.observe(section)
    })
  }

  initializeAnimations() {
    document.body.classList.add("animate-ready")
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1
    this.mouseY = (event.clientY / window.innerHeight) * 2 - 1

    const bubbles = document.querySelectorAll(".bubble")
    bubbles.forEach((bubble, index) => {
      const speed = (index + 1) * 0.02
      const x = this.mouseX * speed * 50
      const y = this.mouseY * speed * 50
        ; (bubble as HTMLElement).style.transform = `translate(${x}px, ${y}px)`
    })
  }

  scrollToSection(sectionId: string): void {
    this.isScrolling = true

    const clickedElement = event?.target as HTMLElement
    if (clickedElement) {
      this.createRippleEffect(clickedElement, event as MouseEvent)
    }

    document.body.classList.add("transitioning")

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })

      setTimeout(() => {
        element.classList.add("section-highlight")
        setTimeout(() => {
          element.classList.remove("section-highlight")
          document.body.classList.remove("transitioning")
          this.isScrolling = false
        }, 1000)
      }, 500)
    }
  }

  createRippleEffect(element: HTMLElement, event: MouseEvent) {
    const ripple = document.createElement("span")
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    element.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  openLink(url: string): void {
    const loadingOverlay = document.createElement("div")
    loadingOverlay.className = "loading-overlay"
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>'
    document.body.appendChild(loadingOverlay)

    setTimeout(() => {
      window.open(url, "_blank")
      loadingOverlay.remove()
    }, 300)
  }

  onCardHover(event: MouseEvent, enter: boolean) {
    const card = event.currentTarget as HTMLElement
    if (enter) {
      card.classList.add("card-hover")
      const rect = card.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      card.style.setProperty("--mouse-x", x + "%")
      card.style.setProperty("--mouse-y", y + "%")
    } else {
      card.classList.remove("card-hover")
    }
  }

  animateSkills() {
    const skills = document.querySelectorAll(".skill-tag")
    skills.forEach((skill, index) => {
      setTimeout(() => {
        skill.classList.add("skill-animate")
      }, index * 100)
    })
  }
}
