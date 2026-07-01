import trafficResearchImage from '../assets/projects/traffic-research.png';
import elberImage from '../assets/projects/elber-ecommerce.png';
import lmsImage from '../assets/projects/lms-platform.png';
import minimedImage from '../assets/projects/minimed.png';
import ceylonImage from '../assets/projects/ceylon-herb-care.png';
import financeImage from '../assets/projects/finance-tracker.png';
import evotingImage from '../assets/projects/evoting.png';
import rfidImage from '../assets/projects/rfid-app.png';
import fashionImage from '../assets/projects/fashion-globe.png';
import cleancityImage from '../assets/projects/cleancity.png';

// NOTE: link = live demo URL, github = repository URL.
// Set to null until the real URL is added — the UI hides buttons for null links.
export const projects = [
  {
    id: 1,
    title: "Multi-Agent Urban Traffic Signal Optimization",
    category: "AI Research",
    role: "Final Year Researcher",
    description: "Designed UQ-RecurrentHGAT, a novel AI architecture fusing Heterogeneous Graph Attention Networks with Multi-Agent Proximal Policy Optimization (MAPPO) for real-time adaptive signal control across entire city networks. Benchmarked against SUMO actuated baselines: 81.8% reduction in average network waiting time, 62.2% reduction in queue length, and 79.7% reduction in total weighted cost, with ~3.17 ms P50 inference latency validating edge-computing deployment.",
    tech: ["Python", "PyTorch", "PyTorch Geometric", "GNN", "MAPPO", "Flask", "Redis", "Docker", "SUMO"],
    link: null,
    github: null,
    image: trafficResearchImage
  },
  {
    id: 2,
    title: "Elber E-commerce Platform",
    category: "Production",
    role: "Full-Stack Developer",
    description: "Developed a production-ready e-commerce platform covering product catalog, shopping cart, and checkout workflows. Built a NestJS RESTful API with Mongoose ORM and integrated Firebase Storage for product media hosting.",
    tech: ["NestJS", "Next.js", "React", "MongoDB", "TypeScript", "Firebase Storage"],
    link: "https://www.elber.lk/",
    github: null,
    image: elberImage
  },
  {
    id: 3,
    title: "Learning Management System",
    category: "Full-Stack",
    role: "Full-Stack Developer",
    description: "Architected a multi-role LMS from scratch with Admin, Teacher, and Student portals secured by JWT authentication and role-based access control. Implemented real-time batch chat, live notifications, a dual-mode anti-fraud QR attendance engine with rotating codes, a timed exam engine with auto-graded MCQs and PDF certificate generation, and analytics dashboards for attendance and grade insights.",
    tech: ["Next.js", "Supabase", "WebSockets", "Chart.js", "Recharts"],
    link: "https://learning-management-system-1cq4ic41u.vercel.app/",
    github: null,
    image: lmsImage
  },
  {
    id: 4,
    title: "MiniMed — Mobile Health App",
    category: "Mobile App",
    role: "Mobile Developer",
    description: "Developed an age- and medical-history-based Vaccination Management System with push notifications for upcoming doses, user confirmation flows, and allergy and health-condition management with clinical alerts.",
    tech: ["React Native", "Push Notifications"],
    link: null,
    github: "https://github.com/SandeepKahawatta/MiniMed-Infant-Healthcare-App-MidwifeInterface",
    image: minimedImage
  },
  {
    id: 5,
    title: "Ceylon Herb Care",
    category: "E-commerce",
    role: "Full-Stack Developer",
    description: "Built a Seller Partnership Management Module with onboarding, authentication, automated email notifications, and historical performance reporting. Developed a comprehensive Order Management System with real-time order-status notifications, multiple payment methods, incomplete-payment alerts, and automated invoice generation.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    link: null,
    github: "https://github.com/SandeepKahawatta/herb-care",
    image: ceylonImage
  },
  {
    id: 6,
    title: "Personal Finance Tracker",
    category: "Backend",
    role: "Backend Engineer",
    description: "Engineered a backend system for income, expense, budget, and goal management with JWT authentication and Currencylayer API multi-currency support. Shipped with a Jest / Supertest test suite ensuring production reliability.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Jest", "Supertest"],
    link: null,
    github: "https://github.com/SandeepKahawatta/project-SandeepKahawatta",
    image: financeImage
  },
  {
    id: 7,
    title: "Secure Multilingual E-Voting System",
    category: "Full-Stack",
    role: "Full-Stack Developer",
    description: "Developed a Sinhala / Tamil / English e-voting platform with NIC-based authentication and one-vote-per-voter enforcement, stress-tested for high-traffic resilience.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    link: null,
    github: "https://github.com/SandeepKahawatta/Secure_E-voting_System",
    image: evotingImage
  },
  {
    id: 8,
    title: "Techart Solutions — RFID Web App",
    category: "Client Work",
    role: "Developer",
    description: "Built an enterprise RFID management system covering device configuration, tap processing, and full audit-history management with seamless database integration.",
    tech: ["Laravel", "MySQL"],
    link: null,
    github: "https://github.com/SandeepKahawatta/rfid-reader",
    image: rfidImage
  },
  {
    id: 9,
    title: "Fashion Globe — Sales Optimisation",
    category: "Full-Stack",
    role: "Full-Stack Developer",
    description: "Built a Customer Feedback and Loyalty Management System with product reviews, points tracking, a personalized reward catalog, seasonal discounts, and engagement analytics dashboards.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    link: null,
    github: "https://github.com/SandeepKahawatta/sales-optimization-fashion-retail",
    image: fashionImage
  },
  {
    id: 10,
    title: "CleanCity — Smart Waste Collection",
    category: "Smart System",
    role: "Developer",
    description: "Designed administrative features for staff management, task assignment, collection scheduling, and route optimisation; built reporting frameworks for operational data analysis and performance tracking.",
    tech: ["React", "Firebase"],
    link: null,
    github: "https://github.com/SandeepKahawatta/clean-city",
    image: cleancityImage
  }
];
