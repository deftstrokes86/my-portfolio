
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { semanticSearch, type SemanticSearchInput } from '@/ai/flows/semantic-search';
import { Loader2, SearchIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import type { projects, caseStudies } from '@/lib/data';

type Project = (typeof projects)[0];
type CaseStudy = (typeof caseStudies)[0];

interface Document {
  type: 'Project' | 'Case Study';
  data: Project | CaseStudy;
  content: string;
}

interface SemanticSearchProps {
  documents: Document[];
}

interface SearchResult {
  document: string;
  relevanceScore: number;
}

export function SemanticSearch({ documents }: SemanticSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const documentMap = new Map(documents.map(d => [d.content, d]));

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const input: SemanticSearchInput = {
        query,
        documents: documents.map(d => d.content),
      };
      const searchResults = await semanticSearch(input);
      // Filter results with a relevance score threshold
      const filteredResults = searchResults.filter(r => r.relevanceScore > 0.5);
      setResults(filteredResults);
    } catch (err) {
      setError('An error occurred during the search. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = (result: SearchResult) => {
    const doc = documentMap.get(result.document);
    if (!doc) return null;

    if (doc.type === 'Project') {
        const project = doc.data as Project;
        return (
            <Card key={project.slug}>
                <CardHeader>
                    <CardTitle className="font-headline">{project.title}</CardTitle>
                    <CardDescription>Project</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{project.summary}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (doc.type === 'Case Study') {
        const cs = doc.data as CaseStudy;
        return (
            <Card key={cs.slug}>
                <CardHeader>
                    <CardTitle className="font-headline">{cs.projectTitle}</CardTitle>
                    <CardDescription>Case Study</CardDescription>
                </CardHeader>
                <CardContent>
                    <p><strong>Problem:</strong> {cs.problem}</p>
                </CardContent>
            </Card>
        );
    }

    return null;
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'e-commerce apps with Stripe integration'"
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SearchIcon className="h-4 w-4" />
          )}
          <span className="ml-2 hidden sm:inline">Search</span>
        </Button>
      </form>

      {error && <p className="text-destructive">{error}</p>}

      <div className="space-y-4">
        {isLoading && (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}

        {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
                {results.map(renderResult)}
            </div>
        )}

        {!isLoading && query && results.length === 0 && (
            <p className="text-center text-muted-foreground">No relevant results found.</p>
        )}
      </div>
    </div>
  );
}
