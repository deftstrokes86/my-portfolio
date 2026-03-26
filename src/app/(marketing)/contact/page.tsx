
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/data';
import { Calendar, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Let's Build Something Great
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl/relaxed">
          Have a project in mind, or just want to say hello? I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <h2 className="font-headline text-2xl font-bold">Contact Form</h2>
            <ContactForm />
        </div>
        <div className="space-y-8">
            <h2 className="font-headline text-2xl font-bold">Other Ways to Reach Me</h2>
            <div className="space-y-4">
                <p className="text-muted-foreground">
                    If you prefer, you can also reach out to me directly through these channels.
                </p>
                <Button asChild className="w-full" size="lg">
                    <a href="https://calendly.com/deftsteve/30min" target="_blank" rel="noopener noreferrer">
                        <Calendar className="mr-2 h-5 w-5" />
                        Book a Meeting on Calendly
                    </a>
                </Button>
                 <Button asChild className="w-full" size="lg" variant="outline">
                    <a href={`mailto:steveigbeuike@gmail.com?subject=Project%20Inquiry%20from%20${siteConfig.name}%20Portfolio`}>
                        <Mail className="mr-2 h-5 w-5" />
                        Send a Direct Email
                    </a>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
