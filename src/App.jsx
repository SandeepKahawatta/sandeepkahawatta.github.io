import React, { useState } from 'react';
import NewPortfolio from './components/NewPortfolio';

import elberImage from './assets/projects/elber-ecommerce.png';
import polygonImage from './assets/projects/polygon-builds.png';
import ceylonImage from './assets/projects/ceylon-herb-care.png';
import minimedImage from './assets/projects/minimed.png';
import rfidImage from './assets/projects/rfid-app.png';
import financeImage from './assets/projects/finance-tracker.png';
import fashionImage from './assets/projects/fashion-globe.png';
import cleancityImage from './assets/projects/cleancity.png';
import evotingImage from './assets/projects/evoting.png';

const Portfolio = () => {
  // DATA: User's CV Data
  const profile = {
    name: "Sandeep Kahawaththa",
    role: "Software Engineering Undergraduate",
    bio: "A logical thinker and creative problem solver who loves diving into the unknown. I have a deep passion for exploring new technologies and turning complex challenges into simple, effective solutions.",
    contact: {
      phone: "+94775699653",
      email: "sandeepkahawatta9@gmail.com",
      linkedin: "http://www.linkedin.com/in/sandeep-kahawatta-a7b5a8216",
      github: "https://github.com/SandeepKahawatta"
    }
  };

  const skills = {
    frontend: ["React", "Next.js", "React Native", "Angular", "HTML", "CSS/Bootstrap", "Tailwind/MUI", "Figma"],
    backend: ["Node.js", "NestJS", "Express", "PHP", "Laravel", "Java", "Python", "C", "C++"],
    database: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "SQL"],
    tools: ["Git", "TypeScript", "JavaScript"]
  };

  const education = [
    {
      degree: "BSc (Hons) in Information Technology Specialization in Software Engineering",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      year: "2022 – Expected 2026"
    }
  ];

  const achievements = [
    "Open Category Teams - Educational Achievement Certificate (IDEALIZE 2024 | AIESEC in UOM)",
    "Python for Beginners (CODL University of Moratuwa)",
    "Python Programing E-Certificate (Following) (CODL University of Moratuwa)"
  ];

  const projects = [
    {
      id: 1,
      title: "Elber E-commerce Platform",
      category: "Full-Stack",
      role: "Full-Stack Developer",
      description: "Developed and maintained core functionalities of a production-ready e-commerce platform. Built a NestJS-based RESTful API with Mongoose for robust data modeling and integrated Firebase Storage for hosting product media.",
      tech: ["NestJS", "Next.js", "React", "MongoDB", "TypeScript"],
      link: "#",
      github: "#",
      image: elberImage
    },
    {
      id: 2,
      title: "Polygon Builds",
      category: "Web App",
      role: "Developer",
      description: "Web Application for 3D printing. Developed a secure user authentication system with Google sign-in. Built features for 3D model uploading and advanced model previewing.",
      tech: ["MERN", "Google Auth", "3D Rendering"],
      link: "#",
      github: "#",
      image: polygonImage
    },
    {
      id: 3,
      title: "Ceylon Herb Care",
      category: "E-commerce",
      role: "Developer",
      description: "Implemented a Seller Partnership Management Module and a comprehensive Order Management System. Developed features for product updates, appointment scheduling, and robust admin controls.",
      tech: ["MERN", "Seller Module", "Order Management"],
      link: "#",
      image: ceylonImage
    },
    {
      id: 4,
      title: "MiniMed",
      category: "Mobile App",
      role: "Developer",
      description: "Developed a Vaccination Management System to display vaccination schedules. Implemented notifications for upcoming vaccination dates and designed features for allergy management.",
      tech: ["React Native", "Mobile", "Notifications"],
      link: "#",
      image: minimedImage
    },
    {
      id: 5,
      title: "RFID Reading Web App",
      category: "Web App",
      role: "Developer",
      description: "Developed an RFID web application that seamlessly integrated with RFID data. Implemented features for RFID configuration, tapping, and history management.",
      tech: ["Laravel", "RFID", "Database"],
      link: "#",
      image: rfidImage
    },
    {
      id: 6,
      title: "Personal Finance Tracker",
      category: "Backend",
      role: "Backend Engineer",
      description: "Engineered a robust backend system for managing personal finances. Implemented secure user authentication with JWT and integrated Currencylayer API for multi-currency support.",
      tech: ["Node.js", "Express", "MongoDB", "JWT", "Jest"],
      link: "#",
      image: financeImage
    },
    {
      id: 7,
      title: "Fashion Globe",
      category: "Sales System",
      role: "Developer",
      description: "Developed a Customer Feedback System and a Loyalty Management System. Integrated analytics and reporting tools to track feedback trends and loyalty program performance.",
      tech: ["MERN", "Analytics", "Loyalty System"],
      link: "#",
      image: fashionImage
    },
    {
      id: 8,
      title: "CleanCity",
      category: "Smart System",
      role: "Developer",
      description: "Smart Waste Collection System. Designed administrative features including staff management and route optimization. Developed data analysis tools for performance reports.",
      tech: ["React", "Firebase", "Route Opt"],
      link: "#",
      image: cleancityImage
    },
    {
      id: 9,
      title: "E-voting System",
      category: "Full-Stack",
      role: "Developer",
      description: "Secure, multilingual e-voting platform with NIC-based authentication. Implemented secure user management with JWT and profile locking functionality.",
      tech: ["React", "Node.js", "MongoDB", "JWT"],
      link: "#",
      image: evotingImage
    }
  ];

  return (
    <NewPortfolio 
      projects={projects} 
      profile={profile}
      skills={skills}
      education={education}
      achievements={achievements}
    />
  );
};

export default Portfolio;