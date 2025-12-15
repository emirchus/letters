import React, { useMemo } from 'react';

import { Chord, chords } from '@/interface/chord';

interface ChordDiagramProps {
  chordName: Chord;
}

export function ChordDiagram({ chordName }: ChordDiagramProps) {
  const strings = 6;
  const fretCount = 5;
  const openStrings = ['E', 'a', 'd', 'g', 'b', 'e'];

  const chord = useMemo(() => chords.find(chord => chord.name === chordName)!, [chordName]);
  const frets = chord.frets;
  const barreChord = useMemo(() => chord.frets.filter(fret => fret !== null && fret !== 0).length > 4, [chord]);
  const barrePosition = useMemo(
    () => (barreChord ? Math.min(...frets.filter((fret): fret is number => fret !== null && fret !== 0)) : null),
    [barreChord, frets]
  );

  return (
    <div className="pointer-events-none flex flex-col items-center select-none">
      <svg aria-labelledby={`chord-${chordName}`} height="135" viewBox="0 0 100 135" width="100">
        <title id={`chord-${chordName}`}>{`Chord diagram for ${chordName}`}</title>

        {/* Nut */}
        <rect fill="#4b5563" height="4" width="80" x="10" y="10" />

        {/* Frets */}
        {[...Array(fretCount)].map((_, i) => (
          <line key={`fret-${i}`} stroke="#9ca3af" strokeWidth="2" x1="10" x2="90" y1={30 + i * 20} y2={30 + i * 20} />
        ))}

        {/* Strings */}
        {[...Array(strings)].map((_, i) => (
          <line
            key={`string-${i}`}
            stroke="#4b5563"
            strokeWidth={3 - i * 0.4}
            x1={10 + i * 16}
            x2={10 + i * 16}
            y1="10"
            y2="110"
          />
        ))}

        {/* String notes */}
        {openStrings.map((note, i) => (
          <text
            key={`note-${i}`}
            className="font-mono"
            fill="#4b5563"
            fontSize="10"
            textAnchor="middle"
            x={10 + i * 16}
            y="125"
          >
            {note}
          </text>
        ))}

        {chord.startFret > 1 && (
          <text fill="#ef4444" fontSize="12" textAnchor="middle" x="3" y={22 * (chord.startFret - 1) + 10}>
            {chord.startFret}
          </text>
        )}

        {/* Barre chord */}
        {barreChord && barrePosition && (
          <rect fill="#3b82f6" height="4" rx="2" width="84" x="8" y={18 + (barrePosition - 1) * 20} />
        )}

        {/* Chord to rasheo */}
        {frets.map((fret, i) => {
          if (fret === null) {
            return (
              <text key={`mute-${i}`} fill="#ef4444" fontSize="12" textAnchor="middle" x={10 + i * 16} y="8">
                ×
              </text>
            );
          }
          if (fret === 0) {
            return (
              <circle key={`open-${i}`} cx={10 + i * 16} cy="5" fill="none" r="4" stroke="#10b981" strokeWidth="2" />
            );
          }
        })}

        {/* Finger positions */}
        {frets.map((fret, i) => {
          if (!fret) return null;
          if (barreChord && fret === barrePosition) {
            return null; // Don't draw individual circles for barred strings
          }

          return <circle key={`finger-${i}`} cx={10 + i * 16} cy={20 + (fret - 1) * 20} fill="#3b82f6" r="6" />;
        })}
      </svg>
      <span className="font-mono text-sm font-medium">{chordName}</span>
    </div>
  );
}
