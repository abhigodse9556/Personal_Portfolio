"use client";

import { useState } from "react";
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
      name: "Experience",
      href: "#experience",
    },
    {
      name: "Projects",
      href: "#projects",
    },
    {
      name: "Education",
      href: "#education",
    },
    {
      name: "Certificates",
      href: "#certificates",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex items-center justify-between px-6 py-3">
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
        <div className="hidden items-center gap-6 md:flex">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
