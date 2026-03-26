
export const siteConfig = {
  name: 'Stephen-Igwebuike',
  author: 'Stephen Maclaurin Igwebuike',
  description: 'Designer-engineer building Next.js & WordPress products with technical SEO. Author of two short-story horror anthologies.',
  url: 'https://stephenigwebuike.com',
  heroTagline: 'I design & engineer standout web experiences',
  bio: 'I specialize in creating beautiful, functional, and accessible web experiences. With a passion for design and technology, I turn complex problems into elegant solutions.',
  socials: {
    twitter: 'https://twitter.com/sempiternal14u',
    github: 'https://github.com/deftstrokes86',
    linkedin: 'https://linkedin.com/in/stephen-maclaurin-igwebuike',
  }
};

export const projects = [
  {
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    summary: 'A scalable e-commerce solution with a focus on user experience and performance.',
    problem: 'High bounce rates and slow, convoluted checkout processes were actively hurting overall sales.',
    outcome: 'Conversion rates increased by 40% and infrastructure TTFB dropped under 1 second.',
    role: 'Lead Developer',
    year: 2023,
    tags: ['Next.js', 'TypeScript', 'GraphQL', 'Stripe'],
    cover: 'https://placehold.co/600x400.png',
    gallery: [],
    liveURL: 'https://example.com',
    repoURL: 'https://github.com/example',
    hint: 'online store',
  },
  {
    title: 'SaaS Dashboard',
    slug: 'saas-dashboard',
    summary: 'A data-driven dashboard for a SaaS product, providing users with actionable insights.',
    problem: 'Users could not visually parse complex dataset clusters, leading to churn and frustration.',
    outcome: 'Increased daily active usage by 25% and reduced customer support volume by half.',
    role: 'Front-End Engineer',
    year: 2022,
    tags: ['React', 'D3.js', 'Node.js', 'REST API'],
    cover: 'https://placehold.co/600x400.png',
    gallery: [],
    liveURL: 'https://example.com',
    repoURL: 'https://github.com/example',
    hint: 'analytics dashboard',
  },
  {
    title: 'Mobile Banking App',
    slug: 'mobile-banking-app',
    summary: 'A secure and intuitive mobile app for a leading financial institution.',
    problem: 'Legacy mobile codebase was inaccessible and lacked unified brand design tokens.',
    outcome: 'Achieved WCAG 2.1 AA compliance and shipped a universal cross-platform design system.',
    role: 'UI/UX Designer & Developer',
    year: 2021,
    tags: ['React Native', 'Firebase', 'Figma', 'UX/UI'],
    cover: 'https://placehold.co/600x400.png',
    gallery: [],
    liveURL: 'https://example.com',
    repoURL: 'https://github.com/example',
    hint: 'finance app',
  },
];

export const caseStudies = [
  {
    projectTitle: 'E-Commerce Platform',
    slug: 'ecommerce-case-study',
    problem: 'The client needed a new e-commerce platform that could handle high traffic, provide a seamless user experience, and integrate with their existing inventory management system.',
    approach: 'We conducted user research to understand customer needs, designed a new UI in Figma, and developed a custom Next.js application. We used GraphQL for efficient data fetching and Stripe for payments.',
    results: 'The new platform resulted in a 40% increase in conversion rates, a 60% improvement in page load times, and a significant reduction in bounce rates.',
    tech: ['Next.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Stripe', 'Figma'],
    timeline: '6 months',
  }
];

export const testimonials = [
  {
    name: 'Stephen Shepherd',
    role: 'CEO, Consumers United',
    avatar: 'https://placehold.co/100x100.png',
    quote: 'Working with Steve was a fantastic experience. Their attention to detail and commitment to quality are second to none. The final product exceeded all our expectations.',
    hint: 'woman professional'
  },
  {
    name: 'Lourdes Diaz',
    role: 'Tech Lead, Repair Lift',
    avatar: 'https://placehold.co/100x100.png',
    quote: 'Steve is a true professional. They are not only technically skilled but also have a great eye for design. I would highly recommend them to anyone.',
    hint: 'man professional'
  },
  {
    name: 'Dennis Bede',
    role: 'Founder, Technocrati Designs & Solutions.',
    avatar: 'https://placehold.co/100x100.png',
    quote: 'The passion Steve brings to their work is infectious. They consistently delivered high-quality work on time and was a pleasure to collaborate with.',
    hint: 'woman smiling'
  },
  {
    name: 'David Chen',
    role: 'CTO, Data Insights',
    avatar: 'https://placehold.co/100x100.png',
    quote: 'An incredibly talented developer. Steve was able to tackle complex challenges with ease and delivered a robust, scalable solution for our dashboard.',
    hint: 'man glasses'
  },
];

export type Writing = {
    title: string;
    slug: string;
    summary: string;
    content: string;
    tags: string[];
    date: string;
    readTime: string;
};

