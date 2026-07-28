export const profile = {
  name: "Nade Ali Hasham",
  displayName: "NADE ALI HASHAM",
  title: "Full-Stack Developer",
  headline: "Full-Stack Developer | ASP.NET Core | React.js | Next.js | TypeScript",
  location: "Lahore, Pakistan",
  phone: "+92 309 6941964",
  whatsapp: "+92 318 4061010",
  email: "syednadealihashamshah@gmail.com",
  linkedin: "https://www.linkedin.com/in/syed-nade-ali-hasham-798297280/",
  github: "https://github.com/Nadeali-Hasham",
  githubRepos: "https://github.com/Nadeali-Hasham?tab=repositories",
  fiverr: "https://www.fiverr.com/syed_nade_ali",
  fiverrActive: true,
  resume: "/resume/nade-ali-hasham-resume.pdf",
  profileImage: "/images/nade-ali-hasham.jpg",
  summary:
    "Full-stack developer with nearly three years of experience contributing to client and office-based web applications. Skilled in ASP.NET Core, React.js, Next.js, TypeScript, and SQL Server, with hands-on experience building REST APIs, relational database solutions, JWT authentication, role-based authorization, and responsive user interfaces.",
  story: [
    "I started building software in the quiet hours after work, when most people close the laptop and recover from the day. For me, that time became the workshop: slow internet tabs, messy database diagrams, API errors, and small wins that made the next feature feel possible.",
    "The turning point was realizing that clean code is not just about syntax. It is about trust. A business owner trusts a dashboard to show the right numbers. A user trusts a checkout to work. A team trusts a developer to deliver a feature without breaking the flow around it.",
    "That is why I build with a practical full-stack mindset. I care about the database shape, API contract, authentication path, UI state, and the final experience on a phone screen. My philosophy is simple: software becomes professional when the hidden parts are as reliable as the visible design.",
    "Since July 2023, I have worked across office and client projects, growing from frontend delivery into full-stack development with ASP.NET Core, React, Next.js, TypeScript, and SQL Server. I bring steady execution, maintainable code, and the hunger to turn real problems into dependable products."
  ],
  certificate: {
    title: "Shopify Theme Development: Online Store 2.0 + TailwindCSS",
    provider: "Udemy",
    instructor: "Bernard Polidario",
    date: "Oct. 16, 2023",
    duration: "16.5 total hours"
  }
};

export const skills = [
  { name: "ASP.NET Core", level: 88, group: "Backend" },
  { name: "C# / EF Core", level: 84, group: "Backend" },
  { name: "REST APIs", level: 88, group: "Backend" },
  { name: "React.js", level: 90, group: "Frontend" },
  { name: "Next.js", level: 86, group: "Frontend" },
  { name: "TypeScript", level: 84, group: "Frontend" },
  { name: "SQL Server", level: 82, group: "Database" },
  { name: "Tailwind CSS", level: 88, group: "UI" },
  { name: "Material UI", level: 80, group: "UI" },
  { name: "Vapi.ai", level: 72, group: "AI Tools" }
];

export const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Digiware Solutions / Contract & Office Projects",
    period: "2025 - 2026",
    location: "Lahore, Pakistan",
    bullets: [
      "Develop and maintain client-facing web applications using ASP.NET Core, React.js, TypeScript, and SQL Server.",
      "Build REST APIs with ASP.NET Core Web API and Entity Framework Core, including authentication and authorization flows.",
      "Design normalized SQL Server schemas, relationships, queries, and indexes for reliable production features.",
      "Collaborate with QA, backend, and UI/UX teams to deliver stable, production-ready releases."
    ]
  },
  {
    role: "Frontend Developer",
    company: "Digiware Solutions / Contract & Office Projects",
    period: "2023 - 2024",
    location: "Lahore, Pakistan",
    bullets: [
      "Developed responsive interfaces using React.js, TypeScript, Material UI, and Tailwind CSS.",
      "Integrated frontend applications with ASP.NET Core APIs and handled asynchronous data flows.",
      "Created reusable UI components from Figma designs for mobile-responsive interfaces.",
      "Integrated AI-powered voice and document-processing assistants using Vapi.ai and Blind.ai."
    ]
  }
];

