import { Icon } from "./ui/icon";

const Navbar = () => {
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
    <nav className="fixed z-50 w-full flex items-center justify-between flex-wrap bg-background px-6 py-3 border-b border-border">
      <div className="flex items-center shrink-0 text-primary mr-6">
        <span className="font-semibold text-xl tracking-tight">Abhi.dev</span>
      </div>
      <div className="flex gap-4 justify-between">
        {sections.map((section) => (
          <a
            key={section.name}
            href={section.href}
            className="block py-2 pr-4 pl-3 md:p-0"
          >
            {section.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
