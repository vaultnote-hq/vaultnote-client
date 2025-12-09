import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lock, MapPin } from "lucide-react";
import Link from "next/link";

const Hero07 = () => {
  return (
    <div className="relative flex items-center justify-center px-6 py-24 sm:py-32 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12"
        )}
      />
      <div className="relative z-10 text-center max-w-3xl">
        {/* Punchy tagline like NopeNotes */}
        <p className="text-sm font-medium text-muted-foreground tracking-wide mb-6">
          Zero-Knowledge. Swiss Hosted. No Tracking.
        </p>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.1] font-bold tracking-tight">
          <span className="block">Share Passwords & Notes that </span>
          <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            disappear forever.
          </span>
        </h1>
        
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Encrypted notes that self-destruct after reading. 
          We can't read them. Neither can anyone else.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base" asChild>
            <Link href="/create">
              <Lock className="mr-2 h-5 w-5" />
              Create Secure Note
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 px-8 text-base shadow-none"
            asChild
          >
            <Link href="/register">
              Create Free Account
            </Link>
          </Button>
        </div>
        
        {/* Trust indicator */}
        <p className="mt-8 text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          <MapPin className="h-3 w-3" />
          Hosted in Switzerland · AES-256 Encryption
        </p>
      </div>
    </div>
  );
};

export default Hero07;