export const writing: Writing[] = [
    {
        title: 'React Server Components Demystified: Boost Performance & Simplify Your Code',
        slug: 'react-server-components',
        summary: 'Demystifying React Server Components (RSC) for improved React performance, simplified code, and enhanced SEO. Learn how RSCs boost your React optimization.',
        content: `React Server Components (RSC) are a revolutionary new feature in React that promise to drastically improve performance and simplify your code. This article will demystify RSCs, breaking them down in a simple manner so both beginners and advanced React engineers can make the most of them. We'll cover everything from the core concepts to practical examples.

## What are React Server Components?

Traditionally, React components run in the browser. **React Server Components** (RSC), however, execute on the server. This seemingly simple change has profound implications for **React performance** and the overall **React architecture**.

Think of it this way: your application code is split. Some components render on the server, while others remain client-side components. This allows you to:

*   **Reduce client-side JavaScript:** Server components don't contribute to the client-side bundle size, resulting in faster initial load times.
*   **Access server-side data directly:** No more API endpoints for simple data fetching. Server components can directly query databases or access file systems.
*   **Improve SEO:** Because content is rendered on the server, search engines can easily crawl and index your application, boosting your SEO.

## How do React Server Components Work?

1.  **The Server Renders:** When a user requests a page, the server executes the RSCs.
2.  **Serialization:** The server serializes the output of these components into a special data format.
3.  **The Client Hydrates:** The client receives this serialized data and uses it to update the UI. This process is very efficient because only the data needed to update the UI is sent, not the entire component.

This "render once on the server, hydrate efficiently on the client" approach is what makes RSCs so powerful.

## Benefits of Using React Server Components

*   **Improved Performance:** Smaller client-side bundles and faster initial load times significantly improve the user experience. This is a major win for **React performance**.
*   **Simplified Data Fetching:** Eliminating the need for separate API endpoints for certain data fetching scenarios simplifies your codebase.
*   **Enhanced Security:** Server components allow you to keep sensitive logic and data access on the server, enhancing your application's security.
*   **Better SEO:** **Server-side rendering** by default leads to improved search engine optimization.

## React Server Components vs. Traditional Server-Side Rendering (SSR)

While both RSCs and traditional **server-side rendering** (SSR) execute code on the server, they differ in several key aspects:

*   **Granularity:** SSR renders the entire application on the server, while RSCs allow you to selectively render specific components on the server.
*   **Hydration:** SSR requires hydrating the entire application on the client, which can be slow. RSCs use a more efficient hydration process, only updating the necessary parts of the UI.
*   **Interactivity:** Client components within an RSC application remain fully interactive.

## Getting Started with React Server Components

The easiest way to start using RSCs is with **Next.js**. Next.js provides built-in support for RSCs and simplifies the development process. Here's a basic example:

\`\`\`javascript
// app/components/MyServerComponent.js
// This is a server component (by default in Next.js 'app' directory)
export default async function MyServerComponent() {
  const data = await fetchDataFromDatabase();
  return (
    <div>
      <h2>Data from Server</h2>
      <p>{data}</p>
    </div>
  );
}

async function fetchDataFromDatabase() {
  // Replace with your actual database query
  return 'This data was fetched on the server!';
}
\`\`\`

In this example, \`MyServerComponent\` is a server component. It directly fetches data from a hypothetical \`fetchDataFromDatabase\` function (which would execute server-side). This data is then rendered into the component's output.

## Best Practices for Using React Server Components

*   **Use Server Components for Data Fetching:** Offload data fetching to server components to reduce client-side JavaScript.
*   **Use Client Components for Interactivity:** Keep interactive components client-side to maintain a smooth user experience.
*   **Optimize Data Serialization:** Ensure your data serialization process is efficient to minimize the amount of data sent to the client.
*   **Consider using Next.js:** Next.js significantly simplifies the implementation of **React Server Components**.

## Common Pitfalls to Avoid

*   **Accidental Client-Side Dependencies:** Be careful not to import client-side modules into server components.
*   **Overusing Server Components:** Don't move all your components to the server. Client components are still essential for interactivity.
*   **Ignoring Performance Monitoring:** Continuously monitor your application's performance to identify and address any bottlenecks.

## React Server Components and the Future of React

**React Server Components** represent a significant shift in **React architecture**. They offer a powerful way to optimize **React performance**, simplify data fetching, and improve the overall developer experience. As the React ecosystem continues to evolve, RSCs are likely to become an increasingly important part of building modern web applications.

Understanding and embracing RSCs is crucial for any React developer looking to stay ahead of the curve and build high-performance, scalable applications. By understanding the nuances of RSCs, including their benefits, implementation details, and best practices, you can leverage this powerful tool to significantly improve your applications and **React optimization** strategy.
`,
        tags: ['React', 'Next.js', 'Web Performance'],
        date: '2024-05-15',
        readTime: '8 min read',
    },
    {
        title: 'The Unreasonable Effectiveness of Declarative Design Systems',
        slug: 'declarative-design-systems',
        summary: 'Exploring how declarative component APIs, like those in React and SwiftUI, lead to more robust, maintainable, and scalable design systems.',
        content: `In a declarative UI paradigm, you describe *what* you want the UI to look like for a given state, and the framework takes care of the *how*. This is in contrast to imperative programming, where you manually manipulate UI elements.

## Benefits for Design Systems

- **Predictability:** Components become predictable and easier to reason about. The UI is a pure function of its state.
- **Composability:** Small, single-purpose components can be composed into more complex UIs, promoting reusability.
- **Easier Maintenance:** When a component's logic is self-contained, it's easier to debug and update without causing unintended side effects.

This approach, popularized by React, has fundamentally changed how we build user interfaces and is a cornerstone of modern design systems.`,
        tags: ['UI/UX', 'Design Systems', 'React', 'Software Architecture'],
        date: '2024-04-22',
        readTime: '6 min read',
    }
];

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
  { href: '/cms', label: 'CMS' },
];
