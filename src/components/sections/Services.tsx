import React from 'react';

const CAPABILITIES = [
  {
    id: 'core',
    title: 'Core Stack',
    description: 'The foundational languages and syntax rules I utilize to build robust logic and scalable codebases.',
    skills: ['TypeScript', 'JavaScript (ES6+)', 'PHP', 'HTML5', 'CSS3 / Modern CSS', 'SQL'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Ecosystems',
    description: 'Modern environments and libraries for building interactive, high-performance interfaces and APIs.',
    skills: ['React', 'Next.js', 'Node.js', 'WordPress', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    id: 'engineering',
    title: 'Engineering Focus',
    description: 'Bridging the gap between complex requirements and human-centered, maintainable execution.',
    skills: [
      'Design systems architecture', 
      'Component-driven development', 
      'Accessibility-first (WCAG AA)', 
      'Performance-minded builds', 
      'Semantic HTML structure',
      'Fluid responsive layouts'
    ],
  },
  {
    id: 'tooling',
    title: 'Tooling & Workflow',
    description: 'The exact tools and environments that enable me to design, build, test, and ship code safely.',
    skills: ['Git / GitHub versioning', 'Figma (prototyping)', 'Vite build tooling', 'npm / pnpm', 'Chrome DevTools', 'Lighthouse / Web Vitals'],
  },
  {
    id: 'delivery',
    title: 'Delivery Strengths',
    description: 'The tangible products and specific implementations I consistently successfully ship to production.',
    skills: [
      'Custom WordPress themes', 
      'React/Next.js web apps', 
      'API & webhook integrations', 
      'Performance optimization', 
      'Legacy rebuilds & refactors', 
      'Accessibility remediation'
    ],
  }
];

export default function Services() {
  return (
    <section aria-labelledby="capabilities-heading" className="w-full">
      <div className="flex flex-col mb-16 max-w-3xl">
        <h2 id="capabilities-heading" className="font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
          Technical Capabilities
        </h2>
        <p className="mt-6 text-muted-foreground md:text-xl leading-relaxed">
          I am a designer-engineer with an expansive range across environments. I prioritize performance, semantic code, and accessibility without sacrificing high-end aesthetic execution.
        </p>
      </div>

      <div className="w-full flex flex-col pt-4">
        {CAPABILITIES.map((category) => (
          <div 
            key={category.id} 
            className="flex flex-col md:flex-row py-10 md:py-14 border-t border-border/60 group transition-colors hover:bg-secondary/20 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl"
          >
             {/* Left Column: Heading & Context */}
             <div className="md:w-1/3 pr-4 lg:pr-12 mb-8 md:mb-0">
                <h3 className="text-2xl font-bold font-headline text-foreground tracking-tight">{category.title}</h3>
                <p className="text-muted-foreground mt-3 text-sm md:text-base leading-relaxed">{category.description}</p>
             </div>
             
             {/* Right Column: Skill Matrix */}
             <div className="md:w-2/3 md:pl-8 lg:pl-12 flex items-center">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 w-full">
                   {category.skills.map((skill, index) => (
                      <li key={index} className="flex items-start gap-4">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0 group-hover:bg-primary transition-colors duration-300"></div>
                         <span className="text-foreground/90 font-medium text-base sm:text-lg leading-snug">{skill}</span>
                      </li>
                   ))}
                </ul>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
