import {
  web,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  git,
  meta,
  starbucks,
  tesla,
  shopify,
  iNote,
  GPT,
  Resto,
  YT,
  typescript,
  redux,
  mongodb,
  Next,
  promptWorld,
  fuzzie,
  nodejs,
  express,
  github,
  iconGithub,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "JavaScript Developer",
    icon: javascript,
  },
  {
    title: "React Developer",
    icon: reactjs,
  },
  {
    title: "Front-End Developer",
    icon: web,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html || '',
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,

  },
  {
    name: "TypeScript",
    icon: typescript,

  },
  {
    name: "React JS",
    icon: reactjs,

  },
  {
    name: "Next JS",
    icon: Next,

  },
  {
    name: "Redux/RTK",
    icon: redux,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "Express.js",
    icon: express,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "GitHub",
    icon: iconGithub,
  },
];

const projects = [
  {
    name: "Fuzzie",
    description:
      "Fuzzie is a Next.js SaaS Project. Autmated work like sending messages to slack and Discord channels using Fuzzie.  (Still Working)",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "clerk-Authentication",
        color: "green-text-gradient",
      },
      {
        name: "prisma",
        color: "pink-text-gradient",
      },
      {
        name: "shadcn-ui & tailwind css",
        color: "blue-text-gradient",
      },
    ],
    image: fuzzie,
    source_code_link: "https://github.com/spexzee/sp-fuzzie",
    demo_link: "https://sp-fuzzie.vercel.app/",
  },
  {
    name: "Youtube-Player",
    description:
      "Developed a YouTube Player in React.js for easy video watching.Added a search tool to find related videos quickly.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "API",
        color: "green-text-gradient",
      },
      {
        name: "RapidAPI",
        color: "pink-text-gradient",
      },
    ],
    image: YT,
    source_code_link: "https://github.com/spexzee/YouTube",
    demo_link: "https://spexzee-youtube.vercel.app/",
  },
  {
    name: "Prompt-World",
    description:
      "Discover & Share AI-Powered Prompts Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "next-Auth",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "pink-text-gradient",
      },
      {
        name: "OAuth",
        color: "blue-text-gradient",
      },
    ],
    image: promptWorld,
    source_code_link: "https://github.com/spexzee/prompt-world",
    demo_link: "https://spexzee-prompt.netlify.app/",
  },
  {
    name: "iNote-Book",
    description:
      "Implemented note functionalities like creation, editing, and deletion, with MongoDB for data storage, resulting in a user - friendly application",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "node",
        color: "pink-text-gradient",
      },
      {
        name: "express",
        color: "green-text-gradient",
      },
    ],
    image: iNote,
    source_code_link: "https://github.com/spexzee/iNotebook",
    demo_link: "https://spexzee-notebook.netlify.app/",
  },
  {
    name: "GPT-3 Overview",
    description:
      "Developed a React Front-End landing website.Implemented user-friendly design and navigation, utilizing React components for modularity and code reusability.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "front-end",
        color: "pink-text-gradient",
      },
    ],
    image: GPT,
    source_code_link: "https://github.com/spexzee/GPT-3",
    demo_link: "https://gpt-spexzee.netlify.app/",
  },
  {
    name: "Restaurant",
    description:
      "Demonstrated React.js prescience for a visually appealing, responsive website, ensuring an enhanced user experience and effective online presence",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "front-end",
        color: "pink-text-gradient",
      },
    ],
    image: Resto,
    source_code_link: "https://github.com/spexzee/Restaurant-",
    demo_link: "https://spexzee-restaurant.netlify.app/",
  },

];
const experiences=[];
const testimonials=[];


export { services, technologies, experiences, testimonials, projects };