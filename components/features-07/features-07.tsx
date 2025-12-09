import {
  Shield,
  Lock,
  Clock,
  Zap,
  Eye,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Shield,
    title: "End-to-End Encrypted",
    description:
      "Military-grade AES-256 encryption protects your notes from the moment you create them.",
  },
  {
    icon: Lock,
    title: "Zero-Knowledge",
    description:
      "We cannot read your notes. The encryption keys exist only in your browser.",
  },
  {
    icon: Clock,
    title: "Automatic Self-Destruction",
    description:
      "Notes automatically delete after being read or after a set time period.",
  },
  {
    icon: Zap,
    title: "Instant Encryption",
    description:
      "All encryption happens instantly in your browser before any data leaves your device.",
  },
  {
    icon: Eye,
    title: "One-Time Reading",
    description:
      "Notes are automatically deleted after being viewed once for maximum security.",
  },
  {
    icon: MapPin,
    title: "Swiss Privacy Laws",
    description:
      "Hosted in Switzerland with some of the world's strongest privacy regulations.",
  },
];

const Features07Page = () => {
  return (
    <div className="py-16 sm:py-32">
      <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight sm:max-w-xl text-pretty sm:mx-auto sm:text-center">
          Everything you need for secure communication
        </h2>
        <p className="mt-2 text-muted-foreground text-lg sm:text-xl sm:text-center">
          Built with modern cryptography and designed for maximum privacy.
        </p>
        <div className="mt-12 sm:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-y-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="flex gap-6 items-center rounded-lg -mx-2 sm:mx-0 max-w-lg">
                <div className="h-24 aspect-square shrink-0 rounded-lg bg-muted flex items-center justify-center">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <div className="">
                  <span className="font-semibold tracking-[-0.015em] text-lg">
                    {feature.title}
                  </span>
                  <p className="mt-1 text-sm text-muted-foreground text-pretty">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features07Page;
