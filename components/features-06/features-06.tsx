import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Clock } from "lucide-react";
import Link from "next/link";

const features = [
  {
    category: "Security",
    title: "End-to-End Encrypted",
    details:
      "Military-grade AES-256 encryption protects your notes from the moment you create them. Your data is encrypted before it leaves your browser, ensuring complete privacy.",
    tutorialLink: "/security",
    icon: Shield,
  },
  {
    category: "Privacy",
    title: "Zero-Knowledge Architecture",
    details:
      "We cannot read your notes. The encryption keys exist only in your browser. Our servers store only encrypted data, making it impossible for us to access your content.",
    tutorialLink: "/security",
    icon: Lock,
  },
  {
    category: "Automation",
    title: "Automatic Self-Destruction",
    details:
      "Notes automatically delete after being read or after a set time period. Set expiration times from minutes to years, giving you complete control over your data lifecycle.",
    tutorialLink: "/features",
    icon: Clock,
  },
];

const Features06Page = () => {
  return (
    <div className="py-32">
      <div className="max-w-6xl w-full py-10 px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight sm:max-w-xl text-pretty sm:mx-auto sm:text-center">
          Everything you need for secure communication
        </h2>
        <p className="mt-2 text-muted-foreground text-lg sm:text-xl sm:text-center">
          Built with modern cryptography and designed for maximum privacy.
        </p>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => (
            <div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse"
            >
              <div className="w-full aspect-[4/3] bg-muted/30 rounded-xl border border-border/50 basis-1/2 flex items-center justify-center">
                <feature.icon className="h-12 w-12 text-primary" />
              </div>
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-medium text-sm text-muted-foreground">
                  {feature.category}
                </span>
                <h4 className="my-3 text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground">{feature.details}</p>
                <Button asChild size="lg" className="mt-6 gap-3">
                  <Link href={feature.tutorialLink}>
                    Learn More <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features06Page;
