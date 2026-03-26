
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

type Position = { x: number; y: number };
type PieceId = 'piece1' | 'piece2' | 'piece3';

const initialPositions: Record<PieceId, Position> = {
  piece1: { x: 100, y: 150 },
  piece2: { x: 500, y: 400 },
  piece3: { x: 800, y: 200 },
};

const targetPositions: Record<PieceId, Position> = {
  piece1: { x: 0, y: 0 },
  piece2: { x: 26, y: 0 },
  piece3: { x: 13, y: 48 },
};

const SNAP_THRESHOLD = 40;

const LogoPiece = ({ id, path, initialPos, onDrop, isLocked }: { id: PieceId; path: string; initialPos: Position; onDrop: (id: PieceId, pos: Position) => void; isLocked: boolean }) => {
  const [position, setPosition] = useState(initialPos);

  useEffect(() => {
    if (isLocked) {
      setPosition(targetPositions[id]);
    } else {
        // This ensures the piece goes back to its initial random-like position on reset
        setPosition(initialPos);
    }
  }, [isLocked, id, initialPos]);
  
  return (
    <motion.g
        style={{ x: position.x, y: position.y, touchAction: 'none' }}
        drag={!isLocked}
        dragMomentum={false}
        onDragEnd={(event, info) => {
            if (!isLocked) {
                const newPos = { x: position.x + info.offset.x, y: position.y + info.offset.y };
                setPosition(newPos);
                onDrop(id, newPos);
            }
        }}
        animate={{
            x: isLocked ? targetPositions[id].x : position.x,
            y: isLocked ? targetPositions[id].y : position.y,
            scale: isLocked ? 1 : 1.1,
            filter: isLocked ? 'drop-shadow(0 0 0.5rem hsl(var(--primary)))' : 'drop-shadow(0 0 0px transparent)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn('cursor-grab', { 'cursor-default': isLocked })}
    >
        <path d={path} className="fill-primary/80 stroke-primary stroke-2" />
    </motion.g>
  );
};


export default function PlayPage() {
    const [lockedPieces, setLockedPieces] = useState<Set<PieceId>>(new Set());
    const [isComplete, setIsComplete] = useState(false);
    const dropZoneRef = useRef<SVGSVGElement>(null);

    const checkDistance = (p1: Position, p2: Position) => {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    };

    const handleDrop = (id: PieceId, droppedPosition: Position) => {
        if (dropZoneRef.current) {
            const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
            const relativeDropPos = {
                x: droppedPosition.x - dropZoneRect.left,
                y: droppedPosition.y - dropZoneRect.top,
            };
            
            const targetPos = targetPositions[id];
            if (checkDistance(relativeDropPos, targetPos) < SNAP_THRESHOLD) {
                setLockedPieces(prev => new Set(prev).add(id));
            }
        }
    };
    
    const handleReset = () => {
        setLockedPieces(new Set());
        setIsComplete(false);
    };

    useEffect(() => {
        if (lockedPieces.size === Object.keys(initialPositions).length) {
            setIsComplete(true);
        }
    }, [lockedPieces]);


  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] overflow-hidden bg-secondary/20 p-4">
      <div className="absolute top-4 right-4 z-20">
        <Button onClick={handleReset} variant="outline" className="bg-background/80">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <AnimatePresence>
        {!isComplete && (
            <motion.div 
              className="absolute top-16 text-center z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
                <h1 className="font-headline text-2xl font-bold">Assemble the Logo</h1>
                <p className="text-muted-foreground">Drag the pieces into the glowing area to build the icon.</p>
            </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
        <div className="relative w-[300px] h-[300px] flex items-center justify-center z-10">
            {/* The Drop Zone */}
            <svg 
                ref={dropZoneRef}
                width="80" 
                height="80" 
                viewBox="0 0 80 80" 
                className={cn(
                    "absolute transition-all duration-500",
                    isComplete ? "saturate-100" : "saturate-0 opacity-20"
                )}
                style={{
                    filter: `drop-shadow(0 0 ${isComplete ? '20px' : '10px'} hsl(var(--accent)))`
                }}
            >
                <path d="M40 0L53 48L80 48L26 80L13 32L0 32L40 0Z" className="fill-accent/20" />
            </svg>

            {/* Draggable Pieces */}
             <svg width="100%" height="100%" viewBox="0 0 1000 800" className="absolute inset-0">
                <LogoPiece 
                    id="piece1" 
                    path="M40 0L13 32H0L40 0Z"
                    initialPos={initialPositions.piece1}
                    onDrop={handleDrop}
                    isLocked={lockedPieces.has('piece1')}
                />
                <LogoPiece 
                    id="piece2" 
                    path="M0 0L27 48H54L0 0Z"
                    initialPos={initialPositions.piece2}
                    onDrop={handleDrop}
                    isLocked={lockedPieces.has('piece2')}
                />
                <LogoPiece 
                    id="piece3" 
                    path="M0 0L13 48H-13L0 0Z"
                    initialPos={initialPositions.piece3}
                    onDrop={handleDrop}
                    isLocked={lockedPieces.has('piece3')}
                />
            </svg>
        </div>


        <AnimatePresence>
        {isComplete && (
            <motion.div 
              className="absolute bottom-16 text-center z-10 flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
                <PartyPopper className="w-16 h-16 text-primary" />
                <h2 className="font-headline text-3xl font-bold">You did it!</h2>
                <p className="text-muted-foreground max-w-sm">Nice one! You've successfully assembled the logo. This little game was built with Framer Motion and SVG.</p>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
