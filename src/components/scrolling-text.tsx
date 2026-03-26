'use client';

import { motion } from 'framer-motion';

const scrollingText = {
  animate: {
    x: ['-100%', '100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 20,
        ease: 'linear',
      },
    },
  },
};

export function ScrollingText() {
  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="whitespace-nowrap"
        variants={scrollingText}
        animate="animate"
      >
        <span className="mx-4 text-lg font-medium">Next.js</span>
        <span className="mx-4 text-lg font-medium">React</span>
        <span className="mx-4 text-lg font-medium">TypeScript</span>
        <span className="mx-4 text-lg font-medium">Tailwind CSS</span>
        <span className="mx-4 text-lg font-medium">Framer Motion</span>
        <span className="mx-4 text-lg font-medium">Shadcn/UI</span>
        <span className="mx-4 text-lg font-medium">Vercel</span>
        <span className="mx-4 text-lg font-medium">Genkit</span>
      </motion.div>
    </div>
  );
}
