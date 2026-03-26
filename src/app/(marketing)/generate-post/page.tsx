
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import {
  generateBlogPost,
  suggestSeoKeywords,
  suggestTopics,
  type BlogPostInput,
  type BlogPostOutput,
} from '@/ai/flows/generate-blog-post';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const formSchema = z.object({
  description: z.string().min(10, {
      message: 'Description must be at least 10 characters.'
  }),
  topic: z.string().min(5, {
    message: 'Please suggest a topic or write one manually that is at least 5 characters.',
  }),
  style: z.string().min(1, "Please select at least one writing style."),
  seoKeywords: z.string().min(3, {
    message: 'Please provide at least one SEO keyword.',
  }),
});

const writingStyles = [
  "Academic", "Analytical", "Argumentative", "Article", "Blog Post", "Business",
  "Casual", "Conversational", "Creative", "Critical", "Descriptive", "Empathetic",
  "Enthusiastic", "Expository", "Formal", "Humorous", "Informal", "Informative",
  "Inspirational", "Instructive", "Journalistic", "Legal", "Literary", "Marketing",
  "Motivational", "Narrative", "Objective", "Opinionated", "Persuasive", "Poetic",
  "Professional", "Review", "Satirical", "Scientific", "SEO-focused", "Storytelling",
  "Technical", "Tutorial", "Witty"
];


export default function GeneratePostPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isSuggestingTopic, setIsSuggestingTopic] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPost, setGeneratedPost] = useState<BlogPostOutput | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      description: '',
      style: '',
      seoKeywords: '',
    },
  });

  useEffect(() => {
    form.setValue('style', selectedStyles.join(', '));
  }, [selectedStyles, form]);


  const handleStyleToggle = (style: string) => {
    setSelectedStyles(prev => {
      const isSelected = prev.includes(style);
      if (isSelected) {
        return prev.filter(s => s !== style);
      }
      if (prev.length < 2) {
        return [...prev, style];
      }
      toast({
        title: 'Maximum styles selected',
        description: 'You can select up to two writing styles.',
        variant: 'default',
      });
      return prev;
    });
  };

  async function handleSuggestKeywords() {
    const topic = form.getValues('topic');
    if (!topic || topic.length < 5) {
      toast({
        title: 'Topic is too short',
        description: 'Please enter or suggest a topic before suggesting keywords.',
        variant: 'destructive',
      });
      return;
    }

    setIsSuggesting(true);
    try {
      const keywords = await suggestSeoKeywords(topic);
      form.setValue('seoKeywords', keywords);
    } catch (err) {
      toast({
        title: 'Error suggesting keywords',
        description: 'An error occurred while suggesting keywords. Please try again.',
        variant: 'destructive',
      });
      console.error(err);
    } finally {
      setIsSuggesting(false);
    }
  }

  async function handleSuggestTopic() {
    const description = form.getValues('description');
    if (!description || description.length < 10) {
      toast({
        title: 'Description is too short',
        description: 'Please enter a description before suggesting a topic.',
        variant: 'destructive',
      });
      return;
    }

    setIsSuggestingTopic(true);
    setSuggestedTopics([]);
    try {
      const topics = await suggestTopics(description);
      setSuggestedTopics(topics);
    } catch (err) {
      toast({
        title: 'Error suggesting topics',
        description: 'An error occurred while suggesting topics. Please try again.',
        variant: 'destructive',
      });
      console.error(err);
    } finally {
      setIsSuggestingTopic(false);
    }
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setError(null);
    setGeneratedPost(null);

    try {
      const input: BlogPostInput = values;
      const post = await generateBlogPost(input);
      setGeneratedPost(post);
    } catch (err) {
      setError('An error occurred while generating the post. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }

  const handleTopicSelect = (topic: string) => {
    form.setValue('topic', topic);
    setSuggestedTopics([]);
  };

  return (
    <div className="container mx-auto max-w-4xl py-16">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          AI Blog Post Generator
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
          Fill in the details below to generate a unique, SEO-optimized blog post on any topic.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline">Content Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic Idea / Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the article you want to write..." {...field} rows={4} />
                      </FormControl>
                      <FormDescription>
                        Give the AI some context and it will suggest a title for you.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Generated Title</FormLabel>
                       <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="e.g., 'The Future of Web Development'" {...field} />
                        </FormControl>
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button type="button" variant="outline" onClick={handleSuggestTopic} disabled={isSuggestingTopic}>
                                {isSuggestingTopic ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                <span className="ml-2 hidden sm:inline">{suggestedTopics.length > 0 ? 'Resuggest' : 'Suggest'}</span>
                              </Button>
                           </DropdownMenuTrigger>
                           {suggestedTopics.length > 0 && (
                            <DropdownMenuContent>
                              {suggestedTopics.map((topic, index) => (
                                <DropdownMenuItem key={index} onSelect={() => handleTopicSelect(topic)}>
                                  {topic}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                           )}
                        </DropdownMenu>
                      </div>
                      <FormDescription>
                        You can edit the suggested title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="style"
                  render={() => (
                    <FormItem>
                      <FormLabel>Writing Style (up to 2)</FormLabel>
                       <FormControl>
                          <div className="flex flex-wrap gap-2">
                            {writingStyles.map((style) => (
                              <button
                                key={style}
                                type="button"
                                onClick={() => handleStyleToggle(style)}
                                className={cn(
                                  'rounded-full px-3 py-1 text-sm transition-colors',
                                  selectedStyles.includes(style)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                )}
                              >
                                {style}
                              </button>
                            ))}
                          </div>
                       </FormControl>
                      <FormDescription>
                        Describe the desired tone and style.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Keywords</FormLabel>
                      <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="e.g., 'nextjs, react, tailwindcss'" {...field} />
                      </FormControl>
                        <Button type="button" variant="outline" onClick={handleSuggestKeywords} disabled={isSuggesting}>
                            {isSuggesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            <span className="ml-2 hidden sm:inline">Suggest</span>
                        </Button>
                      </div>
                      <FormDescription>
                        Comma-separated keywords for SEO.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isGenerating || isSuggesting || isSuggestingTopic} className="w-full">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Post'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Generated Post</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating && (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              )}
              {error && <p className="text-destructive">{error}</p>}
              {!isGenerating && !generatedPost && (
                <p className="text-center text-muted-foreground">
                  Your generated blog post will appear here.
                </p>
              )}
              {generatedPost && (
                <article className="prose prose-sm max-w-none dark:prose-invert">
                  <h2>{generatedPost.title}</h2>
                  <p><em>{generatedPost.metaDescription}</em></p>
                  <div dangerouslySetInnerHTML={{ __html: generatedPost.content.replace(/\\n/g, '<br />') }} />
                </article>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
