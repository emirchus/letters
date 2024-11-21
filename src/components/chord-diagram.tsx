import React, { useMemo } from "react";

import { Chord, chords } from "@/interface/chord";

interface ChordDiagramProps {
  chordName: Chord;
}

export function ChordDiagram({ chordName }: ChordDiagramProps) {
  const strings = 6;
  const fretCount = 5;
  const openStrings = ["E", "a", "d", "g", "b", "e"];
  console.log(chordName);

  const chord = useMemo(() => chords.find(chord => chord.name === chordName)!, [chordName]);
  const frets = chord.frets;
  const barreChord = useMemo(() => chord.frets.filter(fret => fret !== null && fret !== 0).length > 4, [chord]);
  const barrePosition = useMemo(
    () => (barreChord ? Math.min(...frets.filter((fret): fret is number => fret !== null && fret !== 0)) : null),
    [barreChord, frets]
  );

  return (
    <div className="pointer-events-none flex select-none flex-col items-center">
      <svg width="100" height="135" viewBox="0 0 100 135" aria-labelledby={`chord-${chordName}`}>
        <title id={`chord-${chordName}`}>{`Chord diagram for ${chordName}`}</title>

        {/* Nut */}
        <rect x="10" y="10" width="80" height="4" fill="#4b5563" />

        {/* Frets */}
        {[...Array(fretCount)].map((_, i) => (
          <line key={`fret-${i}`} x1="10" y1={30 + i * 20} x2="90" y2={30 + i * 20} stroke="#9ca3af" strokeWidth="2" />
        ))}

        {/* Strings */}
        {[...Array(strings)].map((_, i) => (
          <line
            key={`string-${i}`}
            x1={10 + i * 16}
            y1="10"
            x2={10 + i * 16}
            y2="110"
            stroke="#4b5563"
            strokeWidth={3 - i * 0.4}
          />
        ))}

        {/* String notes */}
        {openStrings.map((note, i) => (
          <text
            className="font-mono"
            key={`note-${i}`}
            x={10 + i * 16}
            y="125"
            fontSize="10"
            textAnchor="middle"
            fill="#4b5563"
          >
            {note}
          </text>
        ))}

        {chord.startFret > 1 && (
          <text x="3" y={22 * (chord.startFret - 1) + 10} fontSize="12" textAnchor="middle" fill="#ef4444">
            {chord.startFret}
          </text>
        )}

        {/* Barre chord */}
        {barreChord && barrePosition && (
          <rect x="8" y={18 + (barrePosition - 1) * 20} width="84" height="4" fill="#3b82f6" rx="2" />
        )}

        {/* Chord to rasheo */}
        {frets.map((fret, i) => {
          if (fret === null) {
            return (
              <text key={`mute-${i}`} x={10 + i * 16} y="8" fontSize="12" textAnchor="middle" fill="#ef4444">
                ×
              </text>
            );
          }
          if (fret === 0) {
            return (
              <circle key={`open-${i}`} cx={10 + i * 16} cy="5" r="4" fill="none" stroke="#10b981" strokeWidth="2" />
            );
          }
        })}

        {/* Finger positions */}
        {frets.map((fret, i) => {
          if (!fret) return null;
          if (barreChord && fret === barrePosition) {
            return null; // Don't draw individual circles for barred strings
          }
          return <circle key={`finger-${i}`} cx={10 + i * 16} cy={20 + (fret - 1) * 20} r="6" fill="#3b82f6" />;
        })}
      </svg>
      <span className="mt-2 font-mono text-sm font-medium">{chordName}</span>
    </div>
  );
}
