'use server';

// This file implements the semantic search flow for finding relevant projects and case studies using natural language.


/**
 * @fileOverview Implements semantic search to find relevant projects and case studies.
 *
 * - semanticSearch - A function that performs the semantic search.
 * - SemanticSearchInput - The input type for the semanticSearch function.
 * - SemanticSearchOutput - The return type for the semanticSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SemanticSearchInputSchema = z.object({
  query: z.string().describe('The natural language search query.'),
  documents: z.array(z.string()).describe('A list of document strings to search through.')
});
export type SemanticSearchInput = z.infer<typeof SemanticSearchInputSchema>;

const SemanticSearchOutputSchema = z.array(z.object({
  document: z.string().describe('The content of the matching document.'),
  relevanceScore: z.number().describe('The relevance score of the document to the query.')
})).describe('A list of documents matching the query, sorted by relevance score.');
export type SemanticSearchOutput = z.infer<typeof SemanticSearchOutputSchema>;

export async function semanticSearch(input: SemanticSearchInput): Promise<SemanticSearchOutput> {
  return semanticSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'semanticSearchPrompt',
  input: {schema: SemanticSearchInputSchema},
  output: {schema: SemanticSearchOutputSchema},
  prompt: `You are a search assistant that helps users find relevant documents based on their search query.

You are given a query and a list of documents.
You must return a ranked list of documents with relevance scores (0-1) based on how well they match the query.

Query: {{{query}}}

Documents:
{{#each documents}}- {{{this}}}\n{{/each}}

Output format: An array of JSON objects, where each object has a 'document' field containing the document content and a 'relevanceScore' field containing the relevance score (0-1).
Sort the array by relevanceScore in descending order.

Example output:
[
  {
    "document": "Document 1 content",
    "relevanceScore": 0.9
  },
  {
    "document": "Document 2 content",
    "relevanceScore": 0.7
  }
]

Ensure that the document content in the output matches the original documents exactly.
`,
});

const semanticSearchFlow = ai.defineFlow(
  {
    name: 'semanticSearchFlow',
    inputSchema: SemanticSearchInputSchema,
    outputSchema: SemanticSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
