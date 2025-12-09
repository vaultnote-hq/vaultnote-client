import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import React, { ComponentProps } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    designation: "Security Engineer",
    company: "CryptoTech",
    testimonial:
      "VaultNote has become essential for our team's sensitive communications. The zero-knowledge encryption gives us complete confidence that our data stays private.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    designation: "Full-Stack Developer",
    company: "DevSecure",
    testimonial:
      "As a developer, I appreciate the technical implementation. Client-side encryption, automatic deletion, and no tracking - exactly what privacy-focused apps should offer.",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    designation: "Privacy Researcher",
    company: "Digital Rights Foundation",
    testimonial:
      "I've tested many secure messaging solutions, and VaultNote stands out with its commitment to true privacy. No backdoors, no data collection - just secure, ephemeral communication.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Alex Thompson",
    designation: "Product Manager",
    company: "SecureComm Inc",
    testimonial:
      "Our company switched to VaultNote for all sensitive client communications. The automatic self-destruction feature gives us peace of mind, and it's completely free.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Lisa Park",
    designation: "Cybersecurity Consultant",
    company: "PrivacyFirst",
    testimonial:
      "In my line of work, trust is everything. VaultNote's Swiss hosting and military-grade encryption meet the highest standards for secure communication.",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    name: "David Kim",
    designation: "Software Architect",
    company: "SecureDev",
    testimonial:
      "The simplicity is brilliant. No accounts, no subscriptions, just create a secure note and share the link. Perfect for developers who value both security and ease of use.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const Testimonial04 = () => (
  <div className="py-32">
    <div className="h-full w-full">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center tracking-[-0.03em] px-6 text-pretty">
        Trusted by Security Experts
      </h2>
      <p className="mt-3 text-center text-muted-foreground text-xl">
        Real feedback from developers and security professionals who rely on VaultNote
      </p>
      <div className="mt-14 relative">
        <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-linear-to-r from-background to-transparent" />
        <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-linear-to-l from-background to-transparent" />
        <Marquee pauseOnHover className="[--duration:20s]">
          <TestimonialList />
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-0 [--duration:20s]">
          <TestimonialList />
        </Marquee>
      </div>
    </div>
  </div>
);

const TestimonialList = () =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="min-w-96 max-w-sm bg-accent rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="#" target="_blank">
            <TwitterLogo className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
    </div>
  ));

const TwitterLogo = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

export default Testimonial04;
