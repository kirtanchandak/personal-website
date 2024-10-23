import {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  InstagramIcon,
} from "@/components/icons";
import {
  Vitess,
  Soshals,
  Sarthak,
  Securr,
  ghrcem,
  Emix,
  Smeek,
} from "@/public";

export const RESUME_DATA = {
  name: "Kirtan Chandak",
  initials: "KC",
  location: "Pune, India",
  locationLink: "https://www.google.com/maps/place/Pune",
  about:
    "Hiii I'm Kirtan, a computer engineering undergrad from India who can build full-stack web apps and currently tinkering with AI.",
  aboutBulletPoints: [
    "I have worked with @Vitessio (PlanetScale) LFX as a mentee Linux Foundation's program",
    "Worked with a community startup @SoshalsApp and Web3 startup @Securrtech as a developer",
    "Grown 2 communities with 1000+ developers in my university from scratch",
    "I have worked with Sarthak Goswami (1.03 million on YouTube) as a video editor and content creator.",
    "I love businesses - profits, losses, stocks everything finance",
    "Huge cricket fan 🏏",
  ],
  avatarUrl1: "/kirtan.webp",
  avatarUrl2: "/vegeta.webp",
  personalWebsiteUrl: "https://rexanwong.xyz",
  contact: {
    email: null,
    social: [
      {
        name: "X",
        url: "https://twitter.com/chandak_kirtan",
        icon: XIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/kirtan-chandak-65736b159/",
        icon: LinkedInIcon,
      },
      {
        name: "Instagram",
        url: "https://instagram.com/chandak.kirtan",
        icon: InstagramIcon,
      },
      {
        name: "GitHub",
        url: "https://github.com/kirtanchandak",
        icon: GitHubIcon,
      },
    ],
  },
  skills: [
    "TypeScript",
    "Python",
    "React",
    "NextJS",
    "NodeJS",
    "Express.js",
    "FastAPI",
    "TailwindCSS",
    "ShadcnUI",
    "PostgreSQL",
    "MongoDB",
    "Supabase",
    "Vite",
    "Vercel",
  ],
  currentlyBuilding: [
    {
      name: "Emix",
      link: "https://www.emixhq.live/",
      badges: ["Email Templates", "AI", "Paid Tool"],
      title: "Create MJML email templates with AI",
      logo: Emix,
      date: "Since September 2024",
      description:
        "Create stunning email templates in MJML using AI without ever having to write a single line of code. With only a few inputs, sit back and watch magic happen. Generate, export, and save clean MJML code directly to your preferred IDE so you can further work on your designs. Beautifully crafted emails will be a delight for your end-users, and that its ease of use will be a delight for you!",
      videoLink: "https://youtu.be/e7JVH3nYgpY",
      projectDetailsLink: "https://producthunt.com/posts/text-behind-image",
    },
    {
      name: "Smeek",
      link: "https://smeek.vercel.app/",
      badges: ["Education tool", "AI"],
      title: "Smeek is a personalised AI mentor for learning.",
      logo: Smeek,
      date: "Since January 2024",
      description:
        "I've started building VideoFast since the beginning of 2024, while working on schoolwork at the same time. From iterating and constantly improving the design and the usability of the video editor, it has evolved into the easiest video editor that you will ever use. Currently, VideoFast has got the #2 Product of the Day on Product Hunt and has over 500 regular users using the editor.",
      videoLink: "https://youtu.be/onlF73wcb0Q",
      projectDetailsLink: "https://smeek.vercel.app/",
    },
  ],
  notableShoutouts: [
    {
      name: "Ryan Hoover, founder of Product Hunt:",
      tweetLink: "https://twitter.com/rrhoover/status/1842977911617335783",
    },
    {
      name: "Steven Tey, former developer advocate at Vercel:",
      tweetLink: "https://twitter.com/steventey/status/1843026678580469916",
    },
  ],
  education: [
    {
      school: "G H Raisoni College of Engineering & Management",
      degree: "Computer Engineering",
      start: "2022",
      end: "2025",
      activities:
        "I was the MLSC GHRCEM (Microsoft Learn Student CLub) lead for 2023-24 in my university conducting techincal workshops and events. Also worked as a Content and Social Media lead in GDSC GHRCEM.",
      logo: ghrcem,
    },
  ],
  work: [
    {
      company: "Vitessio",
      link: "https://vitess.io/",
      badges: ["Remote"],
      title: "LFX Mentee",
      logo: Vitess,
      start: "Jun 2024",
      end: "Aug 2024",
      description: [
        "Reviewed and improved getting started guide for vitess.io while running tests.",
        "Solved UI bugs in the website for documentation.",
        "Conducted user research survey and collected feedback from the community turning it into a blog.",
      ],
    },
    {
      company: "Securr",
      link: "https://securr.tech/",
      badges: ["Remote"],
      title: "Product Development Intern",
      logo: Securr,
      start: "Apr 2023",
      end: "Sep 2023",
      description: [
        "Converted new website Figma designs into Pixel Perfect UI components using Tailwind CSS",
        "Resolved UI issues in the company's existing website, enhancing the user experience",
      ],
    },
    {
      company: "Frontend Intern",
      link: "https://www.soshals.app/",
      badges: ["Remote"],
      title: "Frontend Intern",
      logo: Soshals,
      start: "Sep 2023",
      end: "Dec 2023",
      description: [
        "Successfully shipped frontend code and implemented payment flow in the application",
        "Improved the overall code structure of the application by implementing a state management library, Redux",
      ],
    },
    {
      company: "Sarthak Goswami",
      link: "https://www.youtube.com/@SundaySarthak",
      badges: ["Hybrid"],
      title: "Video Editor",
      logo: Sarthak,
      start: "Dec 2021",
      end: "May 2022",
      description: [
        "Worked as a video editor with Sarthak to edit his videos for Youtube",
        "Implemented ideas and videos and was an integral part of the team from 20K subscribers till 500K",
      ],
    },
  ],
} as const;
