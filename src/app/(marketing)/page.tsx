
import HeroScrolly from '@/components/hero/HeroScrolly';
import { ProjectCard } from '@/components/project-card';
import { TestimonialCard } from '@/components/testimonial-card';
// import { SemanticSearch } from '@/components/semantic-search';
import { projects, testimonials, siteConfig, caseStudies } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';


export default function Home() {
    const allDocuments = [
        ...projects.map(p => ({ type: 'Project', data: p, content: `Project: ${p.title}. Summary: ${p.summary}. Role: ${p.role}. Tags: ${p.tags.join(', ')}.` })),
        ...caseStudies.map(cs => ({ type: 'Case Study', data: cs, content: `Case Study for ${cs.projectTitle}. Problem: ${cs.problem}. Approach: ${cs.approach}. Results: ${cs.results}.` }))
    ];
  return (
    <>
      <HeroScrolly />
      <div className="container mx-auto px-4 md:px-6">
        <Services />
        <Process />
      </div>
      
      {/* Work Section */}
      <section id="work" className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Featured Work
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl/relaxed">
              A selection of my projects. See what I can do for you.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32  bg-secondary/30">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What My Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl/relaxed">
              I have been fortunate to work with amazing people.
            </p>
          </div>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>
        </div>
      </section>

      {/* Semantic Search Section */}
      <section id="search" className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
           <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Find What You Need
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl/relaxed">
              Use our smart search to find relevant projects and case studies based on your needs.
            </p>
          </div>
          {/* <SemanticSearch documents={allDocuments} /> */}
        </div>
      </section>
    </>
  );
}
