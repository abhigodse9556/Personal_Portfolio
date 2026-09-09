"use client";

import { IconName, icons } from "@/lib/icons";
import type { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, className, ...props }: IconProps) {
  const IconComponent = icons[name];

  return <IconComponent {...props} className={`w-4 h-4 ${className ?? ""}`} />;
}
