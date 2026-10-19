// src/data.js

export const profile = {
  name: "BHUMIT JOSHI",
  role: "Computer Science Engineering Student",
  location: "Ahmedabad, India",
  email: "bhumitjoshi234@email.com",

  github: "https://github.com/JoshiBhumit",
  linkedin: "https://linkedin.com/in/bhumit-joshi",
  resume: "",

  summary:
    "Software developer focused on React, Python, Django, APIs, databases, and practical AI/ML. I enjoy building real products, solving technical problems, and learning by shipping."
};

export const projects = [
  {
    id: "01",
    title: "DriveSense AI",
    type: "AI + Full Stack",
    year: "2026",
    color: "purple",

    summary:
      "AI-powered vehicle marketplace with intelligent price prediction and market analytics.",

    description:
      "A semester project combining React, Django REST Framework, JWT authentication, SQLite, machine-learning price prediction, marketplace functionality, and interactive analytics.",

    stack: [
      "React",
      "Django",
      "DRF",
      "SQLite",
      "scikit-learn",
      "Chart.js"
    ],

    github: "",
    demo: ""
  },

  {
    id: "02",
    title: "AI Document Intelligence",
    type: "AI + Backend",
    year: "2026",
    color: "cyan",

    summary:
      "Classify, index, summarize, and search business documents.",

    description:
      "A hackathon project concept for document classification, metadata extraction, summaries, secure search, and an interactive dashboard.",

    stack: [
      "React",
      "FastAPI",
      "Python",
      "SQLite",
      "AI"
    ],

    github: "",
    demo: ""
  },

  {
    id: "03",
    title: "DDCET Digital Academy",
    type: "EdTech",
    year: "2025",
    color: "orange",

    summary:
      "A preparation platform concept for diploma-to-degree students.",

    description:
      "A learning platform concept featuring course discovery, academic resources, payment-flow UI, and a student dashboard.",

    stack: [
      "Flask",
      "MySQL",
      "SQLAlchemy",
      "Bootstrap"
    ],

    github: "",
    demo: ""
  }
];

export const skills = [
  {
    label: "React",
    level: 86
  },
  {
    label: "Python",
    level: 88
  },
  {
    label: "Django",
    level: 82
  },
  {
    label: "SQL",
    level: 80
  },
  {
    label: "Java",
    level: 72
  },
  {
    label: "Machine Learning",
    level: 70
  }
];

export const timeline = [
  {
    date: "2024 → Present",

    title:
      "B.E. Computer Science Engineering",

    subtitle:
      "University / College",

    copy:
      "Studying software engineering, databases, web technologies, AI/ML, and practical application development."
  },

  {
    date: "2025 → 2026",

    title:
      "Projects + Hackathons",

    subtitle:
      "Build • Break • Improve",

    copy:
      "Worked on full-stack and AI-oriented applications, debugging integration problems and turning problem statements into working demos."
  }
];