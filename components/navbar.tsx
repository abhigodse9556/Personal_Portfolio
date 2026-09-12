"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Icon } from "./ui/icon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const [activeSection, setActiveSection] = useState("");

  const sections = [
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Skills",
      href: "#skills",
    },
    {
      name: "Journey",
      href: "#journey",
    },
    {
      name: "Work",
      href: "#work",
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
      className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur font-mono"
    >
      <div className="mx-auto flex items-center justify-between gap-4 px-6 py-3">
        {/* Logo */}
        <div className="shrink-0 text-primary">
          <span className="text-xl font-semibold tracking-tight">Abhi.dev</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="flex items-center justify-center rounded-md p-2 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <Icon name={isOpen ? "x" : "menu"} />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-4">
          {sections.map((section) => (
            <a
              key={section.name}
              href={section.href}
              className="nav-link transition-colors hover:text-primary"
              onClick={() => setActiveSection(section.name)}
            >
              {section.name}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <button className="bg-primary text-primary-foreground px-4 py-2 transition-colors hover:bg-primary/80 rounded-full">
            Get In Touch
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`border-t border-border min-h-[calc(100vh-4rem)] md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col px-6 py-4">
          {sections.map((section) => (
            <a
              key={section.name}
              href={section.href}
              onClick={() => {
                setActiveSection(section.name);
                setIsOpen(false);
              }}
              className={`nav-link flex-1 border-b border-border py-3 ${section.name === activeSection ? "text-warning border-b-2 bg-amber-100 px-1" : "text-primary"}`}
            >
              {section.name}
            </a>
          ))}
          <button className="bg-primary text-primary-foreground px-4 py-2 transition-colors hover:bg-primary/80 rounded-full mt-4">
            Get In Touch
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
