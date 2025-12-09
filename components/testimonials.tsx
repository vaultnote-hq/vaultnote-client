'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Security Consultant',
    content: 'Finally a secure note service that actually respects privacy. The zero-knowledge architecture means I can share sensitive client information without worry.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'David K.',
    role: 'Software Developer',
    content: 'I use VaultNote daily to share API keys and credentials with my team. The self-destruct feature is a game-changer for security.',
    rating: 5,
    avatar: 'DK',
  },
  {
    name: 'Lisa T.',
    role: 'Legal Professional',
    content: 'Swiss hosting and GDPR compliance were must-haves for us. VaultNote checks all the boxes for secure document sharing.',
    rating: 5,
    avatar: 'LT',
  },
  {
    name: 'Michael R.',
    role: 'IT Manager',
    content: 'We switched from Privnote to VaultNote for the better encryption and password protection. Haven\'t looked back since.',
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Emma W.',
    role: 'Journalist',
    content: 'Protecting sources is critical in my work. VaultNote\'s end-to-end encryption gives me peace of mind when receiving sensitive tips.',
    rating: 5,
    avatar: 'EW',
  },
  {
    name: 'Thomas B.',
    role: 'Startup Founder',
    content: 'Simple, secure, and free. We use VaultNote for sharing investor documents and confidential business information.',
    rating: 5,
    avatar: 'TB',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trusted by security-conscious users
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our users say about VaultNote's security and ease of use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full">
            <div className="flex -space-x-2">
              {['SM', 'DK', 'LT', 'MR'].map((initials, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              Join <span className="font-semibold text-foreground">500+</span> users protecting their data
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
