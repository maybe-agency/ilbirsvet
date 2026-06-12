import {
  Activity,
  ArrowUpRight,
  Clock3,
  FlaskConical,
  HeartPulse,
  Instagram,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  ScanLine,
  ShieldCheck,
  Stethoscope,
  Syringe,
  UsersRound,
} from "lucide-react";

const iconMap = {
  activity: Activity,
  clock: Clock3,
  cross: HeartPulse,
  flask: FlaskConical,
  heart: HeartPulse,
  scan: ScanLine,
  shield: ShieldCheck,
  stethoscope: Stethoscope,
  syringe: Syringe,
  users: UsersRound,
} as const;

export function DataIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name as keyof typeof iconMap] ?? Microscope;
  return <Icon className={className} aria-hidden="true" />;
}

export { ArrowUpRight, Instagram, Menu, MessageCircle, Phone };

