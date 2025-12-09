"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type { LucideIcon } from "lucide-react";
import {
  Bomb,
  Flag,
  Link2,
  Mail,
  PiggyBank,
  PlusIcon,
  ShieldCheck,
  Smartphone,
  UserRound,
} from "lucide-react";
import { useState } from "react";

type FAQItem = {
  icon: LucideIcon;
  question: string;
  answer: string;
};

const faq: FAQItem[] = [
  {
    icon: ShieldCheck,
    question: "How private are my notes?",
    answer:
      "Your notes are encrypted in your browser before they ever reach our servers. We literally cannot read them - the encryption key stays with you. Even if someone hacked our servers, they'd only find unreadable gibberish.",
  },
  {
    icon: Bomb,
    question: "Do notes really self-destruct?",
    answer:
      "Yes! Notes are permanently deleted after being read (if you enable that option) or after your chosen expiry time. Once gone, they're gone forever - no backups, no recovery, no trace.",
  },
  {
    icon: Flag,
    question: "Why Switzerland?",
    answer:
      "Switzerland has the world's strongest privacy laws. No US Cloud Act, no government backdoors, no mass surveillance. Your data is protected by Swiss law, not just our promises.",
  },
  {
    icon: UserRound,
    question: "Do I need an account?",
    answer:
      "No! You can create and share notes without registering. But with a free account, you get a dashboard to manage your notes, longer expiry times, and more features.",
  },
  {
    icon: PiggyBank,
    question: "Is VaultNote free?",
    answer:
      "The Starter plan is free forever - create up to 20 notes with 24h expiry. Pro ($5/month) unlocks unlimited notes, longer expiry, password protection, and attachments.",
  },
  {
    icon: Link2,
    question: "What if I lose the link?",
    answer:
      "If you lose the link, the note is gone. This is intentional - it means no one (including us) can recover it. With an account, you can see your notes in your dashboard.",
  },
  {
    icon: Smartphone,
    question: "Which devices work?",
    answer:
      "Any device with a modern browser - desktop, phone, tablet. Chrome, Firefox, Safari, Edge - they all work. No app needed.",
  },
  {
    icon: Mail,
    question: "How do I get help?",
    answer:
      "Email us at hello@vaultnote.net. We typically respond within 24 hours. Pro users get priority support.",
  },
];
const FAQ03 = () => {
  const [value, setValue] = useState<string>();

  return (
    <div className="py-16 sm:py-32 bg-muted/20">
      <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-lg mb-12">
          Everything you need to know about VaultNote.
        </p>

        <div className="w-full grid md:grid-cols-2 gap-x-10 gap-y-6">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(0, 4).map(({ icon: Icon, question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1 items-center justify-between py-4 font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                      "text-start text-lg gap-3"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      {question}
                    </span>
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-base text-muted-foreground text-pretty pl-9">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            {faq.slice(4).map(({ icon: Icon, question, answer }, index) => (
              <AccordionItem key={question} value={`question-${index + 4}`}>
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className={cn(
                      "flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                      "text-start text-lg gap-3"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      {question}
                    </span>
                    <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="text-base text-muted-foreground text-pretty pl-9">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ03;
