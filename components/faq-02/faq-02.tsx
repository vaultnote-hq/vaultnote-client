import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  {
    question: "How does VaultNote ensure my data privacy?",
    answer:
      "VaultNote uses end-to-end encryption where all encryption happens in your browser. Your notes are encrypted before they leave your device, and we store only encrypted data. We cannot read your content.",
  },
  {
    question: "Are my notes really deleted automatically?",
    answer:
      "Yes! Notes are automatically deleted after being read once or after a set time period (from minutes to years). You have full control over expiration times, and deletion happens permanently with no way to recover the content.",
  },
  {
    question: "Is VaultNote really free?",
    answer:
      "Yes, VaultNote is completely free with no subscription fees, premium features, or hidden costs. We believe secure communication should be accessible to everyone.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your data is stored in Switzerland with some of the world's strongest privacy laws. We use Swiss data centers that comply with GDPR and Swiss data protection regulations.",
  },
  {
    question: "Can I trust that my data is secure?",
    answer:
      "VaultNote uses military-grade AES-256 encryption and zero-knowledge architecture. Your encryption keys never leave your browser, and we have no access to your content. Many developers and security professionals trust VaultNote for sensitive communications.",
  },
];

const FAQ02 = () => {
  return (
    <div className="py-32 bg-muted/20">
      <div className="flex flex-col md:flex-row items-start gap-x-12 gap-y-6 max-w-screen-xl mx-auto px-6 py-12 xs:py-20">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
          Frequently Asked <br /> Questions
        </h2>

        <Accordion type="single" defaultValue="question-0" className="max-w-xl">
          {faq.map(({ question, answer }, index) => (
            <AccordionItem key={question} value={`question-${index}`}>
              <AccordionTrigger className="text-left text-lg">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ02;
