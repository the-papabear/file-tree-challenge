import { icons } from "lucide-react";

const Icon = ({ name, size = 16, className }) => {
  const LucideIcon = icons[name];

  return <LucideIcon size={size} className={className} />;
};

export default Icon;