export const projects = [
  {
    title: "AlfShip",
    category: "E-Commerce",
    image: "/images/alfship-preview.jpg",
    description:
      "Responsive e-commerce shipping platform with carrier integrations, order fulfillment workflows, discounted postage, and tracking updates.",
    tech: ["React.js", "TypeScript", "Tailwind CSS", "MERN"],
    live: "https://alfshipping.vercel.app/",
    code: ""
  },
  {
    title: "Chemical & Incident Management Dashboard",
    category: "Dashboard",
    image: "/images/beaty-dashboard-preview.jpg",
    description:
      "Chemical inventory and incident-reporting workflows with CRUD operations, role-based access, relational database design, and Chart.js visualizations.",
    tech: ["ASP.NET Core", "React.js", "SQL Server", "Chart.js"],
    live: "https://portal.beatybqehs.com/dashboard",
    code: ""
  },
  {
    title: "AI Resume Builder",
    category: "AI App",
    image: "/images/ai-resume-builder-preview.jpg",
    description:
      "AI-powered resume builder that helps users generate polished, role-focused resumes with modern templates and guided content flows.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Strapi", "Clerk", "Google Gemini", "Docker"],
    live: "",
    code: "https://github.com/Nadeali-Hasham/AI-resume-builder-app"
  },
  {
    title: "FYP — OpenAI Chat Platform",
    category: "AI / FYP",
    image: "",
    description:
      "ChatGPT-style OpenAI assistant that supports conversational AI and real-time data retrieval for live, context-aware answers.",
    tech: ["OpenAI", "React.js", "Node.js", "Real-time Data"],
    live: "",
    code: ""
  },
  {
    title: "EBookStore",
    category: "MVC",
    image: "",
    description:
      "Inventory and book management system with stored procedures, filtering, sorting, reporting, and PDF export features.",
    tech: ["ASP.NET Core MVC", "EF Core", "SQL Server"],
    live: "",
    code: ""
  }
];

/** Public repos only — private/404 repos removed so every link opens */
export const moreProjectNames = [
  "Personal-Protfolio",
  "AI-resume-builder-app",
  "daily-advice-app",
  "random-joke-generator",
  "qr-code-generator",
  "expense-management-tracker",
  "todo-list-app",
  "Currency-Converter",
  "Age-Calculator",
  "Unit-Converter",
  "rgb-color-guesser",
  "7random_password_generator"
];

export const services = [
  {
    title: "Full-Stack Web Apps",
    description: "End-to-end web applications with clean APIs, reliable database design, and responsive interfaces."
  },
  {
    title: "API & Database Systems",
    description: "ASP.NET Core Web API, Entity Framework Core, SQL Server schemas, queries, and role-based access."
  },
  {
    title: "Frontend Interfaces",
    description: "React and Next.js interfaces built from Figma with accessible, mobile-first UI components."
  },
  {
    title: "Shopify Theme Work",
    description: "Shopify theme customization with Online Store 2.0 concepts, Tailwind CSS, and practical storefront polish."
  }
];

export const testimonials = [
  {
    quote:
      "Nade brings steady execution and a practical eye for both frontend polish and backend behavior.",
    name: "Project Lead",
    role: "Office Project Collaboration"
  },
  {
    quote:
      "He is reliable with implementation details, from API integration to responsive UI fixes.",
    name: "Team Collaborator",
    role: "Client-Facing Web App"
  },
  {
    quote:
      "His work style is improving fast: focused, curious, and willing to debug until the feature is stable.",
    name: "Senior Developer",
    role: "Technical Guidance"
  }
];

export const filters = [
  "All",
  "React.js",
  "ASP.NET Core",
  "SQL Server",
  "MERN",
  "Vite",
  "AI",
  "E-Commerce",
  "Dashboard",
  "MVC"
];
