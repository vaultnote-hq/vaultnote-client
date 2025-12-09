import { Lock, Share2, Eye, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    step: "01",
    title: "Create Secure Note",
    details:
      "Write your message and set expiration time. All encryption happens instantly in your browser before any data leaves your device.",
    icon: Lock,
  },
  {
    step: "02",
    title: "Share Link",
    details:
      "Get a unique, secure link that you can share via email, chat, or any messaging platform. No account or registration required.",
    icon: Share2,
  },
  {
    step: "03",
    title: "Recipient Reads",
    details:
      "The recipient opens the link and reads your secure message. The note is automatically deleted after being viewed once.",
    icon: Eye,
  },
  {
    step: "04",
    title: "Auto-Destruction",
    details:
      "After reading (or time expiration), the note is permanently deleted from our servers. Zero data retention, maximum privacy.",
    icon: Trash2,
  },
];

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-16 sm:py-32 bg-muted/20">
      <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight sm:max-w-xl text-pretty sm:mx-auto sm:text-center">
          How VaultNote Works
        </h2>
        <p className="mt-2 text-muted-foreground text-lg sm:text-xl sm:text-center">
          Simple, secure, and automatic. Create, share, and forget - your data disappears forever.
        </p>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse"
            >
              <div className="w-full aspect-[4/3] bg-muted/30 rounded-xl border border-border/50 basis-1/2 flex items-center justify-center relative">
                <step.icon className="h-12 w-12 text-primary" />
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {step.step}
                </div>
              </div>
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-medium text-sm text-muted-foreground">
                  Step {step.step}
                </span>
                <h4 className="my-3 text-2xl font-semibold tracking-tight">
                  {step.title}
                </h4>
                <p className="text-muted-foreground">{step.details}</p>
                {index === steps.length - 1 && (
                  <Button asChild size="lg" className="mt-6 gap-3">
                    <Link href="/create">
                      Get Started <ArrowRight />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
