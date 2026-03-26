
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';
import type { testimonials } from '@/lib/data';

type Testimonial = typeof testimonials[number];

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-border/50 bg-card p-8 sm:p-10 transition-all duration-500 ease-out hover:shadow-2xl hover:border-primary/40 focus-within:ring-2 focus-within:ring-primary relative">
      <div className="absolute top-8 right-8 text-primary/10 transition-colors duration-500 group-hover:text-primary/20 pointer-events-none">
         <Quote className="w-20 h-20 fill-current" />
      </div>
      
      <div className="relative z-10 flex-grow mb-10">
        <h4 className="font-headline text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-6">
          "{testimonial.takeaway}"
        </h4>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
          {testimonial.quote}
        </p>
      </div>
      
      <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-border/40">
        <Avatar className="w-14 h-14 border border-border/60 shadow-sm transition-transform duration-500 group-hover:scale-105">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
          <AvatarFallback className="bg-primary/10 text-primary font-bold">{testimonial.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-bold text-foreground tracking-tight">{testimonial.name}</span>
          <span className="text-sm font-medium text-muted-foreground">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
