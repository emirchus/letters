import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Chord, chords } from '@/interface/chord';
import { cn } from '@/lib/utils';
import { ChordDiagram } from './chord-diagram';

const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

interface Props {
  onSelectChord: (chord: Chord) => void;
}

export function ChordSelector({ onSelectChord }: Props) {
  const [selectedNote, setSelectedNote] = useState('C');
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredChords = chords.filter(chord => chord.name.startsWith(selectedNote));

  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.querySelector('[data-state="active"]');

      if (activeTab) {
        activeTab.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, []);

  return (
    <div className="mt-2 h-full w-full">
      <ScrollArea className="w-full rounded-md border whitespace-nowrap">
        <div ref={tabsRef} className="flex ">
          {notes.map(note => (
            <button
              type="button"
              key={note}
              className={cn(
                'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
                selectedNote === note
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setSelectedNote(note)}
            >
              {note}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ScrollArea className="h-[200px] w-full p-2">
        <div className="flex flex-wrap gap-1.5">
          {filteredChords.map(chord => (
            <button
              key={chord.name}
              className="appearance-none"
              type="button"
              onClick={e => {
                e.preventDefault();
                onSelectChord(chord.name);
              }}
            >
              <ChordDiagram chordName={chord.name} />
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
