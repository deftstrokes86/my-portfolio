
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { testimonials } from '@/lib/data';

type Testimonial = (typeof testimonials)[0];

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full border-primary/10 bg-card">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className='w-12 h-12'>
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="italic text-foreground/80 before:content-['“'] after:content-['”']">
          {testimonial.quote}
        </blockquote>
      </CardContent>
    </Card>
  );
}
