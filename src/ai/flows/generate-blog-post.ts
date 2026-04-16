'use server';

/**
 * @fileOverview A flow for generating blog posts using AI.
 * 
 * - generateBlogPost - A function that generates a blog post based on a topic, style, and SEO keywords.
 * - BlogPostInput - The input type for the generateBlogPost function.
 * - BlogPostOutput - The return type for the generateBlogPost function.
 * - suggestSeoKeywords - A function that suggests SEO keywords for a given topic.
 * - suggestTopics - A function that suggests blog post topics based on a description.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const BlogPostInputSchema = z.object({
  topic: z.string().describe('The main topic or title of the blog post.'),
  description: z.string().describe('A detailed description or outline of what the blog post should cover. This provides more context for the AI.'),
  style: z.string().describe('The desired writing style (e.g., casual, formal, witty, technical).'),
  seoKeywords: z.string().describe('A comma-separated list of SEO keywords to include in the post.'),
});
export type BlogPostInput = z.infer<typeof BlogPostInputSchema>;

const BlogPostOutputSchema = z.object({
  title: z.string().describe('A compelling, SEO-friendly title for the blog post.'),
  content: z.string().describe('The full content of the blog post in Markdown format. It should be well-structured with headings, paragraphs, and lists where appropriate. The content should naturally incorporate the provided SEO keywords.'),
  metaDescription: z.string().describe('A brief, SEO-optimized summary of the blog post (max 160 characters).'),
});
export type BlogPostOutput = z.infer<typeof BlogPostOutputSchema>;

const SeoKeywordsInputSchema = z.object({
  topic: z.string().describe('The topic to get SEO keyword suggestions for.'),
});

const SeoKeywordsOutputSchema = z.object({
    keywords: z.string().describe('A comma-separated list of 5-7 relevant SEO keywords for the given topic.')
});

const TopicSuggestionInputSchema = z.object({
    description: z.string().describe('A description of the desired blog post content.')
});

const TopicSuggestionOutputSchema = z.object({
    topics: z.array(z.string()).describe('A list of 3-5 compelling, SEO-friendly topics/titles for the blog post.')
});


export async function generateBlogPost(input: BlogPostInput): Promise<BlogPostOutput> {
  return generateBlogPostFlow(input);
}

export async function suggestSeoKeywords(topic: string): Promise<string> {
    const {keywords} = await suggestSeoKeywordsFlow({topic});
    return keywords;
}

export async function suggestTopics(description: string): Promise<string[]> {
    const {topics} = await suggestTopicsFlow({description});
    return topics;
}

const generateBlogPostPrompt = ai.definePrompt({
  name: 'generateBlogPostPrompt',
  input: {schema: BlogPostInputSchema},
  output: {schema: BlogPostOutputSchema},
  prompt: `You are an expert content creator and SEO specialist. Your task is to write a high-quality, engaging, and SEO-optimized blog post.

**Topic/Title:** {{{topic}}}

**Description/Outline:** {{{description}}}

**Writing Style:** {{{style}}}

**SEO Keywords to include:** {{{seoKeywords}}}

**Instructions:**
1.  **Title:** Use the exact title provided in the 'Topic/Title' field.
2.  **Content:** Write a comprehensive and well-structured blog post based on the topic and description. The post must be in Markdown format.
    -   Use headings, subheadings, paragraphs, and bullet points to improve readability.
    -   Naturally and strategically weave the provided SEO keywords into the content. Avoid keyword stuffing.
    -   The tone of the post should match the specified writing style.
    -   Ensure the content is informative, accurate, and engaging for the reader.
3.  **Meta Description:** Write a concise meta description (maximum 160 characters) that summarizes the post and includes the primary keyword(s).

Please provide the output in the requested JSON format.
`,
});

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: BlogPostInputSchema,
    outputSchema: BlogPostOutputSchema,
  },
  async (input: BlogPostInput) => {
    // The prompt now uses input.topic as the title, so we can call it directly.
    const {output} = await generateBlogPostPrompt(input);
    return output!;
  }
);


const suggestKeywordsPrompt = ai.definePrompt({
    name: 'suggestKeywordsPrompt',
    input: {schema: SeoKeywordsInputSchema},
    output: {schema: SeoKeywordsOutputSchema},
    prompt: `You are an SEO specialist. Based on the following blog post topic, suggest 5-7 relevant, comma-separated SEO keywords.

**Topic:** {{{topic}}}
`,
});

const suggestSeoKeywordsFlow = ai.defineFlow(
    {
        name: 'suggestSeoKeywordsFlow',
        inputSchema: SeoKeywordsInputSchema,
        outputSchema: SeoKeywordsOutputSchema,
    },
    async (input: { topic: string }) => {
        const {output} = await suggestKeywordsPrompt(input);
        return output!;
    }
);

const suggestTopicPrompt = ai.definePrompt({
    name: 'suggestTopicPrompt',
    input: {schema: TopicSuggestionInputSchema},
    output: {schema: TopicSuggestionOutputSchema},
    prompt: `You are an expert copywriter specializing in creating viral, SEO-friendly blog post titles. Based on the following description, generate a list of 3-5 compelling topics.

**Description:** {{{description}}}
`,
});

const suggestTopicsFlow = ai.defineFlow(
    {
        name: 'suggestTopicsFlow',
        inputSchema: TopicSuggestionInputSchema,
        outputSchema: TopicSuggestionOutputSchema,
    },
    async (input: { description: string }) => {
        const {output} = await suggestTopicPrompt(input);
        return output!;
    }
);
