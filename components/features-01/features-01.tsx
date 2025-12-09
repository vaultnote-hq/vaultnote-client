import {
  Shield,
  Lock,
  Clock,
  Zap,
  Eye,
  MapPin,
} from "lucide-react";
import React from "react";

// Core features for homepage - simplified
const coreFeatures = [
  {
    icon: Shield,
    title: "AES-256-GCM Encryption",
    description:
      "Military-grade encryption. The same standard used by governments and banks.",
  },
  {
    icon: Lock,
    title: "Zero-Knowledge",
    description:
      "We cannot read your notes. Encryption keys exist only in your browser.",
  },
  {
    icon: Clock,
    title: "Self-Destruction",
    description:
      "Notes auto-delete after being read or after a set time period.",
  },
  {
    icon: Zap,
    title: "Client-Side Encryption",
    description:
      "All encryption happens in your browser before data leaves your device.",
  },
  {
    icon: Eye,
    title: "One-Time Reading",
    description:
      "Notes can be set to delete immediately after being viewed once.",
  },
  {
    icon: MapPin,
    title: "Swiss Hosting",
    description:
      "Hosted in Switzerland with the world's strongest privacy laws.",
  },
];

const Features01Page = () => {
  return (
    <div className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
      <div className="max-w-screen-xl mx-auto w-full px-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
          Why VaultNote?
        </h2>
        <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto">
          Built with modern cryptography and designed for maximum privacy.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border border-border/50 rounded-xl py-6 px-5 bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="mb-4 h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full">
                <feature.icon className="size-6 text-primary" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features01Page;
