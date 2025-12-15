import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chord } from '@/interface/chord';
import { cn } from '@/lib/utils';
import { ChordDiagram } from './chord-diagram';

interface Props {
  chords: Chord[];
}
function ChordsViewer({ chords }: Props) {
  return (
    <div className={cn('w-full', '', 'lg:fixed lg:top-[10%] lg:right-20 lg:z-20 lg:w-auto')}>
      <Card className="w-full lg:shadow-md">
        <CardHeader>
          <CardTitle>Chords</CardTitle>
          <CardDescription>A resume of your chords.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              'grid max-h-[45vh] w-full grid-flow-col grid-rows-1 gap-4 overflow-auto',
              'lg:grid-flow-row lg:grid-cols-2'
            )}
          >
            {chords.map(chord => (
              <ChordDiagram key={chord} chordName={chord} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChordsViewer;
