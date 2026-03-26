'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Accessibility, Sun, Moon, Contrast, Text, PauseCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAccessibility } from '@/contexts/accessibility-context';

export function AccessibilityControls() {
  const { theme, setTheme } = useTheme();
  const {
    increaseFontSize,
    decreaseFontSize,
    isHighContrast,
    toggleHighContrast,
    isReduceMotion,
    toggleReduceMotion,
    isDyslexicFont,
    toggleDyslexicFont,
  } = useAccessibility();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Accessibility className="h-5 w-5" />
          <span className="sr-only">Accessibility Controls</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Accessibility</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="theme-toggle" className="flex items-center gap-2 cursor-pointer">
              {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>Theme</span>
            </Label>
            <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="font-size" className="flex items-center gap-2">
              <Text className="w-4 h-4" />
              <span>Font Size</span>
            </Label>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={decreaseFontSize}>-</Button>
              <Button variant="outline" size="icon" className="h-7 w-7" onClick={increaseFontSize}>+</Button>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="high-contrast-toggle" className="flex items-center gap-2 cursor-pointer">
              <Contrast className="w-4 h-4" />
              <span>High Contrast</span>
            </Label>
            <Switch id="high-contrast-toggle" checked={isHighContrast} onCheckedChange={toggleHighContrast} />
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="reduce-motion-toggle" className="flex items-center gap-2 cursor-pointer">
              <PauseCircle className="w-4 h-4" />
              <span>Reduce Motion</span>
            </Label>
            <Switch id="reduce-motion-toggle" checked={isReduceMotion} onCheckedChange={toggleReduceMotion} />
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex w-full items-center justify-between">
            <Label htmlFor="dyslexic-font-toggle" className="flex items-center gap-2 cursor-pointer">
              <Text className="w-4 h-4" />
              <span>Dyslexic Font</span>
            </Label>
            <Switch id="dyslexic-font-toggle" checked={isDyslexicFont} onCheckedChange={toggleDyslexicFont} />
          </div>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
