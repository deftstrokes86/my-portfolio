'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const success = await loginAction(formData.get('password') as string);
    
    if (success) {
      router.push('/cms');
      router.refresh();
    } else {
      setError('Invalid password');
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-24 max-w-sm">
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-headline font-bold text-center">CMS Access</h1>
        <p className="text-muted-foreground text-center">Please enter the administrative password to gain access to the dashboard.</p>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <Input 
              name="password" 
              type="password" 
              placeholder="Admin password..." 
              required 
              className="text-center"
            />
          </div>
          
          {error && <p className="text-destructive text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Authenticating...' : 'Enter CMS'}
          </Button>
        </form>
      </div>
    </div>
  );
}
